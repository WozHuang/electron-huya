# electron-huya

一个使用 Electron + React 实现的虎牙直播客户端

## 脚本

### `npm run dev`

启动开发环境

### `npm run build`

开始构建，build得到的应用会放在release文件夹内

> PS:build文件夹是临时目录，在开发和打包的时候会生成

## 其他

使用了concurrently同时运行多条命令（开发渲染进程和开发主进程）

使用了 [create-react-app](https://www.html.cn/create-react-app) 作为基础模版，Tag `boilerplate` 可以作为 Electron + React的开发模版，因为 [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) 有点太复杂了所以按照 [electron-vue](https://github.com/SimulatedGREG/electron-vue) 自己搭了一个，更多可以查看 [create-react-app](https://www.html.cn/create-react-app) 的文档 
