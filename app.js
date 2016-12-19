const { app, BrowserWindow } = require('electron')

let win

function createWindow() {
  win = new BrowserWindow({
    width: 600,
    height: 400
  })

  win.loadURL(`file://${__dirname}/app/index.html`)

  // Uncomment to enable dev tools
  //win.webContents.openDevTools()

  win.on('close', function() {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-close', function() {
  if(process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function() {
  if(win === null) {
    createWindow()
  }
})
