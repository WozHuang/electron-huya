import React from 'react';
import {Icon} from "antd";
import style from './Header.module.less';
import {withRouter} from 'react-router-dom';
import {withRefresh} from "@/render/util/mixin";
import {toggleMaximized} from "@/render/store/setting/action";
import {connect} from "react-redux";
import {setWindowMaximize, minimizeWindow, closeWindow} from "@/render/util/util";

@withRouter
@withRefresh
class Header extends React.Component {

  componentDidMount() {
    // 在应用启动时，如果发现上次退出时redux中存储的isMaximized为true，主动最大化窗口
    if (this.props.isMaximized) {
      setWindowMaximize(this.props.isMaximized);
    }
  }

  goBack = () => {
    this.props.history.goBack();
  };

  reload = () => {
    this.refreshPage();
  };

  minimize = () => {
    minimizeWindow();
  };

  close = () => {
    closeWindow();
  };

  menu = () => {
    window.electron.remote.dialog.showMessageBox({
      message: '这个功能还没开发呢嘤嘤嘤',
      title: '提示'
    });
  };

  render() {
    const canGoBack = this.props.history.location.pathname !== '/';
    return (
      <div className={style['wrapper']}>
        <div className={style['left']}>
          {
            canGoBack && <span onClick={this.goBack} className={style['btn']}><Icon type="rollback"/></span>
          }
          <span onClick={this.reload} className={style['btn']}><Icon type="reload"/></span>
        </div>
        <div className={style['right']}>
          <span onClick={this.menu} className={style['btn']}><Icon type="menu"/></span>
          <span className={style['separator']}/>
          <span onClick={this.minimize} className={style['btn']}><Icon type="minus"/></span>
          <span onClick={this.props.toggleMaximized} className={style['btn']}><Icon type="border"/></span>
          <span onClick={this.close} className={style['btn']}><Icon type="close"/></span>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    isMaximized: state.setting.isMaximized
  }),
  {
    toggleMaximized
  }
)(Header);
