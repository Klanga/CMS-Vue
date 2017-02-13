/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2016‎-12‎-‎30 ‏‎15:39:03
 * @modify date 2017‎-0‎2-11 ‏‎13:11:15
*/
require('dotenv').config()
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var config = require('./config');
var mongodb = require('./lib/mongo')
var routes = require('./routes');
var cors = require('cors') //跨域 可删

var app = express();
// view engine setup
//app.set('views', path.join(__dirname, 'public'));
//app.set('view engine', 'html');
//app.engine('html', require('ejs-mate'));

app.use(cors({
  exposedHeaders: [ 'X-Time', 'X-Access-Token' ]  //设置才能跨域设置header
}))
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(require('connect-history-api-fallback')())
// app.use(cookieParser('licochen'));

//app.use(express.static(path.join(__dirname, 'public')));

routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500)
  // res.status(500).json({ err: '服务器提了个问题！'})
  console.log(err)
  res.status(err.status || 500).json(err)
});

module.exports = app;
