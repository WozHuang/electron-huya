import React from 'react';
import logo from './logo.svg';
import './App.less'
import style from './App.module.less';

function App() {
  return (
    <div className="App">
      <header className={style['App-header']}>
        <img src={logo} className={style['App-logo']} alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className={style['App-link']}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React123
        </a>
      </header>
    </div>
  );
}

export default App;
