import React from 'react';
import PropTypes from 'prop-types';
import style from './LiveItem.module.less';
import MyIcon from "@/render/components/myIcon/MyIcon";

class LiveItem extends React.Component {
  static propTypes = {
    liveData: PropTypes.object.isRequired,
    onPlay: PropTypes.func
  };

  playLive = () => {
    this.props.onPlay(this.props.liveData.profileRoom);
  };

  render() {
    const { liveData } = this.props;
    const screenShotSuffix = '?x-oss-process=image/resize,limit_0,m_fill,w_338,h_190/sharpen,80/format,webp/quality,q_90';
    return (
      <div onClick={this.playLive} className={style['wrapper']}>
        <div className={style['poster__wrapper']}>
          <img className={style['poster__content']} alt={liveData.introduction} src={liveData.screenshot + screenShotSuffix}/>
        </div>
        <div className={style['bottom']}>
          <div className={style['introduction']}>
            {liveData.introduction}
          </div>
          <div className={style['bottom__info']}>
            <span className={style['bottom__nick']}>{liveData.nick}</span>
            <span className={style['bottom__fans']}><MyIcon className={style['bottom__fans-icon']} type="icon-fans"/> {liveData.totalCount}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default LiveItem;
