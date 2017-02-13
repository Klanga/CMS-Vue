/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-02‎-‎07 ‏‎20:46:46
 * @modify date 2017‎-0‎2-12 ‏‎13:15:18
*/
var mongoose = require('mongoose')
var Info = require('./userInfo')

var PostSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Info' },
    title: String,
    body: String,
    hidden: {
        type: Boolean,
        default: false
    },
    type: { 
        type: String, 
        index: true, 
        enum: [ 'board','bump', 'voice', 'activity','bullshit', 'acg', 'shinban', 'cos', 'guru', 'game' ]
    },
    children: { type: Number, default: 0 },
    tags: { type: [String], index: true },
    created: {
        type: Date,
        default: Date.now
    },
    updatedat:{
        type: Date,
        default: Date.now
    },
    writer: { type: mongoose.Schema.Types.ObjectId, ref: 'Info' },
    favs: Number
},{
    versionKey: false // 关闭 __v
})

PostSchema.statics = {
  findByType (type, skip, cb) {
    return this.find(type, { writer: 0 }, { skip: skip })
            .sort({ '_id': -1 })
            .populate('author', 'name uid')
            .limit(10)
            .exec(cb)
  },
  findOnePost (id, cb) {
      return this.findById(id, { writer: 0 })
                 .populate('author', 'name uid')
                 .exec(cb)
  },
  incFavs (postId, cb) {
    this.model.update({ _id: id }, { $inc: { favs: 1 }}, cb)
  }
}

module.exports = mongoose.model('Post', PostSchema)