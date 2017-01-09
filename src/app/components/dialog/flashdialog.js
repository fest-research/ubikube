import React from 'react';
import Dialog from 'material-ui/Dialog';
import LinearProgress from 'material-ui/LinearProgress';

import {extract7z} from './../../scripts/unzip'
import {readFileSync, createWriteStream, existsSync, statSync, createReadStream, openSync} from 'fs'
import {sync} from 'md5-file'
import {write} from 'etcher-image-write'
import request from 'request'
import progress from 'request-progress'

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
    this.setState({
      token: token,
      hostname: hostname,
      memoryCard: memoryCard,
      open: true,
      title: "[3/4] Flashing image..."
    });
    new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
      let image = readFileSync("image/config.json");
      image = JSON.parse(image);
      if (this.doesImageAlreadyExist(image)) {
        this.flashImage(image);
      } else {
        this.downloadImage(image);
      }
    })
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
        extract7z('image/' + image.compressedFilename, 'image/', (err) => {
          if (err !== null) {
            this.setState({open: false});
            return
          }
          this.flashImage(image)
        })
      })
      .pipe(createWriteStream('image/raspbian-lite-pibakery.7z'))
  }

  flashImage(image) {
    this.setProgress('[3/4] Flashing image...', 'indeterminate')
    let filename = 'image/' + image.uncompressedFilename

    let sdWrite = write({
      fd: openSync('/dev/sdb', 'rs+'), // '\\\\.\\PHYSICALDRIVE1' in Windows, for example.
      device: '/dev/sdb',
      size: statSync(filename).size
    }, {
      stream: createReadStream(filename),
      size: statSync(filename).size
    }, {
      check: true
    });

    sdWrite.on('progress', function (state) {
      console.log(state);
    });

    sdWrite.on('error', function (error) {
      console.error(error)
    });

    sdWrite.on('done', function (success) {
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
