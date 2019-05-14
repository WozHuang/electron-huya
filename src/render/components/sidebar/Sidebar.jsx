import React from 'react';
import style from './Sidebar.module.less';
import Logo from "@/render/components/logo/Logo";
import {Icon} from "antd";
import {connect} from "react-redux";
import {toggleSidebar} from "@/render/store/setting/action";
import {Link} from "react-router-dom";

class Sidebar extends React.Component {
  state = {
    menuList: [
      {
        name: '首页',
        path: '/'
      },
      {
        name: '列表',
        path: '/list'
      }
    ]
  };

  render() {
    return (
      <div className={style.wrapper}>
        <Logo/>
        <ul className={style["menu__wrapper"]}>
          {
            this.state.menuList.map(item => (
              <Link to={item.path} key={item.name}>
                <li className={style["menu__item"]}>{item.name}</li>
              </Link>
            ))
          }
        </ul>
        <div onClick={this.props.toggleSidebar} className={style["collapse-button"]}>
          <span className={`${style["icon"]} ${this.props.sidebarOpened ? "" : style["closed"]}`}>
            <Icon type="double-left"/>
          </span>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  sidebarOpened: state.setting.sidebarOpened
}), {
  toggleSidebar
})(Sidebar);
