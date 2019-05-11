const webpack = require('webpack');
const mainConfig = require('../config/webpack.main.config');
const path = require('path');
const { spawn } = require('child_process');
const electron = require('electron');
const { electronLog, logStats } = require('./log');

let electronProcess;
let manualRestart = false;

// 使用webpack监听主线程文件
// 并生成到build文件夹内和重启electron主线程
function startMain() {
  return new Promise(resolve => {
    mainConfig.entry = [path.join(__dirname, '../src/main/index.dev.js')];
    mainConfig.mode = 'development';
    const compiler = webpack(mainConfig);

    // 启动监听
    compiler.watch({}, (err, stats) => {
      if (err) {
        /* eslint-disable-next-line no-console */
        console.error(err);
        return;
      }

      logStats('Main', stats);

      // 重启主线程
      if (electronProcess && electronProcess.kill) {
        manualRestart = true;
        process.kill(electronProcess.pid);
        electronProcess = null;
        startElectron();

        setTimeout(() => {
          manualRestart = false;
        }, 5000);
      }

      resolve();
    });
  });
}

//  启动electron主线程
function startElectron() {
  const args = [
    path.join(__dirname, '../build/main.js')
  ];

  electronProcess = spawn(electron, args);

  electronProcess.stdout.on('data', data => {
    electronLog(data, 'blue');
  });
  electronProcess.stderr.on('data', data => {
    electronLog(data, 'red');
  });

  electronProcess.on('close', () => {
    if (!manualRestart) process.exit();
  });
}

startMain()
  .then(startElectron)
  .catch(err => {
    /* eslint-disable-next-line no-console */
    console.error(err);
    process.exit(1);
  });
