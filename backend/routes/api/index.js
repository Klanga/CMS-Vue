/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎18‎ ‏‎13:35:27
 * @modify date 2017‎-0‎2-12 ‏‎‏‎11:08:36
*/

const router = require('express').Router()

router.use('/authorize', require('./authorize'))
router.use('/captcha', require('./captcha'))
router.use('/code', require('./code'))
router.use('/login', require('./login'))
router.use('/logout', require('./logout'))
router.use('/signup', require('./signup'))
router.use('/posts', require('./post'))
router.use('/comment', require('./comment'))
router.use('/activate', require('./active'))

module.exports = router
