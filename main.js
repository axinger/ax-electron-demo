var electron = require('electron')
var app = electron.app // 引用app
/// 全局快捷键
var globalShortcut = electron.globalShortcut
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
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit()
//   }
// })


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
  // require('./main/menu.js')
  /// 默认打开调试窗口
  mainWindow.webContents.openDevTools()

  let list = [
    {
      'key': 'option+E',
      'title': '打开网页'
    },
    {
      'key': 'option+W',
      'title': '打开APP'
    },
  ]

  list.forEach(function (value, index) {

    // console.log('list = ' + value + ' = ', index);

    globalShortcut.register(value.key, function () {
      // alert('全局快捷键');
      console.log('操作全局注册快捷键 = '+value.key);
      // mainWindow.loadURL('https://www.baidu.com/');
    });

    let isRegister = globalShortcut.isRegistered(value.key)
    console.log('全局注册快捷键 = ' + value.title + isRegister ? '成功' : '失败');
  })


  mainWindow.loadFile('index.html')
  /// BrowserView 嵌入网页
  // var BrowserView = electron.BrowserView
  // var view = new BrowserView()
  // mainWindow.setBrowserView(view)
  // view.setBounds({x:0,y:200,width:500,height:300})
  // view.webContents.loadFile('view/subView.html')
  // view.webContents.loadURL('https://www.baidu.com/')
  

  mainWindow.on('close', () => {
    mainWindow = null;
  })
  
  mainWindow.on('will-quit', function () {
    ///注销快捷键
    console.log('will-quit ===========');
    globalShortcut.unregisterAll();
  })

})






