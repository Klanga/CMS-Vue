/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-19‎ ‏‎12:57:21
 * @modify date 2017‎-0‎2-11 13:04:37
*/
import $ from '../axios'

export const logReg = {
  actions: {
    logReg ({ commit, dispatch, rootState }, ac) {
      var data = {
        method: 'post',
        url: `/${ac.type}`,
        data: ac.user
      }
      if (ac.type === 'login') {
        data.headers = { 'X-Time': rootState.cache.time }
      }
      $(data)
        .then((res) => {
          if(ac.type === 'signup'){
              alert(`注册成功！你的uid为${res.data.user.uid}，请牢记！`)
          }
          var user = res.data.user
          user.accessToken = res.headers["x-access-token"]
          commit('logIn', user)
          commit('captcha', null)
        })
        .catch((e) => {
          if (e.response.status === 404) {
            commit('error', '网络错误！')
          }else if(e.response.status === 400){
            dispatch('getCaptcha')
            commit('error', e.response.data.err)
          }else if(e.response.status === 403){
            alert(e.response.data.err)
          }else{
            commit('error', e.response.data.err)
          }
          dispatch('initError')
        })
    }
  }
}
