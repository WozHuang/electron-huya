import axios from 'axios';
import {message} from "antd";

// 创建axios示例
const request = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || '',
  timeout: 5000
});

/**
 * 接口数据异常处理拦截器
 * 返回数据中 statusCode !== "200" 代表存在错误
 */
request.interceptors.response.use(response => {
  const res = response.data;
  if(res.statusCode !== "200"){
    message.error(res.errorMsg);
    return Promise.reject(res.errorMsg);
  }
  return res.data;
}, error => {
  message.error(error.toString());
  return Promise.reject(error);
});

export default request;
