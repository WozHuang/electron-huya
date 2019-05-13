import * as type from './action-type';

const defaultState = {
  sidebarOpened: true
};

export default function setting(state = defaultState, action = {}) {
  switch (action.type) {
    case type.TOGGLE_SIDEBAR:
      return { ...state, sidebarOpened: !state.sidebarOpened };
    default:
      return state;
  }
}
