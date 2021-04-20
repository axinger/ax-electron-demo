const { Menu, BrowserWindow } = require('electron')
// 菜单栏
var template = [
    {
        label: '项目',//mac第一个默认当前app名称
        submenu: [
            {
                label: '关于', 
                accelerator:'command+Q',// 快捷键
                click: function () {
                    var win = new BrowserWindow({
                        width: 500,
                        height: 500,
                        webPreferences: {
                            nodeIntegration: true,   // 集成node环境
                          }
                    })// 事件

                    win.loadFile('demo2.html')
                    win.on('close',()=>{
                        win = null;
                    })
                }
            },
            { label: '检查更新' },
        ]
    },
    {
        label: '选择',
        submenu: [
            { label: '全选' },
            { label: '展开选定内容' },
        ]
    },
]

var m = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(m)


