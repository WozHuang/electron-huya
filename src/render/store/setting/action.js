import * as type from './action-type'

// 切换或打开侧边栏
export function toggleSidebar() {
  return {
    type: type.TOGGLE_SIDEBAR
  }
}
