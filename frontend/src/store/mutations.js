/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎14‎ ‏‎17:25:44
 * @modify date 2017‎-0‎2-13 22:50:39
*/

// 这里是根级别的 mutation
import $ from './axios'

export default{
  logIn (state, user) {
    if(user){
      for(var k in user) {
          window.localStorage.setItem(k, user[k])
      }
      $.defaults.headers.common['X-Access-Token'] = window.localStorage.getItem('accessToken')
    }
    state.user = user
  },
  logOut (state) {
    window.localStorage.clear()
    state.user = null
  },
  captcha (state, captcha) { // 获取验证码
    state.cache.captcha = captcha
  },
  error (state, error) {
    state.cache.error = error
  },
  time (state, time) {
    state.cache.time = time
  },
  timeOut (state, timeOut) {
    state.cache.timeOut = timeOut
  },
  timeOutErr (state, err) {
    state.cache.timeOutErr = err
  }
}
