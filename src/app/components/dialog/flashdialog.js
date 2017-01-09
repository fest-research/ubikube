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
      completed: 0
    };
  }

  show(token, hostname, memoryCard) {
    this.setState({token: token, hostname: hostname, memoryCard: memoryCard, open: true});

    // Read image configuration.
    let image = readFileSync("image/config.json");
    image = JSON.parse(image);

    if (this.doesImageAlreadyExist(image)) {
      this.flash();
    } else {
      this.downloadImage(image);
    }
  }

  downloadImage(image) {

    progress(request(image.downloadUrl))
      .on('progress', state => {
        this.state.completed = state.percent * 100;
        this.setState(this.state)
      })
      .on('error', err => console.log(err))
      .on('end', () => {
        this.state.completed = 100;
        this.setState(this.state);
        extract7z('image/' + image.compressedFilename, 'image/', (err) => {
          if (err === null) {
            this.setState({open: false});
            alert(err);
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

  flash() {
    // TODO update image
    // TODO flash image
    alert("Completed")
  }

  render() {
    return (
      <div>
        <Dialog
          title="Flashing..."
          modal={true}
          open={this.state.open}
        >
          <LinearProgress mode="determinate"
                          value={this.state.completed}/>
        </Dialog>
      </div>
    );
  }

}