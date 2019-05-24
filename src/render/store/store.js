import {createStore, combineReducers, applyMiddleware} from "redux";
import setting from './setting/reducer';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

// 合并 Reducer
const rootReducers = combineReducers({ setting });

// 使用 redux-persist 持久化数据
const persistConfig = {
  key: 'root', // 存储时用到的key值，暂时没有含义
  storage, // redux-persist默认的存储方式，使用的是 localStorage
  stateReconciler: autoMergeLevel2 // 合并state的深度为两层，为了与分模块的store配合
};
const persistedReducer = persistReducer(persistConfig, rootReducers);
const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
);
const persistor = persistStore(store);

export {store, persistor};
