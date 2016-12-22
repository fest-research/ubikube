import path from 'path';
import url from 'url';
import {BrowserWindow, app} from 'electron';

let win;

const createWindow = () => {
  win = new BrowserWindow({
    minWidth: 1181,
    minHeight: 800,
    maxWidth: 1181,
    maxHeight: 800,
    frame: false,
    show: false,
    // For MacOS
    titleBarStyle: 'hidden'
  });

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
