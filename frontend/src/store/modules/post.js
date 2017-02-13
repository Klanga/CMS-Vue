/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-02‎-‎07‎ 22:11:34
 * @modify date 2017‎-0‎2-13 ‏‎22:48:24
*/
import $ from '../axios'
import router from '../../routes'

export const post = {
  state: {
    posts: [],
    now: 0,
    cues: '更多更多帖子...',
    err: null,
    msg: null,
    singlePost: null
  },
  getters: {
    getPosts (state) {
      return state.posts
    },
    getPostOne (state) {
      return state.singlePost
    },
    getCues (state) {
      return state.cues
    },
    getPostErr (state) {
      return state.err
    },
    getPostMsg (state) {
      return state.msg
    }
  },
  mutations: {
    setPosts (state, posts) {
      state.posts.push.apply(state.posts, posts)
    },
    setPostOne (state, post) {
      state.singlePost = post
    },
    setNow (state, now) {
      state.now += now
    },
    setPostErr (state, err) {
      state.err = err
    },
    setPostMsg (state, msg) {
      state.msg = msg
    },
    setCues (state, cues) {
      state.cues = cues
    },
    InitNow (state) {
      state.now = 0
    },
    InitPosts (state) {
      state.posts = []
    },
    InitCues (state) {
      state.cues = '更多更多帖子...'
    },
    shiftPost (state, postId) {
      for(var i=0,post; post = state.posts[i++];) {
        if (post._id === postId) {
          return state.posts.splice(i-1, 1)
        }
      }
    }
  },
  actions: {
    fetchPosts ({ commit, state }, type, now) {
      var type = type || 'board'
      $.get('/posts/all', {
        params: {
          type: type,
          now: state.now
        }
      })
      .then((res) => {
          if (!res.data.posts.length) {
            return commit('setCues', '没有更多帖子啦Σ(っ °Д °;)っ')
          }
          commit('setNow', 10)
          commit('setPosts', res.data.posts)
      })
      .catch((e) => {
        if (e) {
          console.log(`出错了，${e}`)
        }
      })
    },
    fetchPost ({ commit }, id) {
      commit('initComments')
      Promise.all([
          $.get('/posts/one', {
            params: {
              id: id
            }
          }),
          $.get(`/comment/${id}`)
        ])
        .then((res) => {
          commit('setPostOne', res[0].data.post)
          commit('setComments', res[1].data.comments)
        })
        .catch((e)=>{
          commit('setPostErr', e.response.data.err)
        })
    },
    poPost ({ commit }, post) {
      commit('setPostMsg', false)
      $.post('/posts', post)
      .then((res) => {
        commit('setPostMsg', true)
        router.push(`/posts/${res.data.id}`)
      })
      .catch((e) => {
        commit('setPostErr', e.response.data.err)
      })
    },
    delPost ({ commit }, post) {
      $.delete('/posts', {  
        params: post
      })
      .then((res) => {
        commit('shiftPost', post.p)
        commit('setPostMsg', res.data.msg)
      })
      .catch((e) => {
        commit('setPostErr', e.response.data.err)
      })
    }
  }
}
