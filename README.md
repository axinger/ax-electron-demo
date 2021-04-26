# electron_demo
electron案例
# 主进程,渲染进程
只有2个进程

# log
在渲染进程中调用console.log，其输出需要打开渲染进程所对应网页的调试工具，在调试工具的console中才能看到。打开命令是renderWindow.openDevTools()。
主进程中的打印，在终端可以直接看到。

