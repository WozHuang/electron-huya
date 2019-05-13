import React from 'react';
import logo from './logo.svg';
import './App.less';
import style from './App.module.less';

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
      <div className="App">
        <header className={style['App-header']}>
          <img src={logo} className={style['App-logo']} alt="logo"/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={this.clickHandler}>click me</button>
          <a
            className={style['App-link']}
            href="http://liveshare.huya.com/iframe/11342412"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Huya
          </a>
        </header>
      </div>
    );
  }


}

export default App;
