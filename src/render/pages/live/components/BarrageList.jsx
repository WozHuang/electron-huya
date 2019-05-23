import React from 'react';
import style from './BarrageList.module.less';
import propTypes from 'prop-types';
import BarrageItem from "@/render/pages/live/components/components/BarrageItem";

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
    const element = this.el.current;
    const list = this.state.messageList.slice(-100);
    list.push(msg);
    const isAtBottom = this.isAtBottom();
    this.setState({
      messageList: list
    }, () => {
      if(isAtBottom){
        element.scrollTop = 999999;
        // 直接设置一个必定大于 scrollHeight 的值即可滚动到底部
        // 避免读取scrollHeight 再次造成回流
      }
    });
  }

  // 判断目前列表是否已经滚动到了最下面
  isAtBottom(){
    const element = this.el.current;
    return (element.scrollTop + element.clientHeight) === element.scrollHeight;
  }

  render() {
    return <div className={style['wrapper']} ref={this.el}>
      <ul className={style['list']}>
        {
          this.state.messageList.map(item => (
            <li key={item.time}><BarrageItem message={item}/></li>
          ))
        }
      </ul>
    </div>;
  }
}
