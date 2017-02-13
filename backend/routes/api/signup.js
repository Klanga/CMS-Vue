/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎20 0:07:00
 * @modify date 2017‎-02-09 18:16:51
*/
const router = require('express').Router()
const User = require('../../models/user')
const Info = require('../../models/userInfo')
var SysModel = require('../../lib/mongo').SysModel
const checkSignUp = require('../../lib/utils').checkParams('signUp')
const getCode = require('../../lib/redis').getCode
const setToken = require('../../lib/redis').setToken

router.post('/', checkSignUp, (req, res, next) => {
    getCode(req.body.email, (err, reply) => {
        if (err) return next(err)
        if (!reply) return res.status(400).json({ err: '验证码已过期！' })
        if (req.body.captcha !== reply) return res.status(401).json({ err: '验证码错误！' })
        var user = new User({
            email: req.body.email
        })
        user.setPassword(req.body.password)
        user.save()
            .then((user) => {
                if (err) return next(err)
                SysModel.findOneAndUpdate({ 'name': 'system' }, { $inc: { 'uid': 1 } }, { new: true, upsert: true }, (err, doc) => {
                    if (err) return next(err)
                    Info.create({ name: req.body.name, uid: doc.uid }, (err, info) => {
                        if (err) {
                            console.log(err)
                            return next(err)
                        }
                        User.findByIdAndUpdate(user._id, { $set: { 'uid': doc.uid, 'info': info._id } }, { new: true }, (err, _user) => {
                            var user = {
                                _id: info._id,
                                name: info.name,
                                uid: info.uid
                            }
                            var token = info.getJwt()
                            setToken(info.uid, token)
                            res.set('X-Access-Token', token)
                            return res.status(201).json({ user })
                        })
                    })
                })
            })
            .catch((e) => {
                if (e.code === 11000) {
                    return res.status(400).json({ err: '邮箱已被注册！注册失败！请重试！' })
                } else {
                    return res.status(400).json({ err: '注册失败！请重试！' })
                }
            })
    })
})

module.exports = router
