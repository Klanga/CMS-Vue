/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎23‎ 12:23:01
 * @modify date 2017‎-0‎1-24 ‏‎‏‎22:02:47
*/
const router = require('express').Router()
const User = require('../../models/user')
const setToken = require('../../lib/redis').setToken

router.get('/', (req, res, next) => {
  User.findOne({ 'uid': req.query.uid, 'code': req.query.token })
    .then((user) => {
      if(!user) return res.status(404).json({err: '用户不存在或激活码错误！' })
      if(user.isActive) return res.status(400).json({ err: 'uid已激活！请勿重复激活！' })
      User.findOneAndUpdate({ 'uid': req.query.uid },{ $set: { 'isActive': true }}, { new: true})
      .then((_user) => {
        var user = {
          _id: _user._id,
          name: _user.name,
          uid: _user.uid,
          email: _user.email
        }
        var token = _user.getJwt()
        setToken(_user.uid, token)
        res.set('X-Access-Token', token)
        return res.status(200).json({user})
      })
      .catch((e) => {
        return res.status(404).json({ err: '激活失败！请重试！' })
      })
    })
    .catch((e) => {
      return next(e)
    })
})



module.exports = router
