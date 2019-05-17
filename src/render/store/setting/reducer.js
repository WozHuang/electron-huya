import * as type from './action-type';
import {setWindowMaximize} from "@/render/util/util";

const defaultState = {
  sidebarOpened: true, // 侧边栏是否打开
  isMaximized: false, // 主窗口是否最大化
};

export default function setting(state = defaultState, action = {}) {
  switch (action.type) {
    case type.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpened: action.status !== undefined ? action.status : !state.sidebarOpened
      };

    case type.TOGGLE_MAXIMIZED: {
      const isMaximized = action.status !== undefined ? action.status : !state.isMaximized;
      setWindowMaximize(isMaximized);
      return {
        ...state,
        isMaximized
      };
    }

    default:
      return state;
  }
}
