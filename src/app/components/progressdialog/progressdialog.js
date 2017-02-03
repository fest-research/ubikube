import React from 'react'
import Dialog from 'material-ui/Dialog'
import LinearProgress from 'material-ui/LinearProgress'

import {readFileSync, createWriteStream, existsSync, statSync, createReadStream, openSync} from 'fs'
import {normalize} from 'path'
import {exec, execSync} from 'child_process'
import {sync} from 'md5-file'
import prettyBytes from 'pretty-bytes'
import request from 'request'
import progress from 'request-progress'
import {write} from 'etcher-image-write'
import {umount} from 'umount'
import readYaml from 'js-yaml'
import writeYaml from 'write-yaml'

export default class ProgressDialog extends React.Component {
  constructor(props) {
    // Init state.
    super(props)
    this.state = {
      open: false,
      title: '',
      progress: 0,
      progressMode: 'indeterminate',
      description: ''
    }

    // Image directory.
    this.imageDir = 'image/'

    // Device init file.
    this.deviceInit = `${this.imageDir}device-init.yaml`

    // Temporary mount path.
    this.tempMount = '/tmp/ubikube/'

    // Device to flash.
    this.device = ''

    // Token.
    this.token = ''

    // Hostname.
    this.hostname = ''

    // WiFi network ssid
    this.ssid = ''

    // WiFi network password
    this.password = ''

    // Operating system image configuration (can be loaded only once).
    this.imageConfig = readFileSync('image/config.json')
    this.imageConfig = JSON.parse(this.imageConfig)
  }

  show(token, hostname, device, ssid, password) {
    // Init state everytime dialog is shown.
    this.init(token, hostname, device, ssid, password)

    // If image is already downloaded procees to image flashing, if not start
    // with image download and extraction.
    if (this.isImageDownloaded()) {
      this.flashImage()
    } else {
      this.downloadImage()
    }
  }

  init(token, hostname, device, ssid, password) {
    this.token = token
    this.hostname = hostname
    this.device = device.substr(0, device.indexOf(' '))
    this.ssid = ssid
    this.password = password
    this.state.open = true
    this.state.title = ''
    this.state.description = ''
    this.setState(this.state)
  }

  isImageDownloaded() {
    // Checks if image is in directory and verifies is MD5 checksum.
    return existsSync('image/' + this.imageConfig.uncompressedFilename) &&
      sync('image/' + this.imageConfig.uncompressedFilename) === this.imageConfig.uncompressedMD5
  }

  downloadImage() {
    this.setProgress('Downloading image...', null, 'determinate', 0)
    progress(request(this.imageConfig.downloadUrl))
      .on('progress', state => {
        this.setProgress(null, `Downloaded ${prettyBytes(state.size.transferred)} from ${prettyBytes(state.size.total)}, ${prettyBytes(state.speed | 0)} per second, ${state.time.remaining} seconds left`, null, state.percent * 100)
      }).on('error', error => {
      console.log(error)
      this.close()
    }).on('end', () => {
      this.extractImage()
    }).pipe(createWriteStream('image/' + this.imageConfig.compressedFilename))
  }

  extractImage() {
    this.setProgress('Extracting image...', null, 'indeterminate', undefined)
    let binary
    if (process.platform == 'darwin') {
      binary = '"' + normalize(process.cwd() + '/bin/7z') + '"'
    } else if (process.platform == 'win32') {
      binary = '"' + normalize(process.cwd() + '/bin/7z.exe') + '"'
    } else if (process.platform == 'linux') {
      binary = '7za'
    }
    exec(binary + ' x -o"image/" "image/' + this.imageConfig.compressedFilename + '"', (error) => {
      if (error !== null) {
        this.close()
      } else {
        this.flashImage()
      }
    })
  }

  flashImage() {
    this.setProgress('Flashing image...', null, 'determinate', 0)
    umount(this.device, (error) => {
      if (error) {
        console.error(error)
      } else {
        let filename = 'image/' + this.imageConfig.uncompressedFilename
        write({
          fd: openSync(this.device, 'rs+'),
          device: this.device,
          size: statSync(filename).size
        }, {
          stream: createReadStream(filename),
          size: statSync(filename).size
        }, {
          check: true
        }).on('progress', state => {
          this.setProgress(null, `Transferred ${prettyBytes(state.transferred)} from ${prettyBytes(state.length)}, ${state.eta} seconds left`, null, state.percentage)
        }).on('error', error => {
          console.log(error)
          this.close()
        }).on('done', success => {
          this.setProgress(null, `Data successfully transferred, checksum ${success.sourceChecksum}`, null, 100)
          this.updateImage()
        })
      }
    })
  }

  updateImage() {
    this.setProgress('Updating image...', null, 'indeterminate', undefined)

    this.mount()

    let deviceConfig = this.getDeviceConfig()
    writeYaml.sync(`${this.tempMount}/device-init.yaml`, deviceConfig)

    this.unmount()
    this.close()

    // createReadStream(this.deviceInit).on("error", error => {
    //   console.log(error);
    //   this.unmount()
    //   this.close()
    //   // TODO use pipe to update yaml config
    // }).pipe(createWriteStream(`${this.tempMount}/device-init.yaml`).on("error", error => {
    //   console.log(error);
    //   this.unmount()
    //   this.close()
    // }).on("close", () => {
    //   console.log("Successfully finished process!")
    //   this.unmount()
    //   this.close()
    // }));
  }

  getDeviceConfig() {
    let config = {
      hostname: this.hostname,
    }

    if (this.ssid.length > 0) {
      config.wifi = {
        interfaces: {
          wlan0: {
            ssid: this.ssid,
            password: this.password
          }
        }
      }
    }

    return config
  }

  mount() {
    console.log(`Mounting ${this.device}1 at ${this.tempMount}`);
    execSync(`mkdir -p ${this.tempMount}`, {stdio: [null, null, null]})
    execSync(`mount ${this.device}1 ${this.tempMount}`, {stdio: [null, null, null]})
  }

  unmount() {
    console.log(`Unmounting ${this.tempMount}`);
    execSync(`umount ${this.tempMount}`, {stdio: [null, null, null]})
  }

  setProgress(title, description, progressMode, progress) {
    console.log(`${title} - ${description}`)
    this.setState({
      title: title === null ? this.state.title : title,
      description: description === null ? this.state.description : description,
      progressMode: progressMode === null ? this.state.progressMode : progressMode,
      progress: progress === null ? this.state.progress : progress
    })
  }

  close() {
    console.log("Closing progress dialog")
    this.setState({open: false})
  }

  render() {
    return (
      <div>
        <Dialog title={this.state.title}
                modal={true}
                open={this.state.open}>
          <LinearProgress mode={this.state.progressMode}
                          value={this.state.progress}/>
          <br/>
          <span className='uk-dialog-description'>
            {this.state.description}
          </span>
        </Dialog>
      </div>
    )
  }
}
