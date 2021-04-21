window.onload = function () {

    var valueBtn = document.getElementById('valueBtn')

    valueBtn.onclick = function (el) {
        console.log('valueBtn');
        window.opener.postMessage('子页面传值')
        
    }

}

