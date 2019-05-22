import {getNotice} from "@/render/api/live";
import EventEmitter from "@/render/util/EventEmitter";

export default class HuyaSocket extends EventEmitter {
  profileRoom; // 房间号
  socket; // websocket实例
  timer; // 心跳 timer
  type; // 消息类型 [ 'getMessageNotice', 'getSendItemNotice', 'getVipEnterBannerNotice' ];
  url; // websocket 地址
  opened = false; // 是否已经打开

  constructor({ profileRoom, type = 'getMessageNotice' }) {
    super();
    this.type = type;
    this.profileRoom = profileRoom;
    this.getUrl();
  }

  getUrl() {
    getNotice({ profileRoom: this.profileRoom })
      .then(data => {
        this.url = data[this.type];
        this.connect();
      })
      .catch(err => {
        this.emit('error', err);
      });
  }

  connect() {
    const socket = this.socket = new WebSocket(this.url);
    socket.onopen = (event) => {
      this.opened = true;
      this.emit('open', event);
      this.timer = setInterval(() => {
        this.ping();
      }, 15000);
    };

    socket.onmessage = (event) => {
      const json = JSON.parse(event.data);
      if (json.statusCode === 200) {
        this.emit('message', json.data);
      } else {
        // 错误处理
        this.emit('errorMessage', json);
      }
    };

    socket.onerror = (err) => {
      this.emit('error', err);
    };

    socket.onclose = (e) => {
      this.opened = false;
      clearInterval(this.timer);
      this.emit('close', e);
    };
  }

  // 关闭
  close() {
    if (this.opened) {
      this.socket && this.socket.close();
    }
  }

  // 心跳包
  ping() {
    this.socket.send('ping');
  }
}
