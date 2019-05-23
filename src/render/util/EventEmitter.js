/**
 * 一个发布订阅类
 */
export default class EventEmitter {
  listeners = {};

  // 新增订阅
  on(type, handler) {
    (this.listeners[type] || (this.listeners[type] = [])).push(handler);
  }

  // on 的别名
  addListener(...arg) {
    this.on(...arg);
  }

  // 仅一次的订阅
  once(type, handler) {
    const f = (...arg) => {
      handler.apply(this, arg);
      this.off(type, f);
    };
    this.on(type, f);
  }

  // 取消订阅
  off(type, handler) {
    if (this.listeners[type]) {
      const idx = this.listeners[type].indexOf(handler);
      if (idx !== -1) {
        this.listeners[type].splice(idx, 1);
      }
    }
  }

  // 传入type时，取消对应时间的所有订阅
  // 不传入type时，取消所有事件的订阅
  removeAll(type) {
    if (type && this.listeners[type]) {
      delete this.listeners[type];
    } else {
      this.listeners = {};
    }
  }

  // 发布
  emit(type, ...arg) {
    (this.listeners[type] || []).forEach(handler => handler(...arg));
    (this.listeners['*'] || []).forEach(handler => handler(type, ...arg));
  }
}
