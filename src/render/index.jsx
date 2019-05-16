import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store/store';
import {HashRouter} from "react-router-dom";

// 一个用于强制刷新的方法
React.Component.prototype.refreshPage = function () {
  if (!this.props.history) {
    throw new Error('need this.props.history');
  }
  this.props.history.push('/redirectTo?t=' + this.props.history.location.pathname);
};

// 注入store
// 持久化数据
// hash路由
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
        <App/>
      </HashRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// Electron 中不需要 ServiceWorker 的缓存功能
serviceWorker.unregister();
