import path from 'path';
import url from 'url';
import {BrowserWindow, app} from 'electron';

let win;

const createWindow = () => {
  win = new BrowserWindow({width: 800, height: 600});

  if (process.env.NODE_ENV === 'production') {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    }));
    win.setMenu(null);
  } else {
    win.loadURL('http://localhost:8080');
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null;
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
