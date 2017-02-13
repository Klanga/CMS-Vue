<template>
  <div class="u-control">
      <label class="u-label">{{ label }}：</label>
      <template v-if="type === 'text' && first">
        <input v-focus v-model="value" type="text" class="u-input" maxlength="50" required @keyup.enter="getCode">
      </template>
      <template v-else-if="type === 'password'">
        <input v-model="value" @keyup.enter="signup" type="password" class="u-input" maxlength="50" required >
      </template>
      <template v-else-if="type === 'text'">
        <input v-model="value" type="text" class="u-input" maxlength="50" required >
      </template>
      <template v-else-if="type === 'captcha'">
        <input v-model="value" @keyup.enter="login" type="text" class="u-input captcha" maxlength="5" required>
        <a @click="getCaptcha" v-html="captcha" class="u-captcha"></a>
      </template>
      <template v-else>
        <input v-model="value" type="text" class="u-input captcha" maxlength="5" required>
        <button @click="getCode" class="u-submit u-code" :class="{ 'u-disabled':error }" :disabled="error">{{ timeOut }}</button>
      </template>
      <span>{{ err }}</span>
  </div>
</template>
<script>
/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎19‎ ‏‎18:03:17
 * @modify date 2017‎-0‎2-‎11 21:33:51
*/
  export default{
    name: 'control',
    props: [
      'rules',
      'type',
      'label',
      'first',
      'captcha',
    ],
    data () {
      return {
        show: true,
        value: '',
        err: null,
        cache: []  //规则列表
      }
    },
    created () {
      this.addRule(this.rules)
    },
    watch: {
      value () {
        this.starRule()
      }
    },
    computed: {
      error () {
        return this.$store.getters.timeOutErr
      },
      timeOut () {
        return this.$store.getters.timeOut
      }
    },
    methods: {
      login () {
        return this.$emit('login')
      },
      signup () {
        return this.$emit('signup')
      },
      getCaptcha () {
        return this.$emit('getCaptcha')
      },
      getCode () {
        this.$emit('getCode')
        if (this.error === true) {
          setTimeout(() => {
            this.$store.commit('timeOutErr', false)
          }, 2000)
          return
        }
      },
      // 规则
      notEmpty (err) {
        if (this.value.trim().length === 0) {
          this.err = err
        }else{
          this.err = null
        }
      },
      minLen (len, err) {
        if (this.value.trim().length < len) {
          this.err = err
        }else{
          this.$emit('upPw')
          this.err = null
        }
      },
      rePwd (pwd, err) {
        if (this.value !== pwd) {
          this.err = err
        }else{
          this.err = null
        }
      },
      isMail (err) {
        if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.value)) {
          this.err = err
        }else{
          this.err = null
        }
      },
      notSpe (err) {
        if (/([:])+/.test(this.value)) {
          this.err = err
        }else{
          this.err = null
        }
      },
      addRule (rules) {
        for (var i = 0, rule; rule = rules[i++];) {
          ((rule) => {
            var stArr = rule.st.split(':') // 为了支持minLen:6这样的参数
            var st = stArr.shift() // 弹出规则名
            stArr.push(rule.err)
            for(var j=0,va; va = this.cache[j++];) {
              if(va.st === st) {
                this.cache[j-1] = { st: st, err: stArr }
                return
              }
            }
            this.cache.push({ st: st, err: stArr })
          })(rule)
        }
      },
      starRule () {
        for (var i = 0,va; va = this.cache[i++];) {
          var vaerr=[];
          if(!(va.err[0] instanceof Array)) {
            vaerr.push(va.err[0])
            var random = Math.floor(Math.random() * va.err[1].length);
            vaerr.push(va.err[1][random])
          } else {
            var random = Math.floor(Math.random() * va.err[0].length);
            vaerr.push(va.err[0][random])
          }
          this[va.st].apply(null, vaerr)
          if (this.err) {
            return false
          }
        }
      }
    }
  }
</script>
<style>
  .u-control>span{
    position: absolute;
    bottom: -.6rem;
    left: 5.3rem;
    width: 13.3rem;
    font-size: .5rem;
    text-align: center;
  }
  .u-code{
    /*padding: .1rem 0rem;*/
    padding: .14rem 0rem;
    font-size: .8rem;
    width: 7rem;
    color: #eee;
  }
  .u-disabled{
    background-color: #181818;
    color: #777;
    border-color: #4d4d4d;
  }
</style>
