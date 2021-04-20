var electron = require('electron')
var app = electron.app // 引用app
var BrowserWindow = electron.BrowserWindow //窗口

const path = require('path')

var mainWindow = null // 主窗口


// function createWindow() {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       contextIsolation: false,//这个很重要
//       nodeIntegrationInWorker: true,
//       nodeIntegrationInSubframes: true,
//       nodeIntegration: true,   // 集成node环境
//       enableRemoteModule: true,   // 使用remote模块,打开新页面
//       preload: path.join(__dirname, 'preload.js'),
//     }
//   })

//   win.loadFile('index.html')
// }


// app.whenReady().then(() => {
//   createWindow()

//   app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//       createWindow()
//     }
//   })
// })

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


app.on('ready', () => {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,//这个很重要
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubframes: true,
      nodeIntegration: true,   // 集成node环境
      enableRemoteModule: true,   // 使用remote模块,打开新页面
      preload: path.join(__dirname, 'preload.js'),
    }
  })
  require('./main/menu.js')
  mainWindow.webContents.openDevTools()
  mainWindow.loadFile('index.html')
  mainWindow.on('close', () => {
    mainWindow = null;
  })
})

