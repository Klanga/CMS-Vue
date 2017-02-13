/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2016‎-12‎-30 15:48:04
 * @modify date 2017‎-01-16 ‏‎‏‎0:44:55
*/
var cookieParser = require('cookie-parser');

module.exports = {
    checkAuthorize: function checkAuthorize(req,res,next){
            if(!req.session.key){
                return res.redirect('/authorize');
            }
            next();
    },
    checkLognin: function checkLognin(req,res,next){
        if(!req.session.user){
            return res.send('你未登录,无权发帖!');
        }
    }  
}