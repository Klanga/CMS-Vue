/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎23‎ 16:23:24
 * @modify date 2017‎-0‎2-12 11:00:44
*/
const Info = require('../../models/userInfo')
const jwt = require('jwt-simple')
const setToken = require('../../lib/redis').setToken

module.exports = (req,res,next) => {
  if(!req.header('x-access-token')) return res.status(401).json({ err: '未提供token，请登录！'})
  try{
      var user = jwt.decode(req.header('x-access-token'), process.env.JWT_SECRET)
      var time = user.exp - new Date().getTime()/1000
      if(time > 0 && time <= 60 ){
        Info.find({ _id: user._id }, (err, user) => {
          if(err) return next(err)
          if(!user) return res.status(401).json({ err: 'uid或密码错误！' })
          var token = user.getJwt()
          setToken(user.uid, token)
          res.set('X-Access-Token', token)
        })
      }
      req.user = user
      return next()
  }catch(e){
    return res.status(401).json({ err: 'token已失效，请重新登录！'})
  }
}
