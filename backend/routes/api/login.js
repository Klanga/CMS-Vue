/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎18‎ 13:35:38
 * @modify date 2017‎-0‎2-11 ‏‎‏‎‏‎13:03:56
*/
const router = require('express').Router()
const checkLogIn = require('../../lib/utils').checkParams('logIn')
const User = require('../../models/user')
const Info = require('../../models/userInfo')
const sendMail = require('../../lib/mail')
const redis = require('../../lib/redis')
const validCaptcha = redis.validCaptcha
const setToken = redis.setToken
const getToken = redis.getToken
const auth = require('./auth')

router.post('/', checkLogIn, (req, res, next) => {
  if (req.header('x-time') === 'undefined' || typeof req.header('x-time') !== 'string') return res.status(400).json({ err: '请求头未提供time，请重新获取验证码！' })
  validCaptcha(req.body.captcha.toLowerCase(), req.header('x-time'), (err, reply) => {
    if (err) return next(err)
    console.log(reply)
    if (!reply) return res.status(400).json({ err: '验证码错误或已过期！' })
    User.findOne({ 'uid': req.body.uid }, (err, user) => {
      if (err) return next(err)
      if (!user || !user.validPassword(req.body.password)) return res.status(401).json({ err: 'uid或密码错误！' })
      Info.findById(user.info, (err, info) => {  //查找用户资料
        if (err) return next(err)
        getToken(info.uid, (err, reply) => {
          if (err) return next(err)
          if (!reply) {
            var token = info.getJwt()
            setToken(info.uid, token, 7200)  //设置token 2小时有效
            res.set('X-Access-Token', token)
          } else {
            res.set('X-Access-Token', reply)
          }
          return res.status(200).json({
            user: {
              _id: info._id,
              name: info.name,
              uid: info.uid
            }
          })
        })
      })
    })
  })
})

module.exports = router
