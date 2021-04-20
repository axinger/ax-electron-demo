const fs = require('fs')

// var path = require('path')
// var filepath = path.join(__dirname, 'test.txt');
// console.log('filepath = '+filepath);
var path = require('path')
var filepath = path.join(__dirname, 'testFile.txt');

var { shell } = require('electron')

// 使用主进程中的变量
const BrowserWindow = require('electron').remote.BrowserWindow
const { remote, app } = require('electron')

window.onload = function () {

    var btn = this.document.getElementById('didBtn')
    var div = this.document.getElementById('allbabyDiv')
    var writeBtn = this.document.getElementById('writeBtn')
    var crearNewPageBtn = this.document.getElementById('crearNewPageBtn')

    var aHref = this.document.getElementById('aHref')

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

        newWin.loadFile('demo2.html');
        newWin.on('close', () => {
            newWin = null;
        })
    }

    aHref.onclick = function (el) {
        el.preventDefault();//阻止默认行为

        var href = this.getAttribute("href");
        shell.openExternal(href)
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
