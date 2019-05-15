/* eslint-disable */
import electron, { BrowserWindow } from 'electron';
import path from 'path';
import electronDebug from 'electron-debug'
electronDebug({showDevTools:false});

electron.app.on('ready', () => {

  // 安装react-devtools
  // 只需要安装一次，安装完成后注释掉这段代码
  BrowserWindow.addDevToolsExtension(path.resolve(__dirname, '../chromeExtension/react-devtools'));
  // console.log('React-devtools has been installed as browser extension.');
});

// Require `main` process to boot app
require('./index');
