import React from 'react';
import style from './App.module.less';
import Sidebar from "@/render/components/sidebar/Sidebar";
import {connect} from "react-redux";
import RootRouter from "@/render/router/RootRouter";

class App extends React.Component {

  render() {
    // const logo = 1 ? logo : process.env.PUBLIC_URL + '/favicon.png';
    return (
      <div className={style["body-wrapper"]}>
        <div className={`${style["sidebar-wrapper"]} ${this.props.sidebarOpened ? "" : style["sidebar-wrapper--collapse"]}`}>
          <Sidebar/>
        </div>
        <div className={style["content-wrapper"]}>
          <RootRouter/>
        </div>
      </div>
    );
  }
}

export default connect(state => ({
  sidebarOpened: state.setting.sidebarOpened
}))(App);
