<template>
  <div id="newthread">
      <div class="form">
        <div class="control">
          <label class="label">标题：</label>
          <input v-focus v-model="title" type="text" name="title" class="input" maxlength="50" placeholder="请填写标题" required>
          <span class="limit">{{ 50-title.length }}/50</span>
        </div>
        <div class="control">
          <label class="label">内容：</label>
          <textarea v-model="body" class="textarea" name="content" rows="10" placeholder="请填写帖子内容....." required></textarea>
        </div>
        <div class="control">
          <label class="label">版块：</label>
          <select v-model="type">
            <option v-for="menu in menus" :value="menu.url" v-if="{ selected: menu.url==='index'}" >{{ menu.name }}</option>
          </select>
          <a href="/write" class="write">进入写作模式？</a>
        </div>
        <div class="control">
          <input type="button" class="mainbutton" @click="submitPost" value="发表">
        </div>
      </div>
      <d-dialog v-show="err" title="错误" @close="close">
        <p slot="content">{{ err }}</p>
      </d-dialog>
  </div>
</template>
<script>
/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎13‎ 12:56:32
 * @modify date 2017‎-0‎2-12 14:03:53
*/
import Menus from '../menus.js'

export default{
  name: 'createform',
  data () {
    return {
      type: 'board',
      title: '',
      body: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    menus () {
      var arr = []
      for (var menu in Menus) {
        arr.push({ url: menu, name: Menus[menu] })
      }
      return arr
    },
    err () {
      return this.$store.getters.getPostErr
    },
    msg () {
      return this.$store.getters.getPostMsg
    }
  },
  watch: {
    msg () {
      if(this.msg)
        return this.$emit('close')
    }
  },
  methods: {
    submitPost () {
      if (!this.title.length) {
        return this.$store.commit('setPostErr', '标题未填写！')
      }
      if (!this.body.length) {
        return this.$store.commit('setPostErr', '内容未填写！')
      }
      var post = {
        type: this.type,
        title: this.title,
        body: this.body
      }
      return this.$store.dispatch('poPost', post)
    },
    close () {
      return this.$store.commit('setPostErr', null)
    }
  }
}
</script>
<style>
  #newthread{
  height: auto;
  width: 30rem;
  position: absolute;
  top: -2rem;
  right: 14.6rem;
  border: 0.1875rem solid #eee;
  border-radius: 0.4375rem;
  background: #181818;
  color: #eee;
  z-index: 9999;
}
#newthread:after, #newthread:before {
  border: solid transparent;
  content: ' ';
  height: 0;
  right: -1.5rem;
  position: absolute;
  width: 0;
}
#newthread:after {
  border-width: 1.1rem;
  border-left-color: #181818;
  top: 4rem;
}
#newthread:before {
  border-width: 0.75rem;
  border-left-color: #eee;
  top: 4.3rem;
}
.form{
  width: 17rem;
}
.label{
  margin-bottom: 0.5rem;
}
.input{
  height: 1.2rem;
  width: 13rem;
  margin-bottom: 1rem;
  text-indent: 0.2rem;
}
.textarea{
  vertical-align:top;
  width: 13rem;
  text-indent: 0.2rem;
}
.textarea,.input{
  border-radius: 0.3rem;
  border: none;
}
.control>select{
  margin: 0.6rem auto;
  margin-right: 4rem;
  width: 4.25rem;
  border-radius: 0.3rem;
  padding: 0.2rem;
  padding-right: 0;
  border: none;
}
.control{
  width: 30rem;
  margin: 0.5rem 0rem;
  text-align: center;
}
.control:first-child{
  margin-top: 1rem;
}
input[type="button"]{
  color: #eee;
}
.limit{
  position: absolute;
  top: 1.6rem;
  margin-left:0.5rem; 
  font-size: 0.5rem;
}
.write{
  text-decoration: auto;
  font-size: 0.5rem;
}
</style>
