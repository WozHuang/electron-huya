import request from './request';

/**
 * 获取直播列表
 * @param params
 * @returns {*}
 */
export function getLiveList(params = { pageNo: 1 }) {
  return request.get('/getLiveList', {
    params
  });
}

/**
 * 获取直播详情
 * @param profileRoom
 * @returns {*}
 */
export function getLiveData({ profileRoom }) {
  return request.get('/getLiveDetail', {
    params: {
      host: profileRoom
    }
  });
}
