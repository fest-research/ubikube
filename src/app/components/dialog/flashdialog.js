import React from 'react';
import Dialog from 'material-ui/Dialog';
import LinearProgress from 'material-ui/LinearProgress';

import { readFileSync, createWriteStream, existsSync, statSync, createReadStream, openSync } from 'fs'
import { normalize } from 'path'
import { exec } from 'child_process'
import { sync } from 'md5-file'
import request from 'request'
import progress from 'request-progress'
import { write } from 'etcher-image-write'

export default class FlashDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      token: '',
      hostname: '',
      memoryCard: '',
      title: '',
      progress: 0,
      progressMode: 'indeterminate'
    };
  }

  show(token, hostname, memoryCard) {
    this.initState(token, hostname, memoryCard)
    new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
      let image = readFileSync('image/config.json');
      image = JSON.parse(image);
      if (this.doesImageAlreadyExist(image)) {
        this.flashImage(image);
      } else {
        this.downloadImage(image);
      }
    })
  }

  initState(token, hostname, memoryCard) {
    this.setState({
      token: token,
      hostname: hostname,
      memoryCard: memoryCard.substr(0, memoryCard.indexOf(' ')),
      open: true,
      title: ''
    });
  }

  setProgress(title, progressMode, progress) {
    this.setState({
      title: title === null ? this.state.title : title,
      progressMode: progressMode === null ? this.state.progressMode : progressMode,
      progress: progress === null ? this.state.progress : progress
    })
  }

  doesImageAlreadyExist(image) {
    return existsSync('image/' + image.uncompressedFilename) &&
      sync('image/' + image.uncompressedFilename) === image.uncompressedMD5
  }

  downloadImage(image) {
    this.setProgress('[1/4] Downloading image...', 'determinate', 0)
    progress(request(image.downloadUrl))
      .on('progress', state => this.setProgress(null, null, state.percent * 100))
      .on('error', err => console.log(err))
      .on('end', () => {
        this.setProgress('[2/4] Extracting image...', 'indeterminate')
        this.extractImage('image/' + image.compressedFilename, 'image/', (err) => {
          if (err !== null) {
            this.setState({open: false});
            return
          }
          this.flashImage(image)
        })
      })
      .pipe(createWriteStream('image/raspbian-lite-pibakery.7z'))
  }

  extractImage (archive, outputdir, callback) {
    let binary
    if (process.platform == 'darwin') {
      binary = '"' + normalize(process.cwd() + '/bin/7z') + '"'
    } else if (process.platform == 'win32') {
      binary = '"' + normalize(process.cwd() + '/bin/7z.exe') + '"'
    } else if (process.platform == 'linux') {
      binary = '7za'
    }
    exec(binary + ' x -o"' + outputdir + '" "' + archive + '"', function (error, stdout, stderr) {
      callback(error)
    })
  }

  flashImage(image) {
    this.setProgress('[3/4] Flashing image...', 'indeterminate')
    let filename = 'image/' + image.uncompressedFilename

    console.log(this.state.memoryCard);

    write({
      fd: openSync('/dev/sdb', 'rs+'),
      device: '/dev/sdb',
      size: statSync(filename).size
    }, {
      stream: createReadStream(filename),
      size: statSync(filename).size
    }, {
      check: true
    }).on('progress', function (state) {
      console.log(state);
    }).on('error', function (error) {
      console.error(error)
    }).on('done', function (success) {
      console.log(success)
    });
    this.updateImage(image)
  }

  updateImage(image) {
    this.setProgress('[4/4] Updating image...', 'indeterminate')
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
        </Dialog>
      </div>
    );
  }
}
