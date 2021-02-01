import request from '@/utils/request'
// import store from '@/store'
export const login = data => {
  console.log(typeof data)
  //   console.log('------------------')
  //   console.log(Object.assign(data))
  //   console.log('------------------')
  //   console.log(typeof data.code)
  return request({
    method: 'POST',
    url: 'app/v1_0/authorizations',
    data
  })
}
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `app/v1_0/sms/codes/${mobile}`
  })
}
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // 发送请求头数据
  })
}
