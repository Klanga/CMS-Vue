/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎14‎ ‏‎17:25:35
 * @modify date 2017‎-0‎2-11 13:09:57
*/

// 这里是根级别的 action
import $ from './axios'

export default{
  getCaptcha ({ commit, dispatch }) { // 获取验证码
    $.get('/captcha')
      .then((res) => {
          commit('time', res.headers["x-time"])
          commit('captcha', res.data)
      })
      .catch((e) => {
        if (e) {
          commit('error', '验证码请求失败！')
          return dispatch('initError')
        }
      })
  },
  getCode ({ commit, dispatch }, email) {
    $.get('/code',{
      params: {
        email: email
      }
    })
    .then((res) => {
      commit('error', res.data.msg)
      var time = 60
      commit('timeOutErr', true)
      var timeout = setInterval(() => {
        time -= 1
        commit('timeOut',`${time}秒后重新获取`)
      }, 1000)
      setTimeout(() => {
        clearInterval(timeout)
        commit('timeOut',`获取验证码`)
        commit('timeOutErr', false)
      }, 60000)
      return dispatch('initError')
    })
    .catch((e) => {
      if (e) {
        if (e.response.status === 500) {
          alert(e.response.data.err)
        } else {
          commit('error', e.response.data.err)
          dispatch('initError')
        }
        return commit('timeOutErr', false)
      }
    })
  },
  initError ({ commit }) {
      setTimeout(function() {
        commit('error', null)
      }, 1700);
    }
}
