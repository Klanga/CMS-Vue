/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-02‎-‎11‎ ‏‎18:47:53
 * @modify date 2017‎-0‎2-12 ‏‎‏‎14:57:14
*/
const router = require('express').Router()
const auth = require('./auth')
const Post = require('../../models/post')
const Comment = require('../../models/comment')
const checkComment = require('../../lib/utils').checkParams('comment')

router.get('/:commentId', (req, res, next) => {
  var id = req.params.commentId
  if (!id) return res.status(400).json({ err: '参数不合法！' })
  Comment.findByCommentId(id, (err, comments) => {
    if(err) return next(err)
    return res.status(200).json({ comments })
  })
})

router.post('/', checkComment, auth, (req, res, next) => {
  var comment = new Comment({
    parent: req.body.parent,
    author: req.user._id,
    body: req.body.body
  })
  comment.save()
         .then((com) => {
            if(req.body.type === 'p') {
              Post.update({ _id: req.body.parent }, { $inc: { children: 1 }}, (err) => {
                if (err) return next(err)
                return res.status(201).json({ com })
              })
            } else {
              Comment.update({ _id: req.body.parent }, { $inc: { children: 1 } }, (err) => {
                if (err) return next(err)
                return res.status(201).json({ com })
              })
            }
         })
         .catch((e) => {
           return next(e)
         })
})
module.exports = router
