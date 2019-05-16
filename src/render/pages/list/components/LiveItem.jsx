import React from 'react';
import PropTypes from 'prop-types';
import style from './LiveItem.module.less';
import MyIcon from "@/render/components/myIcon/MyIcon";

export default class LiveItem extends React.Component {
  static propTypes = {
    roomData: PropTypes.object.isRequired
  };

  playLive = () => {
    // 远程内容禁用 node集成
    window.open(`http://liveshare.huya.com/iframe/${this.props.roomData.profileRoom}`, '_blank', 'nodeIntegration=no');
  };

  render() {
    const { roomData } = this.props;
    const screenShotSuffix = '?x-oss-process=image/resize,limit_0,m_fill,w_338,h_190/sharpen,80/format,webp/quality,q_90';
    return (
      <div onClick={this.playLive} className={style['wrapper']}>
        <div className={style['poster__wrapper']}>
          <img className={style['poster']} alt={roomData.introduction} src={roomData.screenshot + screenShotSuffix}/>
        </div>
        <div className={style['bottom']}>
          <div className={style['introduction']}>
            {roomData.introduction}
          </div>
          <div className={style['bottom__info']}>
            <span className={style['bottom__nick']}>{roomData.nick}</span>
            <span className={style['bottom__fans']}><MyIcon class={style['bottom__fans-icon']} type="icon-fans"/> {roomData.totalCount}</span>
          </div>
        </div>
      </div>
    );
  }
}
