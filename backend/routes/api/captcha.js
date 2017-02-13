/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎18‎ 20:43:03
 * @modify date 2017‎-0‎2-09 ‏‎17:03:09
*/
const router = require('express').Router()
const setCaptcha = require('../../lib/redis').setCaptcha
const captcha = require('svg-captcha-color').create({
  noise:2 // 干扰线条数，填0则不绘制干扰线
})

//图形验证码获取
router.get('/', (req,res,next) => {
    let c = captcha.make()
    let time = setCaptcha(c.text.toLowerCase())
    console.log(c.text)
    res.set({
      'Content-Type': 'image/svg+xml',
      'X-Time': time
    })
    res.status(200).send(c.data)
})

module.exports = router
