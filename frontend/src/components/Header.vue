<template>
  <div id="header">
    <div id="nav">
      <div id="logo" class="logosvg">logo</div>
      <ul id="headernav">
          <li><router-link to="/notice">公告板</router-link></li>
          <li><router-link to="/about">关于</router-link></li>
          <li><router-link to="/help">帮助</router-link></li>
          <li><router-link to="/update">更新</router-link></li>
          <li><router-link to="/suggestorbug">建议/bug</router-link></li>
      </ul>
      <template v-if="!user">
        <div class="user"><a id="login" @click="showLogin = !showLogin">登录</a> | <a id="register" @click="showRegister = !showRegister">注册</a></div>
        <log-in v-if="showLogin" @loginok="showLogin = !showLogin"></log-in>
        <sign-up v-if="showRegister" @registerok="showRegister = !showRegister"></sign-up>
      </template>
      <template v-else>
        <div class="user">欢迎回来，<a id="ucenter" :href="user._id|formatUrl('personal')">{{ user.name }}</a> | <a id="logout" @click="logOut">登出</a></div>
      </template>
  </div>
</div>
</template>
<script>
/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎12‎ 16:27:19
 * @modify date 2017‎-0‎2-09 ‏‎22:22:47
*/
  export default {
    name: 'header',
    data () {
      return {
        showLogin: false,
        showRegister: false
      }
    },
    filters: {
      formatUrl (id) {

        return `/personal/${id}`
      }
    },
    components: {
      LogIn: resolve => require(['./LogIn.vue'], resolve),
      SignUp: resolve => require(['./SignUp.vue'], resolve)
    },
    computed: { // 获取多个状态时用
      user () {
        return this.$store.getters.user
      }
    },
    watch: {
      user () {
          if(this.user){
            this.showLogin = this.showRegister = false
          }
      }
    },
    methods: {
      logOut () {
        this.$http.get('/api/logout')
        .then((res) => {
          console.log(res.data)
          this.$store.commit('captcha', null)
          this.showLogin = false
          return this.$store.commit('logOut')
        })
        .catch((e) => {
          console.log('服务器提了个问题，登出失败！')
        })
      }
    }
  }
</script>
<style>
 #user>a,#user>span{
    font-size: 0.8rem;
    text-decoration: none;
  }
  #user>a{
    cursor: pointer
  }
  #headernav a.router-link-active{
    color: #7D7D7D;
  }
</style>
