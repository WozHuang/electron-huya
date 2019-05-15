import request from './request'
export function getLiveList(params = {pageNo: 1}) {
  return request.get('/getLiveList', {
    params
  })
}
