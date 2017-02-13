<template>
  <log-in utitle="登录" @hidden="hidden">
    <div class="u-error" v-show="error">{{ error }}</div>
    <div>
      <control :rules="rules.name" type="text" label="UID" first="true" title="请填写UID" ref="uid"></control>
      <control :rules="rules.pw" type="password" label="密码" title="请填写密码" ref="pw"></control>
      <control :rules="rules.captcha" :captcha="captcha" type="captcha" label="验证码" title="请填写验证码" @login="login" ref="cap" @getCaptcha="getCaptcha"></control>
      <div class="u-control">
        <a @click="login" class="u-submit">登录</a>
      </div>
    </div>
  </log-in>
</template>
<script>
/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎16‎ 21:01:18
 * @modify date 2017‎-0‎2-11 ‏‎21:23:37
*/
  import LogIn from './SigLog.vue'
  import Control from './Control.vue'

  export default {
    name: 'login',
    data () {
      return {
        user: {
          uid: '',
          password: '',
          captcha: ''
        },
        rules: {
          name: [ { st: 'notEmpty', err: ['别忘了输入UID！', 'UID记得输入 (,,•́ . •̀,,)'] }],
          pw: [ { st: 'notEmpty', err: ['混蛋啊，密码啊！', '密码！密码！密码！'] } ],
          captcha: [ { st: 'notEmpty', err: ['还有验证码！', '验证码啊！童鞋！'] } ]
        }
      }
    },
    components: {
      LogIn,
      Control
    },
    created () {
      if (this.captcha) {
        return
      }
      this.getCaptcha()
    },
    computed: {
      captcha () {
        return this.$store.getters.captcha
      },
      error () {
        return this.$store.getters.error
      }
    },
    methods: {
      login () {
        for (var k in this.$refs) {
          if(this.$refs[k].starRule() === false){
            return false
          }
        }
        this.user.uid = this.$refs.uid.value
        this.user.password = this.$refs.pw.value
        this.user.captcha = this.$refs.cap.value
        return this.$store.dispatch('logReg', { type: 'login', user: this.user })
      },
      getCaptcha () {
        return this.$store.dispatch('getCaptcha')
      },
      hidden () {
        return this.$emit('loginok')
      }
    }
  }
</script>

