<template>
  <sign-up utitle="注册" @hidden="hidden" class="register">
    <div class="u-error" v-show="error">{{ error }}</div>
    <div>
      <control :rules="rules.mail" type="text" label="邮箱" first="true" title="邮箱用于找回密码及激活账号，请认真填写！" ref="mail" @getCode="getCode"></control>
      <control :rules="rules.captcha" type="code" label="验证码" title="请填写验证码" ref="cap" @getCode="getCode"></control>
      <control :rules="rules.name" type="text" label="昵称" title="昵称注册完可更改！" ref="name"></control>
      <control :rules="rules.pw" type="password" label="密码" title="请填写密码" ref="pw" @upPw="upPw"></control>
      <control :rules="rules.rePwd" type="password" label="确认密码" title="请重复填写密码" ref="rpw" @signup="signup" ></control>
      <div class="u-control">
        <a @click="signup" class="u-submit">注册</a>
      </div>
    </div>
  </sign-up>
</template>
<script>
/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎16‎ ‏‎21:01:29
 * @modify date 2017‎-0‎2-11 21:33:49
*/
  import SignUp from './SigLog.vue'
  import Control from './Control.vue'

  export default{
    name: 'signup',
    data () {
      return {
        user: {
          email: '',
          name: '',
          password: '',
          captcha: ''
        },
        rules: {
          mail: [{ st: 'isMail', err: ['注意邮箱地址格式'] }],
          name: [{ st: 'notEmpty', err: ['昵称很重要哦']}],
          pw: [{ st: 'notEmpty', err: ['密码不能为空！'] },
               { st: 'minLen:10', err: ['密码不能少于10位！']},
               { st: 'notSpe', err: ['密码不能包含 \':\' ！']}],
          rePwd: [{ st: 'notEmpty', err: ['重复密码不能为空！'] }],
          captcha: [ { st: 'notEmpty', err: ['验证码不能为空！'] } ]
        }
      }
    },
    components: {
      SignUp,
      Control
    },
    computed: {
      time () {
        return this.$store.getters.timeOut
      },
      error () {
        return this.$store.getters.error
      }
    },
    methods: {
      upPw () {
        return this.$refs.rpw.addRule([{ st: `rePwd:${this.$refs.pw.value}`, err: ['两次输入的密码不一致！']}]) // 重新等待上一个密码输完后添加规则  
      },
      signup () {
        for (var k in this.$refs) {
          if(this.$refs[k].starRule() === false){
            return false
          }
        }
        this.user.email = this.$refs.mail.value
        this.user.name = this.$refs.name.value
        this.user.password = this.$refs.pw.value
        this.user.captcha = this.$refs.cap.value
        return this.$store.dispatch('logReg', { type: 'signup', user: this.user})
      },
      getCode () {
        if( this.$refs.mail.starRule() === false) {
          this.$store.commit('timeOutErr', true)
          return
        }
        this.$store.dispatch('getCode', this.$refs.mail.value)
      },
      hidden () {
        return this.$emit('registerok')
      }
    }
  }
</script>
