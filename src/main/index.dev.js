/* eslint-disable no-console */
import { BrowserWindow } from 'electron';
import path from 'path';

require('electron').app.on('ready', () => {

  // 安装vue-devtools
  BrowserWindow.addDevToolsExtension(path.resolve(__dirname, '../../chromeExtension/react-devtools'));
  console.log('React-devtools has been installed as browser extension.');
});

// Require `main` process to boot app
require('./index');
