import path from 'path';
import url from 'url';
import {BrowserWindow, app} from 'electron';

let win;

const createWindow = () => {
  win = new BrowserWindow({
    width: 1000,
    height: 1000,
    resizable: false,
    // frame: false,
    show: false,
    titleBarStyle: 'hidden'
  });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'app/index.html'),
    protocol: 'file:',
    slashes: true,
  }));
  win.webContents.openDevTools();


  // if (process.env.NODE_ENV === 'production') {
  //   win.loadURL(url.format({
  //     pathname: path.join(__dirname, 'index.html'),
  //     protocol: 'file:',
  //     slashes: true,
  //   }));
  //   win.setMenu(null);
  // } else {
  //   win.loadURL('http://localhost:8080');
  //   win.webContents.openDevTools();
  // }

  win.on('closed', () => {
    win = null;
  });

  win.on('ready-to-show', () => {
    win.show()
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
