/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-02‎-‎09 17:32:16
 * @modify date 2017‎-0‎2-09 18:19:03
*/
var mongoose = require('mongoose')
var jwt = require('jwt-simple')

var UserInfoSchema = new mongoose.Schema({
    uid: Number,
    name: String,
    bio: { type: String, default: '这个家伙很懒，什么都没有留下' }, //简介
    signature: String, //签名档
    created: {
        type: Date,
        default: Date.now
    }
},{
    versionKey: false // 关闭 __v
})

UserInfoSchema.methods = {
  getJwt () {
    var expiry = new Date().getTime()
    return jwt.encode({
      _id: this._id,
      name: this.name,
      uid: this.uid,
      exp: expiry/1000 + 7200
    }, process.env.JWT_SECRET)
  }
}

module.exports = mongoose.model('Info', UserInfoSchema)