# Electron-Huya

一个使用 Electron + React 实现的虎牙直播客户端

## 脚本

### `npm run dev`

启动开发环境

### `npm run build`

开始构建，build得到的应用会放在release文件夹内

**PS**
> build 文件夹是临时目录，在开发和打包的时候会生成

## 其他

使用chrome://inspect/可以进行调试，但是超级蛋疼。。。

如果想要用`webstorm`调试的话可以使用`webstorm`的连接方式，还能够自动连接

![`webstorm`-debug](./assets/debug.png)

使用了concurrently同时运行多条命令（开发渲染进程和开发主进程）

使用了 [create-react-app](https://www.html.cn/create-react-app) 作为基础模版，Tag `boilerplate` 可以作为 Electron + React的开发模版，因为 [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) 有点太复杂了所以按照 [electron-vue](https://github.com/SimulatedGREG/electron-vue) 自己搭了一个，更多可以查看 [create-react-app](https://www.html.cn/create-react-app) 的文档 ,另外为了修改里面的一些配置，使用了 `react-app-rewired` 这个库，这是在`antd`官网上提到的。

直接使用electron-packager能够设置Windows下的图标，但是不能设置linux下的。。。，如果想要设置启动项的图标需要使用制作安装包的工具，这个在electron-packager的readme里面有，另外可以通过BrowserWindow的icon选项手动设置底部任务栏里的图标，但是需要注意路径，为了能够获得正确的路径，在webpack打包主进程的时候设置__dirname和__filename为false，electron在运行时才能获得正确的路径，以便找到打包进去的logo路径,见[issue](https://github.com/electron-userland/electron-packager/issues/935)

使用redux-persist持久化存储，[参考链接](https://www.jianshu.com/p/8a2b9be974a7)

在列表中使用了less循环计算出在不同宽度下的项目宽度（媒体查询，见 List.module.less）

关于less的作用域的小陷阱：声明函数时就已经确定了作用域范围，与JS中闭包取值相同，

```less
@i: 1px;
.func(){
  width: @i;
}
.a{
  @i :2px;
  .func();
}
```

最终得到的结果是
```css
.a {
  width: 1px;
}
```

**使用 `less + css var()变量` 做换肤功能：**

见 style/theme.less 文件，其实直接使用var() 也可以，但是这样IDE就没有了代码提示，如果不需要考虑兼容性的话直接上CSS var就可以了，反正现在EDGE也已经支持了，[关于兼容性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/var)，如果考虑兼容性做个🔨换肤，这种功能也是锦上添花罢了。

**使用iconfont上的图标**

见[antd上的说明](https://ant.design/components/icon-cn/#components-icon-demo-iconfont)，在这里对里面的 `Icon.createFromIconfontCN` 生成的组件进行一个包装，以便IDE有代码提示，PS：在开发完成后应当把文件下载下来并手动引入,相关代码在 `components/myIcon/MyIcon`

**实现刷新**

加了一个专用于刷新的页面，不渲染东西，在加载时就刷新到,在写一个混入的方法，以便调用
