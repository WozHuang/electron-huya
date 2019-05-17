import React from 'react';
import {Icon} from "antd";
import style from './Header.module.less';
import {withRouter} from 'react-router-dom';
import {withRefresh} from "@/render/util/mixin";

@withRouter
@withRefresh
class Header extends React.Component {

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
        {
          canGoBack && <span onClick={this.toList} className={style['return-btn']}><Icon type="rollback"/></span>
        }
        <span onClick={this.reload} className={style['reload-btn']}><Icon type="reload"/></span>
      </div>
    );
  }
}

export default Header;
