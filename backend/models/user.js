/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎20 ‏‎8:57:49
 * @modify date 2017‎-0‎2-09 18:18:47
*/
var mongoose = require('mongoose')
var Info = require('./userInfo')
var crypto = require('crypto')

var UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    uid: { type: String, unique: true },
    salt: String,
    hash: String,
    info: { type: mongoose.Schema.Types.ObjectId, ref: 'Info' }
},{
    versionKey: false // 关闭 __v
})

UserSchema.methods = {
  setPassword(password) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
  },
  validPassword(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex')
    return this.hash === hash
  },
  findByUid(uid, cb) {
    return this.model.findOne({ 'uid': uid }).exec(cb)
  }
}

module.exports = mongoose.model('User', UserSchema)
