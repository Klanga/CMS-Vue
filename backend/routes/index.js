/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2016‎-12‎-‎30 ‏‎15:39:03
 * @modify date 2017‎-01-22 ‏‎20:23:26
*/
module.exports = (app) => {
    app.use('*', (req, res, next) => {
        res.set('X-Powered-By', 'dollars')
        next()
    })
    app.use('/api', require('./api'))
    //支持vue
    app.get('*', (req, res, next) => {
        res.render('index')
    })
}
