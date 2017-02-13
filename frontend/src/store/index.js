/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎14‎ ‏‎17:25:19
 * @modify date 2017‎-0‎2-12 ‏‎14:25:26
*/

// 组装模块并导出 store 的地方
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import { logReg } from './modules/logReg'
import { post } from './modules/post'
import { comment } from './modules/comment'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    cache: {
      captcha: null,
      error: null, //登录或注册的错误信息
      time: null,
      timeOut: '获取验证码',
      timeOutErr: false
    }
  },
  modules: {
    logReg: logReg,
    post: post,
    comment: comment
  },
  mutations: mutations,
  getters: getters,
  actions: actions
})

export default store
