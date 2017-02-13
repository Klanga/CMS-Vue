/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-20 8:43:03
 * @modify date 2017‎-0‎2-07 20:46:39
*/
var mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_HOST)

var SysSchema = new mongoose.Schema({
  name: String,
  uid: Number
})

exports.SysModel = mongoose.model('Sys', SysSchema)