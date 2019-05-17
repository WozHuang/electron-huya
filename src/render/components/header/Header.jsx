import React from 'react';
import {Icon} from "antd";
import style from './Header.module.less';
import {withRouter} from 'react-router-dom';
import {withRefresh} from "@/render/util/mixin";
import {toggleMaximized} from "@/render/store/setting/action";
import {connect} from "react-redux";
import {setMaximize} from "@/render/util/util";

@withRouter
@withRefresh
class Header extends React.Component {

  componentDidMount() {
    // 在应用启动时，如果发现上次退出时redux中存储的isMaximized为true，主动最大化窗口
    if (this.props.isMaximized) {
      setMaximize(this.props.isMaximized);
    }
  }

  toList = () => {
    this.props.history.goBack();
  };

  reload = () => {
    // this.props.history.go(0);
    // this.props.history.push('/redirectTo?t='+this.props.history.location.pathname)
    this.refreshPage();
  };

  render() {
    const canGoBack = this.props.history.location.pathname !== '/';
    return (
      <div className={style['wrapper']}>
        <div className={style['left']}>
          {
            canGoBack && <span onClick={this.toList} className={style['btn']}><Icon type="rollback"/></span>
          }
          <span onClick={this.reload} className={style['btn']}><Icon type="reload"/></span>
        </div>
        <div className={style['right']}>
          <span onClick={this.reload} className={style['btn']}><Icon type="menu"/></span>
          <span className={style['separator']}/>
          <span onClick={this.reload} className={style['btn']}><Icon type="line"/></span>
          <span onClick={this.props.toggleMaximized} className={style['btn']}><Icon type="border"/></span>
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
