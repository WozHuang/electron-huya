import React from 'react';
import PropTypes from 'prop-types';
import style from './LiveItem.module.less';

export default class LiveItem extends React.Component {
  static propTypes = {
    roomData: PropTypes.object.isRequired
  };

  playLive = () => {
    // 远程内容禁用 node集成
    // window.open(`http://liveshare.huya.com/iframe/${this.props.roomData.profileRoom}`, '_blank', 'nodeIntegration=no');
  };

  render() {
    const { roomData } = this.props;
    // roomData.screenshot = 'https://live-cover.msstatic.com/huyalive/1447160735-1447160735-6215508028880322560-4795702828-10057-A-0-1/20190515130702.jpg';
    const screenShotSuffix = '?x-oss-process=image/resize,limit_0,m_fill,w_338,h_190/sharpen,80/format,webp/quality,q_90';
    return (
      <div onClick={this.playLive} className={style['wrapper']}>
        <div className={style['poster__wrapper']}>
          <img className={style['poster']} alt={roomData.introduction}
               src={roomData.screenshot + screenShotSuffix}/>
        </div>
        <div className={style['bottom']}>{roomData.introduction}</div>
      </div>
    );
  }
}
