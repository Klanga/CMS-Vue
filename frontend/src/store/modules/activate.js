/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎24‎ ‏‎18:15:24
 * @modify date 2017‎-0‎1-24 ‏‎22:58:59
*/
import $ from '../axios'

export const activate = {
  state: {
    showResult: null,
    redirected: false
  },
  getters: {
    activateRs (state) {
      return state.showResult
    },
    acRedirected (state) {
      return state.redirected
    }
  },
  mutations: {
    activateRs (state, rs) {
      state.showResult = rs
    },
    acRedirected (state, re) {
      state.redirected = re
    }
  },
  actions: {
    activate ({ commit, dispatch, rootState }, user) {
      $.get(`/activate?token=${user.token}&uid=${user.uid}`)
      .then((res) => {
        commit('logIn', res.data.user)
        commit('acToken', res.headers["x-access-token"])
        commit('activateRs', '账号激活成功，即将跳转至首页！')
      })
      .catch((e) => {
        e.response.data.err += '即将跳转至首页！'
        commit('activateRs', e.response.data.err)
      })
      setTimeout(() => {
        commit('acRedirected', true)
      }, 3000)
    }
  }
}
