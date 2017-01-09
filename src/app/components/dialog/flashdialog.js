import React from 'react';
import Dialog from 'material-ui/Dialog';
import LinearProgress from 'material-ui/LinearProgress';

import {extract7z} from './../../scripts/unzip'
import {readFileSync, createWriteStream, existsSync} from 'fs'
import {sync} from 'md5-file'
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
      progress: 0
    };
  }

  show(token, hostname, memoryCard) {
    this.setTitle("Flashing...");
    this.setState({token: token, hostname: hostname, memoryCard: memoryCard, open: true});

    this.sleep(10).then(() => {
      // Read image configuration.
      let image = readFileSync("image/config.json");
      image = JSON.parse(image);
      if (this.doesImageAlreadyExist(image)) {
        this.flash();
      } else {
        this.downloadImage(image);
      }
    })


  }

  setTitle(title) {
    this.setState({title: title})
  }

  setProgress(progress) {
    this.setState({progress: progress})
  }

  downloadImage(image) {
    this.setTitle("Downloading image...");

    progress(request(image.downloadUrl))
      .on('progress', state => {
        this.setProgress(state.percent * 100);
      })
      .on('error', err => console.log(err))
      .on('end', () => {
        this.setTitle("Extracting image...");
        this.setProgress(0);
        extract7z('image/' + image.compressedFilename, 'image/', (err) => {
          if (err !== null) {
            this.setState({open: false});
            return
          }

          this.flash()
        })
      })
      .pipe(createWriteStream('image/raspbian-lite-pibakery.7z'))
  }

  doesImageAlreadyExist(image) {
    return existsSync('image/' + image.uncompressedFilename) &&
      sync('image/' + image.uncompressedFilename) === image.uncompressedMD5
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  flash() {
    this.setTitle("Flashing...");
    // TODO update image
    // TODO flash image
    this.setState({open: false});
  }

  render() {
    return (
      <div>
        <Dialog
          title={this.state.title}
          modal={true}
          open={this.state.open}
        >
          <LinearProgress mode="determinate"
                          value={this.state.progress}/>
        </Dialog>
      </div>
    );
  }

}