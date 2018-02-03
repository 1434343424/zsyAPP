import http from './public'
let root = '/zcash'
// 用户进入页面后保存数据
export const visit = (params) => {
  return http.fetchPost(root + '/m/filter/cheCredit/visit.json', params)
}
// 意见反馈
export const option = (params) => {
  return http.fetchPost(root + '/m/opinion/add.json', params)
}
// 系统消息
export const message = (params) => {
  return http.fetchPost(root + '/m/message/queryMessageList.json', params)
}
// 登录接口
export const login = (params) => {
  return http.fetchPost(root + '/m/user/login.json ', params)
}
// 系统消息详情
export const messageDetails = (params) => {
  return http.fetchPost(root + '/m/message/queryMessageInfoById.json', params)
}
// 主扫接口（H5调用）
export const createPayOrder = (params) => {
  return http.fetchPostNewIndicator(root + '/m/pay/createPayOrder.json', params)
}
// 付款时查询店铺门头照和名称（H5调用）
export const queryPayLogo = (params) => {
  return http.fetchPost(root + '/m/pay/queryPayLogo.json', params)
}
