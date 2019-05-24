import React from 'react';
import s from './BarrageLauncher.module.less';
import propType from 'prop-types';
import HuyaEmojiParser from "@/render/pages/live/components/components/HuyaEmojiParser";
import {connect} from "react-redux";
import _ from "lodash";

function getRandom(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

/*
弹幕发射器

完全不知道逻辑就是瞎搞，差不多能看就算了，不要重叠太多和卡顿就行

主要功能：
1. 能够根据窗口大小计算轨道数量
2. 少量弹幕时尽量保证弹幕不重叠
3. 少量弹幕时尽量使弹幕在屏幕上方飘过
4. 海量弹幕时应该全屏飘过

注：
1. 每条轨道的高度是25， 字号是24， 刚好一行
2. 所有的弹幕动画都是同一个，使用 transform 从左到右平移，长度均为3000px（这是取了一个必定大于一般屏幕宽度的值）
弹幕速度由时间区分，即 animation-duration 属性，现在是控制弹幕都在25-27秒的时间内跑完3000px（整数时间）
3. 这里的弹幕使用dom开发而不是canvas是为了方便的解决图片表情的问题，而且dom + css3 不见得比canvas差
*/
class BarrageLauncher extends React.Component {
  static propTypes = {
    socket: propType.object.isRequired
  };

  state = {
    list: []
  };

  el = React.createRef();

  trackNumber = 10; // 弹幕轨道数量
  height = 0;
  lastTrack = null;
  lastTrack2 = null;


  componentDidMount() {
    this.props.socket.on('message', msg => {
      this.launch(msg);
    });
    this.addResizeListener();
  }

  componentWillUnmount() {
    this.removeResizeListener();
  }

  // 监听窗口大小变化改变this.trackNumber，保证所有位置上都能出现弹幕
  addResizeListener() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }
  removeResizeListener() {
    window.removeEventListener('resize', this.onResize);
  }
  onResize = _.debounce(() => {
    this.height = this.el.current.clientHeight - 50;
    this.trackNumber = Math.floor(this.height / 25);
  }, 100);

  launch(msg) {
    if (this.props.hideTV && msg.showMode === 2) {
      return;
    }
    const speedMin = this.props.barrageSpeed * 30 + 10;
    const duration = getRandom(speedMin, speedMin + 2);
    let track = this.lastTrack;
    let count = 0;
    // 尽量保证和前两条弹幕不在同一条轨道上
    while (track === this.lastTrack || track === this.lastTrack2) {
      track = getRandom(1, this.trackNumber || 10);
      // 如果目前弹幕数量不足30条，把弹幕都放在靠前的轨道上
      if (this.state.list.length < 30) {
        track = track % 15;
      }
      // 最多循环5次
      count++;
      if (count > 5) {
        break;
      }
    }
    this.lastTrack2 = this.lastTrack;
    this.lastTrack = track;
    const item = {
      ...msg,
      styleObj: {
        top: track * 25 + 'px',
        animationDuration: duration + 's'
      }
    };

    // 弹幕过多时只取最新的100条，避免爆炸
    this.setState({
      list: [...this.state.list.slice(this.props.barrageNumberLimit || 100), item]
    });
    setTimeout(() => {
      this.remove(item);
    }, duration * 1000);
  }

  remove(item) {
    const idx = this.state.list.indexOf(item);
    if (idx === -1) return;
    const newList = this.state.list.slice();
    newList.splice(idx, 1);
    this.setState({
      list: newList
    });
  }

  render() {
    return (
      <div ref={this.el} style={{ opacity: this.props.barrageOpacity }} className={s['wrapper']}>
        {
          this.state.list.map(item => (
            <div key={item.time} style={item.styleObj} className={s['barrage-item']}>
              <HuyaEmojiParser content={item.content}/></div>
          ))
        }
      </div>
    );
  }
}

export default connect(
  state => {
    return ({
      barrageSpeed: state.setting.barrageSpeed, // 弹幕速度等级，最小1，最大10
      barrageOpacity: state.setting.barrageOpacity, // 弹幕透明度，最小0， 最大1
      hideTV: state.setting.hideTV, // 过滤上电视弹幕
      barrageNumberLimit: -1 * state.setting.barrageNumberLimit, // 弹幕数量限制（过多dom节点太多会卡），暂定控制在100-500间吧
    });
  }
)(BarrageLauncher);
