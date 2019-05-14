import {createStore, combineReducers, applyMiddleware} from "redux";
import setting from './setting/reducer';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

// 合并 Reducer
const rootReducers = combineReducers({ setting });

// 使用 redux-persist 持久化数据
const persistConfig = {
  key: 'root', // 存储时用到的key值，暂时没有含义
  storage, // redux-persist默认的存储方式，使用的是 localStorage
};
const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);

let persistor = persistStore(store);

export {store, persistor};

// export default store;
