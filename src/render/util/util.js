const electron = window.electron;

/**
 * 主体区域滚动到顶部
 * @param scrollTop
 */
export function scrollTop(scrollTop) {
  if (scrollTop)
    document.getElementById('content-box').scrollTop = scrollTop;
  else
    return document.getElementById('content-box').scrollTop;
}

/**
 * 切换最大化最小化窗口状态
 * @param status
 */
export function setWindowMaximize(status = true) {
  const currentWindow = electron.remote.getCurrentWindow();
  if (status) {
    currentWindow.maximize();
  } else {
    currentWindow.unmaximize();
  }
}

/**
 * 最小化窗口
 */
export function minimizeWindow() {
  const currentWindow = electron.remote.getCurrentWindow();
  currentWindow.minimize();
}

/**
 * 关闭当前窗口
 */
export function closeWindow() {
  const currentWindow = electron.remote.getCurrentWindow();
  currentWindow.close();
}
