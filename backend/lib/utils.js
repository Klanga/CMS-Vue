/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-20 ‏‎13:23:07
 * @modify date 2017‎-0‎2-12 11:30:18
*/
//检测必要参数
var Params = {
  signUp: ['email', 'name', 'password', 'captcha'],
  logIn: ['uid', 'password', 'captcha'],
  post: ['title', 'body', 'type'],
  comment: ['parent', 'body', 'type']
}

var checkParams = (type) => {
  return (req, res, next) => {
    for (var i = 0, param; param = Params[type][i++];) {
      if (!req.body[param]) {
        return res.status(400).json({ err: '参数不合法！' })
      }
    }
    return next()
  }
}


var randomCode = () => {
  var texts = '0123456789ABCDEFGHIZKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', code = ''
  for (var i = 0, text; i++ < 4 && (text = texts[Math.floor(Math.random() * 62)]);) {
    code += text
  }
  return code
}

module.exports = {
  checkParams: checkParams,
  randomCode: randomCode
}