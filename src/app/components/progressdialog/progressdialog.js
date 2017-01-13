import React from 'react';
import Dialog from 'material-ui/Dialog';
import LinearProgress from 'material-ui/LinearProgress';

import { readFileSync, createWriteStream, existsSync, statSync, createReadStream, openSync } from 'fs'
import { normalize } from 'path'
import { exec } from 'child_process'
import { sync } from 'md5-file'
import prettyBytes from 'pretty-bytes'
import request from 'request'
import progress from 'request-progress'
import { write } from 'etcher-image-write'

export default class ProgressDialog extends React.Component {
  constructor(props) {
    // Init state.
    super(props);
    this.state = {
      open: false,
      title: '',
      progress: 0,
      progressMode: 'indeterminate',
      description: ''
    };

    // Device to flash.
    this.device = ''

    // Token.
    this.token = ''

    // Hostname.
    this.hostname = ''

    // Operating system image configuration (can be loaded only once).
    this.imageConfig = readFileSync('image/config.json');
    this.imageConfig = JSON.parse(this.imageConfig);
  }

  show(token, hostname, device) {
    // Init state everytime dialog is shown.
    this.init(token, hostname, device)

    // If image is already downloaded procees to image flashing, if not start
    // with image download and extraction.
    if (this.isImageDownloaded()) {
      this.flashImage();
    } else {
      this.downloadImage();
    }
  }

  init(token, hostname, device) {
    this.token = token;
    this.hostname = hostname;
    this.device = device.substr(0, device.indexOf(' '));
    this.state.open = true;
    this.state.title = '';
    this.state.description = '';
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
        console.log(state);
        this.setProgress(null, `${prettyBytes(state.speed | 0)} per second, ${state.time.remaining} seconds left`, null, state.percent * 100);
      }).on('error', err => {
        console.log(err);
        this.close();
      }).on('end', () => {
        this.extractImage();
      }).pipe(createWriteStream('image/raspbian-lite-pibakery.7z'))
  }

  extractImage () {
    this.setProgress('Extracting image...', null, 'indeterminate', undefined)
    let binary
    if (process.platform == 'darwin') {
      binary = '"' + normalize(process.cwd() + '/bin/7z') + '"'
    } else if (process.platform == 'win32') {
      binary = '"' + normalize(process.cwd() + '/bin/7z.exe') + '"'
    } else if (process.platform == 'linux') {
      binary = '7za'
    }
    exec(binary + ' x -o"image/" "image/' + this.imageConfig.compressedFilename + '"', (error, stdout, stderr) => {
      if (error !== null) {
        this.close();
        return
      }
      this.flashImage()
    })
  }

  flashImage() {
    this.setProgress('Flashing image...', null, 'determinate', 0)
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
      console.log(state);
      this.setProgress(null, `Transferred ${prettyBytes(state.transferred)} from ${prettyBytes(state.length)}, ${state.eta} seconds left`, null, state.percentage)
    }).on('error', error => {
      console.log(error);
      this.close();
    }).on('done', success => {
      console.log(success);
      this.setProgress(null, `Data successfully transferred, checksum ${success.sourceChecksum}`, null, 100)
      this.updateImage();
    });
  }

  updateImage() {
    this.setProgress('Updating image...', null, 'indeterminate', undefined);
    this.close();
  }

  setProgress(title, description, progressMode, progress) {
    this.setState({
      title: title === null ? this.state.title : title,
      description: description === null ? this.state.description : description,
      progressMode: progressMode === null ? this.state.progressMode : progressMode,
      progress: progress === null ? this.state.progress : progress
    })
  }

  close() {
    this.setState({open: false});
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
    );
  }
}
