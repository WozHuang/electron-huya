import React from 'react';
import PropTypes from 'prop-types';
import style from './LiveHeader.module.less';
import MyIcon from "@/render/components/myIcon/MyIcon";

export default class LiveHeader extends React.Component {
  static propTypes = {
    liveData: PropTypes.object.isRequired
  };

  doSubscribe = () => {
    window.electron.remote.dialog.showMessageBox({
      message: '这个功能还没开发呢嘤嘤嘤',
      title: '提示'
    });
  };

  render() {
    const { liveData } = this.props;
    return (
      <div className={style['wrapper']}>
        <div className={style['left']}>
          <div className={style['introduction']}>
            {liveData.TT_ROOM_DATA.introduction}
          </div>
          <div className={style['profile']}>
            <span><img
              className={style['profile__avatar']}
              src={liveData.TT_PROFILE_INFO.avatar}
              alt={liveData.TT_PROFILE_INFO.nick}/>{liveData.TT_PROFILE_INFO.nick}</span>
            <span><MyIcon
              className={`${style['profile__icon']} ${style['icon-category']}`}
              type="icon-category"
            />{liveData.TT_ROOM_DATA.gameFullName}</span>
            <span><MyIcon
              className={`${style['profile__icon']} ${style['icon-id']}`}
              type="icon-id"
            />{liveData.TT_ROOM_DATA.profileRoom}</span>
            <span><MyIcon
              className={`${style['profile__icon']} ${style['icon-fans']}`}
              type="icon-fans"
            />{liveData.TT_ROOM_DATA.totalCount}</span>
          </div>
        </div>
        <div className={style['right']}>
          <div onClick={this.doSubscribe} className={style['subscribe']}>
            <span className={style['subscribe__status']}><MyIcon className={style['subscribe__icon']}
                                                                 type="icon-subscribe"/>订阅</span>
            <span className={style['subscribe__number']}>{liveData.TT_PROFILE_INFO.fans || 0}</span>
          </div>
        </div>
      </div>
    );
  }
}
