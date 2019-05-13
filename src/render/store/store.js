import {createStore, combineReducers, applyMiddleware} from "redux";
import setting from './setting/reducer';
import thunk from 'redux-thunk';

const store = createStore(
  combineReducers({ setting }),
  applyMiddleware(thunk)
);

export default store;
