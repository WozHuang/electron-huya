import {app, BrowserWindow} from 'electron'; // eslint-disable-line
import os from 'os';

let mainWindow;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 550,
    // useContentSize: true,
    width: 550,
    webPreferences: {
      nodeIntegration: true,
      // webSecurity: false,
    },
    // 无边框+透明
    // frame: true,
    // transparent: false,
    // resizable: true,
  });

  // 修改客户端发出请求的userAgent，在请求的时候用到
  // mainWindow.webContents.setUserAgent('Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.62 Mobile Safari/537.36');

  // 区分开发环境和生产环境
  if(process.env.NODE_ENV === 'development'){
    mainWindow.loadURL('http://localhost:5000')
  }else {
    mainWindow.loadFile('index.html');
  }

  // ipc(mainWindow);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  // 如果是linux系统的话要延迟启动，因为透明窗口在linux下有bug
  // 如果不用透明窗口可以去掉判断
  if (/linux/i.test(os.type())) {
    setTimeout(createWindow, 1000);
  } else {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

