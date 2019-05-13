import React from 'react';
import logo from './logo.svg';
import style from './App.module.less';
import {Provider} from "react-redux";
import store from './store/store';
import Sidebar from "@/render/components/sidebar/Sidebar";


class App extends React.Component {

  clickHandler = () => {
    const electron = window.electron;
    electron.remote.dialog.showMessageBox({
      message: '雷猴呀',
      title: '提示'
    });
  };

  render() {
    return (
      <Provider store={store}>
        <Sidebar/>
        {/*<div className="App">*/}
          {/*<header className={style['App-header']}>*/}
            {/*<img src={logo} className={style['App-logo']} alt="logo"/>*/}
            {/*<p>*/}
              {/*Edit <code>src/App.js</code> and save to reload.*/}
            {/*</p>*/}
            {/*<button onClick={this.clickHandler}>click me!</button>*/}
            {/*<a*/}
              {/*className={style['App-link']}*/}
              {/*href="http://liveshare.huya.com/iframe/11342412"*/}
              {/*target="_blank"*/}
              {/*rel="noopener noreferrer"*/}
            {/*>*/}
              {/*Open Huya11145*/}
            {/*</a>*/}
          {/*</header>*/}
        {/*</div>*/}
      </Provider>
    );
  }
}

export default App;
