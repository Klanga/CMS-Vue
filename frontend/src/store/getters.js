/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-18‎ ‏‎16:19:48
 * @modify date 2017‎-0‎2-09 ‏‎21:52:17
*/
export default{
  user (state) {
    return state.user
  },
  captcha (state, captcha) {
    return state.cache.captcha
  },
  error (state) {
    return state.cache.error
  },
  time (state) {
    return state.cache.time
  },
  timeOut (state) {
    return state.cache.timeOut
  },
  timeOutErr (state) {
    return state.cache.timeOutErr
  }
}
