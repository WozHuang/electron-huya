import React from 'react';
import style from "./Hello.module.less";
import logo from "@/render/pages/hello/logo.svg";
import {connect} from "react-redux";
import {toggleSidebar} from "@/render/store/setting/action";

class Hello extends React.Component {

  clickHandler = () => {
    const electron = window.electron;
    electron.remote.dialog.showMessageBox({
      message: '雷猴呀',
      title: '提示'
    });
  };

  render() {
    // const url ="http://liveshare.huya.com/iframe/11342412";
    const url ="http://www.baidu.com";
    return (
      <div className={style.App}>
        <header className={style['App-header']}>
          <img onClick={this.props.toggleSidebar} src={logo} className={style['App-logo']} alt="logo"/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={this.clickHandler}>click me!</button>
          <a
            className={style['App-link']}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open HuYa
          </a>
        </header>
      </div>
    );
  }
}
export default connect(()=>({}),{
  toggleSidebar
})(Hello);
