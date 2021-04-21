/// nodejs 模块
const fs = require('fs')

// var path = require('path')
// var filepath = path.join(__dirname, 'test.txt');
// console.log('filepath = '+filepath);
var path = require('path')
var filepath = path.join(__dirname, 'testFile.txt');

var { shell } = require('electron')
/// 子线程渲染,在remote中
const { dialog } = require('electron').remote

// 使用主进程中的变量
const BrowserWindow = require('electron').remote.BrowserWindow
const { remote, app } = require('electron')

window.onload = function () {

    var btn = this.document.getElementById('didBtn')
    var div = this.document.getElementById('allbabyDiv')
    var writeBtn = this.document.getElementById('writeBtn')
    var crearNewPageBtn = this.document.getElementById('crearNewPageBtn')

    var aHref = this.document.getElementById('aHref')

    var openSubViewBtn = this.document.getElementById('openSubView')

    function _readFile() {
        fs.readFile(filepath, (err, data) => {
            console.log('data =' + data);
            div.innerHTML = data;
        })
    }

    function _writeFile() {
        fs.writeFile(filepath, div.innerText + "写入尾部", (err) => {
            if (!err) {
                _readFile();
            }
        });
    }
    btn.onclick = function () {
        console.log('filepath = ' + filepath);

        _readFile();
    }

    writeBtn.onclick = function () {
        console.log('原来内容 = ' + div.innerText);
        _writeFile();
    }
    crearNewPageBtn.onclick = function () {

        var newWin = new BrowserWindow({
            width: 500,
            height: 500,
        });

        newWin.loadFile('view/subView.html');
        newWin.on('close', () => {
            newWin = null;
        })
    }

    aHref.onclick = function (el) {
        el.preventDefault();//阻止默认行为

        var href = this.getAttribute("href");
        shell.openExternal(href)
    }
    openSubViewBtn.onclick = function (el) {
        console.log('openSubView');
        window.open('view/subView.html')
    }
    window.addEventListener('message', function (msg) {
        //    var data = JSON.stringify(msg.data)
        var data = msg.data

        console.log('JSON msg = ' + JSON.stringify(msg));
        console.log('msg = ' + data);
        console.log('msg.data = ' + msg.data);
        document.getElementById('subViewValueDiv').innerHTML = data
    })


    selectFile();
    saveFile();
    alertMsg();
    net();
    note();
}

/// 选择文件
function selectFile() {
    var selectFileBtn = document.getElementById('selectFileBtn')
    selectFileBtn.onclick = function (el) {
        /// 这个是异步的
        dialog.showOpenDialog({
            title: '请选择文件',
            // defaultPath:'aaa',
            // buttonLabel:'我要打开',
            /// 过滤器,文件类型
            filters: [
                {
                    name: 'img',
                    extensions: ['jpg', 'jpeg', 'png'],
                },
            ],

        }).then(function (res) {
            console.log('res = ' + JSON.stringify(res));
            if (!res.canceled) {
                document.getElementById('fileImg').setAttribute('src', res.filePaths[0])
            }


        }).catch(function (err) {
            console.log('err = ' + err);
        })
    }
}

function saveFile() {
    var btn = document.getElementById('saveFileBtn')
    btn.onclick = function (el) {
        dialog.showSaveDialog({
            title: '保存文件',
            /// 默认文件名
            defaultPath: 'test.json',
            // nameFieldLabel:'test.json'
        }).then(function (res) {
            console.log('保存文件 = ' + JSON.stringify(res));
            if (!res.canceled) {
                fs.writeFileSync(res.filePath, '保存文件写入内容');
            }

        }).catch(function (err) {
            console.log('err = ' + err);
        })
    }
}


function alertMsg() {
    var btn = document.getElementById('msgBtn')
    btn.onclick = function () {
        dialog.showMessageBox({
            // an be `"none"`, `"info"`, `"error"`, `"question"` or `"warning"`. On Windows,
            type: 'none',
            title: '标题',
            message: '副标题',
            detail: 'detail',
            buttons: [
                '很好的',
                '好的',
                '不好的',
            ],

        }).then(function (res) {
            console.log('res = ' + res.response);
        })
    }
}

/// 监听网络
function net() {

    window.addEventListener('online', function (res) {
        alert('有网了..')
    })

    window.addEventListener('offline', function (res) {
        alert('断网了...')
    })

}

function note() {
    var selectFileBtn = document.getElementById('noteBtn')
    selectFileBtn.onclick = function () {
        Notification.requestPermission().then(function (permission) {
            if (permission == 'granted') {
                var notification = new Notification(
                    '桌面推送',
                    {
                        body: '这是我的第一条桌面推送',
                        // icon: 'some/icon/url',
                        // tag:'2',// 标记是否会重复
                        // badge:'4',
                    },
                );
                notification.onclick = function () {
                    console.log('点击');
                    notification.close();
                };
            } else {
                Notification.requestPermission();
                console.log('没有权限,用户拒绝:Notification');
            }
        })

    }


}
// 右键
var rightTemplate = [
    {
        label: '复制',
        accelerator: 'command+C',// 快捷键
        click: function () {
            alert('复制')
        }
    },
    {
        label: '粘贴',
        accelerator: 'command+V',// 快捷键
        click: function () {

        }
    },
]

var m = remote.Menu.buildFromTemplate(rightTemplate)
window.addEventListener('contextmenu', function (el) {

    el.preventDefault()
    m.popup({ window: remote.getCurrentWindow() })

})


