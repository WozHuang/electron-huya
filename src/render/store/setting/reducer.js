import * as type from './action-type';
import {setWindowMaximize} from "@/render/util/util";

const defaultState = {
  sidebarOpened: true, // 侧边栏是否打开
  isMaximized: false, // 主窗口是否最大化
  barrageSpeed: 0.5, // 弹幕速度等级，最小1，最大10
  barrageOpacity: 0.8, // 弹幕透明度，最小0， 最大1
  hideTV: true, // 过滤上电视弹幕
  barrageNumberLimit: 200, // 弹幕数量限制（过多dom节点太多会卡），暂定控制在100-500间吧
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
