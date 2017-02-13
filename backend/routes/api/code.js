/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-02‎-‎05‎ 12:53:18
 * @modify date 2017‎-0‎2-09 ‏‎17:02:54
*/
const router = require('express').Router()
const sendMail = require('../../lib/mail')
const User = require('../../models/user')
const randomCode = require('../../lib/utils').randomCode
const setCode = require('../../lib/redis').setCode
const getCode = require('../../lib/redis').getCode

//邮箱验证码发送
router.get('/', (req, res, next) => {
  if (!req.query.email || !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(req.query.email)) {
    return res.status(400).json({ err: '邮箱格式错误！'})
  }
  const email = req.query.email
  User.findOne({ 'email': email }, (err, user) => {
    if(err) return next(err)
    if(user) return res.status(400).json({ err: '邮箱已被注册！请登录！'})
    getCode(email, (err, reply) => {
      if (err) return next(err)
      if (reply) return res.status(200).json({ msg: '验证码已发送！' })
      const code = randomCode()
      sendMail({ to: email, code: code }, (err, info) => {
        if (err) return res.status(500).json({ err: '邮件发送失败！请将邮箱地址drrrclub@163.com加入白名单后，重新发送验证邮件！' })
        setCode(email, code, 120)
        return res.status(201).json({ msg: '验证码发送成功！' })
      })
    })
  })
})

module.exports = router
