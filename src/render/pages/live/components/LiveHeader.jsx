import React from 'react';
import PropTypes from 'prop-types';
import style from './LiveHeader.module.less';

export default class LiveHeader extends React.Component {
  static propTypes = {
    liveData: PropTypes.object.isRequired
  };

  render() {
    const { liveData } = this.props;
    return (
      <div className={style['wrapper']}>
        <div className={style['left']}>
          <div className={style['introduction']}>
            {liveData.TT_ROOM_DATA.introduction}
          </div>
          <img className={style['avatar']} src={liveData.TT_PROFILE_INFO.avatar} alt={liveData.TT_PROFILE_INFO.nick}/>
        </div>
        <div className={style['right']}>222</div>
      </div>
    );
  }
}
