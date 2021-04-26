window.onload = () => {

    setTimeout(() => {
        // alert 子串拼接只能用+ ,不能用逗号
        // alert('webveiew ' + document.querySelector('.index-logo-src').src)
        // console.log('webveiew 加载js');
        // 返回一个 . 表示 class, # 表示 id
        // 返回多个
        // alert(document.getElementsByClassName('index-logo-src')[0].src);
        // 添加绑定事件,不会影响原本的事件
        document.getElementById('su').onclick = function() {
            alert('点击搜索')
        }
    }, 2000);

}