import React from 'react';
import style from './BarrageList.module.less';
import propTypes from 'prop-types';

export default class BarrageList extends React.Component {
  static propTypes = {
    liveData: propTypes.object.isRequired,
    socket: propTypes.object.isRequired
  };
  state = {
    messageList: []
  };
  el = React.createRef();

  componentDidMount() {
    this.props.socket.on('message', this.addMessage.bind(this));
  }

  // 新增信息，只显示最新的100条
  addMessage(msg) {
    const list = this.state.messageList.slice(-100);
    list.push(Object.assign(msg, { time: Date.now() }));
    this.setState({
      messageList: list
    }, () => {
      // 直接设置一个必定大于 scrollHeight 的值即可滚动到底部
      // 避免读取scrollHeight 造成回流
      this.el.current.scrollTop = 999999;
    });
  }

  render() {
    return <div className={style['wrapper']} ref={this.el}>
      <ul className={style['list']}>
        {
          this.state.messageList.map(item => (
            <li key={item.time}>{item.content}</li>
          ))
        }
      </ul>
    </div>;
  }
}
