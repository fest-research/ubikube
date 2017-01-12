'use strict';

const electron = require('electron');
const app = electron.app;
const url = require('url')
const path = require('path')
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    resizable: false,
    frame: false,
    show: false,
    titleBarStyle: 'hidden'
  });
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'app/index.html'),
    protocol: 'file:',
    slashes: true,
  }));
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
