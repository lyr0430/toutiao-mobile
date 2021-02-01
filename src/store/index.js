import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '../utils/storage'
Vue.use(Vuex)
//  token的key
const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 用户的登录状态信息
    user: getItem(TOKEN_KEY)
    // user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      // 为了防止刷新丢失，我们需要把数据备份到本地存储
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(user)) //  localStorage只能存储字符串
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})
