/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2016‎-12‎-‎30 ‏‎20:49:16‏‎
 * @modify date 2017‎-0‎1-23 ‏‎14:41:26
*/
module.exports = {
    mongodb:'mongodb://localhost:27017/drrr',
    smtpConfig: {
        // host: 'smtp.163.com',
        host: 'your email service',
        port: 465,
        secure: true,
        auth: {
            user:'your email account',
            pass: 'your email password'
        }
    }
}