import React from "react";
import style from './Logo.module.less';
import {withRouter} from 'react-router-dom';

@withRouter
class Logo extends React.Component {

  clickHandler = () => {
    // const url = 'http://liveshare.huya.com/iframe/11342412';
    // const url = 'http://baidu.com';
    // window.electron.shell.openExternal(url);
    // window.open(url, "", "frame=false");
    this.props.history.push('/');
  };

  render() {
    return (
      <div className={style["Logo-wrapper"]}>
        <img
          onClick={this.clickHandler}
          className={style.Logo}
          src={process.env.PUBLIC_URL + '/favicon.png'}
          alt="logo"
          title="Electron Huya"
        />
        <div onClick={this.clickHandler} title="Electron Huya" className={style.name}>Electron Huya</div>
      </div>
    );
  }
}

export default Logo;
