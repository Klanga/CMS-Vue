/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-02‎-‎07 21:27:31
 * @modify date 2017‎-02-12 13:15:26
*/
const router = require('express').Router()
const Post = require('../../models/post')
const checkPost = require('../../lib/utils').checkParams('post')
const auth = require('./auth')

//get posts
router.get('/all', (req, res, next) => {
  var type = (req.query.type === 'board' || !req.query.type)? {} : { type: req.query.type }
  Post.findByType(type, parseInt(req.query.now) || 0, (err, posts) => {
    if (err) return next(err)
    return res.status(200).json({ posts })
  })
})

//get post 
router.get('/one', (req, res, next) => {
  if(!req.query.id) return res.status(400).json({ err: '未找到相关帖子！' })
  Post.findOnePost(req.query.id,(err, post) => {
    if(err) return next(err)
    return res.status(200).json({post})
  })
})

router.post('/', checkPost, auth, (req, res, next) => {
  var post =new Post({
    author: req.body.type === 'voice' ? null : req.user._id,
    title: req.body.title,
    body: req.body.body,
    type: req.body.type,
    tags: req.body.tag || '默认',
    writer: req.user._id
  })
  post.save((err, post) => {
    if (err) {
      if(err.name && err.name === 'ValidationError') {
        return res.status(400).json({ err: '非法的版块类型！' })
      }
      return next(err)
    }
    return res.status(201).json({ id: post._id })
  })
})

router.delete('/', auth, (req, res, next) => {
  //p为帖子的_id，q为作者的_id
  if(!req.query.q || !req.query.p) return res.status(400).json({ err: '参数不合法！' })
  if(req.query.q !== req.user._id) return res.status(401).json({ err: '你无权删除该帖子！' })
  Post.remove({ _id: req.query.p}, (err, doc) => {
    if(err) return next(err)
    return res.status(200).json({ msg: '帖子删除成功！' })
  })
})

module.exports = router
