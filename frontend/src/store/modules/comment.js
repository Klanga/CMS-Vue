/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-02‎-‎12‎ 14:11:37
 * @modify date 2017‎-0‎2-13 ‏‎18:35:20
*/
import $ from '../axios'
import router from '../../routes'

export const comment = {
  state: {
    comments: [],
    single: null,
    commentErr: null
  },
  getters: {
    getComments (state) {
      return state.comments
    },
    getComment (state) {
      return state.single
    },
    getCommentErr (state) {
      return state.commentErr
    }
  },
  mutations: {
    setComments (state, comments) {
      state.comments.push.apply(state.comments, comments)
    },
    setCommentOne (state, comment) {
      state.single = comment
    },
    setCommentErr (state, err) {
      state.commentErr = err
    },
    initComments (state) {
      state.comments = []
    }
  },
  actions: {
    poComment ({ commit }, data) {
      var go = data.go
      delete data.go
      $.post('/comment', data)
      .then((res) => {
        if(go) {
          router.push(`/posts/${data.parent}`)
        }
      })
      .catch((e)=> {
        commit('setCommentErr', e.response.data.err)
      })
    },
    getComments ({ commit }, id) {
      $.get(`/comment/${id}`)
      .then((res) => {
        return commit('setComments', res.data.comments)
      })
      .catch((e) => {
        console.log(e.response.data.err)
      })
    }
  }
}
