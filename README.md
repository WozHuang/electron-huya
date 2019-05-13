# electron-huya

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

如果想要用webstorm调试的话可以使用webstorm的连接方式，还能够自动连接

![webstorm-debug](./assets/debug.png)

使用了concurrently同时运行多条命令（开发渲染进程和开发主进程）

使用了 [create-react-app](https://www.html.cn/create-react-app) 作为基础模版，Tag `boilerplate` 可以作为 Electron + React的开发模版，因为 [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) 有点太复杂了所以按照 [electron-vue](https://github.com/SimulatedGREG/electron-vue) 自己搭了一个，更多可以查看 [create-react-app](https://www.html.cn/create-react-app) 的文档 

直接使用electron-packager能够设置Windows下的图标，但是不能设置linux下的。。。，如果想要设置启动项的图标需要使用制作安装包的工具，这个在electron-packager的readme里面有，另外可以通过BrowserWindow的icon选项手动设置底部任务栏里的图标，但是需要注意路径，为了能够获得正确的路径，在webpack打包主进程的时候设置__dirname和__filename为false，electron在运行时才能获得正确的路径，以便找到打包进去的logo路径,见[issue](https://github.com/electron-userland/electron-packager/issues/935)
