const electron = window.electron;

/**
 * 主体区域滚动到顶部
 * @param scrollTop
 */
export function scrollToTop(scrollTop = 0) {
  document.getElementById('content-box').scrollTop = scrollTop;
}

/**
 * 切换最大化最小化窗口状态
 * @param status
 */
export function setMaximize(status = true) {
  const currentWindow = electron.remote.getCurrentWindow();
  if (status) {
    currentWindow.maximize();
  } else {
    currentWindow.unmaximize();
  }
}
