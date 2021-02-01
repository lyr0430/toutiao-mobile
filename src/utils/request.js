/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})
request.defaults.headers = {
  'content-type': 'application/json'
}

request.interceptors.request.use(
  config => {
    // Do something before request is sent
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)
export default request
