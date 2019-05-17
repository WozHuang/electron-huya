import * as type from './action-type'

// 切换或打开侧边栏
// 不传status时默认切换当前状态
// 传值时切换为目标状态
export function toggleSidebar({status} = {}) {
  return {
    type: type.TOGGLE_SIDEBAR,
    status
  }
}

// 切换窗口最大化状态
// 不传status时默认切换当前状态
// 传值时切换为目标状态
export function toggleMaximized({status} = {}) {
  return {
    type: type.TOGGLE_MAXIMIZED,
    status
  }
}
