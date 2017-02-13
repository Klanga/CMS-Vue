<template>
  <div class="authorize">
    <div class="at-logo logosvg"></div>
    <div class="at-input">
      <span>PASSWORD :</span>
      <input type="password" required maxlength="10" autofocus v-model="password" @keyup.enter="authorize" id="at-password">
      <a @click="authorize" class="at-submit">ENTER</a>
      <span class="at-error" v-show="error">口令错误!</div>
    </div>
  </div>
</template>
<script>
/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎15‎ 22:26:31
 * @modify date 2017‎-0‎1-25 ‏‎1:12:47
*/
  export default {
    name: 'authorize',
    data () {
      return {
        password: '',
        error: false
      }
    },
    watch: {
      error () {
        if (this.error) {
          setTimeout(() => {
            this.error = false
          }, 1500)
        }
      }
    },
    methods: {
      authorize () {
        if (!this.password.length) return
        this.$http.post('/authorize', {
          password: this.password.toLowerCase()
        })
        .then((res) => {
          if(this.$route.query.redirect !== '/'){
            var path = unescape(this.$route.fullPath)
            path = path.substring(21)
            this.$router.push(path)
          }else{
            this.$router.push('/')
          }
        })
        .catch((err) => {
          if (err) this.error = true
        })
      }
    }
  }
</script>
<style>
  .authorize{
    width: 30rem;
    height: 35rem;
    margin: 2rem auto;
  }
  .at-logo{
    height: 25rem;
    width: 30rem;
    padding: 2.5rem;
  }
  .at-input{
    position: relative;
    padding: 2rem 2.2rem;
  }
  .at-input>input[type="password"]{
    margin-left: .5rem;
    border-radius: .5rem;
    text-indent: .5rem;
    font-size: 1rem;
    border: none;
  }
  .at-submit{
    display: inline-block;
    margin-top: .12rem;
    margin-left: .2rem;
    padding: 0rem 1rem;
    background: #181818;
    border: .125rem solid #4d4d4d;
    background-color: #181818;
    border-radius: .5rem;
    cursor: pointer;
  }
  .at-submit:active{
    border-color: #181818;
  }
  .at-error{
    position: absolute;
    bottom: .3rem;
    left: 13rem;
    background: darkred;
    border-radius: .3rem;
    padding: .1rem .3rem;
  }
</style>
