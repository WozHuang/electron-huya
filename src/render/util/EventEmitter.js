export default class EventEmitter {
  listeners = {};

  on(type, handler) {
    (this.listeners[type] || (this.listeners[type] = [])).push(handler);
  }

  off(type, handler) {
    if (this.listeners[type]) {
      const idx = this.listeners.indexOf(handler);
      if (idx !== -1) {
        this.listeners[type].splice(idx, 1);
      }
    }
  }

  emit(type, ...arg) {
    (this.listeners[type] || []).forEach(handler => handler(...arg));
    (this.listeners['*'] || []).forEach(handler => handler(type,...arg));
  }
}
