/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-02‎-‎09 ‏‎21:18:38
 * @modify date 2017‎-0‎2-13 ‏‎13:15:49
*/
var mongoose = require('mongoose')
var Post = require('./post')
var Info = require('./userInfo')

var CommentSchema = new mongoose.Schema({
    parent: mongoose.Schema.Types.ObjectId,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Info' },
    body: String,
    hidden: {
        type: Boolean,
        default: false
    },
    children: { type: Number, default: 0 },
    isread: { type: Boolean, default: false },
    created: {
        type: Date,
        default: Date.now
    }
},{
    versionKey: false // 关闭 __v
})
CommentSchema.statics = {
    findByCommentId (id, cb) {
        return this.find({ 'parent': id })
                   .sort({ '_id': -1 }) 
                   .populate('author', 'name uid')
                   .exec(cb)
    }
}


module.exports = mongoose.model('Comment', CommentSchema)