import axios from './api'; // 倒入 api
/* 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 此处的数据依然来自 Easy Mock
 */
export const GET = (config) => axios({
  url: config.api,
  method: 'get',
  params: config.params
});
export const POST = (config) => axios({
  url: config.api,
  method: 'post',
  data: config.params
});
//
// // 单独倒出
// export const query = params => {
//   return axios({
//     url: '/query',
//     method: 'get',
//     params
//   })
// }
//
// export const mock = params => {
//   return axios({
//     url: '/mock',
//     method: 'get',
//     params
//   })
// }
//
// export const upload = data => {
//   return axios({
//     url: '/upload',
//     method: 'post',
//     data
//   })
// }

// 默认全部倒出
// 根绝需要进行
export default {
  GET,
  POST
};
