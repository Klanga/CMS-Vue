/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎18 13:42:33
 * @modify date 2017‎-0‎2-12 11:01:44
*/
const router = require('express').Router()

router.post('/', (req,res,next) => {
    if (req.body.password !== 'baccano') {
        return res.status(403).end('Authorization Error')
    }
    res.cookie('baccano', true)
    return res.status(200).end('Authorization True')
})

module.exports = router
