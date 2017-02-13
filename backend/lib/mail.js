/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎22 ‏‎18:02:48
 * @modify date 2017‎-0‎2-05 ‏‎16:16:37
*/
const nodemailer = require('nodemailer')
const smtpConfig = require('../config').smtpConfig

const transporter = nodemailer.createTransport(smtpConfig)

module.exports = (option, cb) => {
  const mailOptions = {
    from: smtpConfig.auth.user, // sender address
    to: option.to, // list of receivers
    subject: option.subject || '来自dollars的信件', // Subject line
    text: '请勿回复(no reply)', // plaintext body
    html: `<p>您好，如果您未在dollarsor.club进行注册账号的行为，请忽略此邮件！</p><p>您的验证码为: <span>${option.code}</span></p><p>验证码有效时间为2分钟</p>`// html body
  }
  return transporter.sendMail(mailOptions,cb)
}

