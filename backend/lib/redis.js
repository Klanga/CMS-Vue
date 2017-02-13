/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-22 ‏‎22:28:32
 * @modify date 2017‎-0‎2-05 14:38:36
*/
var crypto = require('crypto')
var redis = require('redis')
var client = redis.createClient()

module.exports = {
  setCaptcha(captcha) {
    let date = new Date().getTime().toString()
    let hash = captcha + date
    client.set(hash, captcha)
    client.expire(hash, 60)
    return date
  },
  validCaptcha(captcha, date, cb) {
    let hash = captcha + date
    client.get(hash, cb)
  },
  setToken (uid, token, time) {
    let id = 'uid:' + uid
    client.set(id, token)
    client.expire(id, process.env.TOKEN_TIMEOUT)  //2个小时过期 7200秒
  },
  getToken (uid, cb) {
    let id = 'uid:' + uid
    client.get(id, cb)
  },
  setCode (email, code, time) {
    let _email = 'email:' + email
    client.set(_email, code)
    client.expire(_email, time) //2分钟 
  },
  getCode (email, cb) {
    let _email = 'email:' + email
    client.get(_email, cb)
  }
}
