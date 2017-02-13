/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎18‎ ‏‎20:17:53
 * @modify date 2017‎-01-24 17:30:02
*/
const router = require('express').Router()
const setToken = require('../../lib/redis').setToken

router.get('/', (req,res,next) => {
  res.status(200).json({ msg: '登出成功！'})
})

module.exports = router
