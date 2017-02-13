<template>
  <div class="thread">
    <h2><a :href="post._id|formatUrl('posts')">{{ post.title }}<small v-if="post.children>0">&nbsp;( {{ post.children }} 评论数)</small></a></h2>
    <div class="replies">
      <div class="firstreply">
        <div class="reply">
          <h3>
            <span class="replynum">
              <template v-if="post.author">
                <span>■ 楼主：
                  <a class="postername" :href="post.author._id|formatUrl('member')">{{ post.author.name }}&nbsp;</a>
                  <span>uid : {{ post.author.uid }}</span>
                  <a class="post-at" @click="timeType = !timeType">
                    <span v-if="timeType">发表于{{ post.created|formatTime }}</span>
                    <span v-else>{{ post.created|formatTime('LLL') }}</span>
                  </a>
                </span>
              </template>
              <template v-else>
                <span>■ 匿名 
                  <a class="post-at" @click="timeType = !timeType">
                    <span v-if="timeType">发表于{{ post.created|formatTime }}</span>
                    <span v-else>{{ post.created|formatTime('LLL') }}</span>
                  </a>
                </span>
              </template>
            </span>
            <template v-if="user">
              <span class="deletebutton" v-if="post.author"><span v-if="post.author._id !== user._id">[<a href="" style="text-decoration: none"> 私信 </a>]&nbsp;</span> 
              <span v-if="post.author._id === user._id">[<a :href="post._id|formatUrl('posts','edit')" style="text-decoration: none"> 编辑 </a>]&nbsp;[<a @click="readyDel" style="text-decoration: none"> 删除 </a>]</span></span>
            </template>
          </h3>
          <a v-if="show" class="type" :href="post.type">{{ post.type|getType }}</a>
          <div class="replytext">{{ post.body }}</div>
        </div>
      </div>
      <div class="repliesomitted"></div>
       <div class="finalreplies">
        <slot name="reply"></slot>
        <slot name="comment"></slot>
        <d-dialog v-if="showDialog" title="警告" @close="close">
          <p slot="content" v-if="err">{{ err }}</p>
          <p slot="content" v-if="msg">{{ msg }}</p>
          <div slot="footer">
            <a class="post-btn" @click="delPost" v-if="err !== 'token已过期，请重新登录！' && !msg">确定</a>
            <a class="post-btn" @click="close" v-text="err !=='token已过期，请重新登录！'&&!msg ? '取消' : '确定'"></a>
          </div>
        </d-dialog>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-02‎-‎11‎ ‏‎14:32:24
 * @modify date 2017‎-0‎2-‎12 17:53:04
*/
  import Menus from '../../menus.js'

  export default{
    name: 'thread',
    props: {
      post: Object,
      show: Boolean
    },
    data () {
      return {
        timeType: true,
        showDialog: false
      }
    },
    filters: {
      getType (type) {
        return Menus[type]
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      err () {
        return this.$store.getters.getPostErr
      },
      msg () {
        return this.$store.getters.getPostMsg
      }
    },
    methods: {
      readyDel () {
        this.showDialog = true
        return this.$store.commit('setPostErr', `确定删除帖子"${ this.post.title.length > 4 ? this.post.title.slice(0,4) + '...': this.post.title }"?`)
      },
      delPost () {
        this.$store.commit('setPostErr', null)
        return this.$store.dispatch('delPost', { p: this.post._id, q: this.post.author._id })
      },
      close () {
        this.showDialog = false
        this.$store.commit('setPostErr', null)
        return this.$store.commit('setPostMsg', null)
      }
    }
  }
</script>
<style>
  .replies{
    position: relative;
  }
  .postername{
    text-decoration: none;
  }
  .type{
    position: absolute;
    top: 1rem;
    right: 2rem;
    background-color: #252525;
    border-radius: .3125rem;
    padding-left: .4rem;
    padding-right: .4rem;
    padding-bottom: .15rem;
    text-decoration: none;
    color: #7d7d7d;
  }
  .post-at{
    margin: 0rem 1rem;
    color: #7d7d7d;
  }
  .post-btn{
    padding: .1rem 1rem;
    border-radius: .2rem;
    background: #252525;
    width: 1rem;
    font-size: .9rem;
  }
</style>
