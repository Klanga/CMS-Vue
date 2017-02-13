<template>
  <div id="appcontainer">
    <keep-alive>
      <d-header></d-header>
    </keep-alive>
    <keep-alive>
      <d-laside></d-laside>
    </keep-alive>
    <keep-alive>
      <d-raside></d-raside>
    </keep-alive>
    <div id="contentarea">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎15‎ 11:05:01
 * @modify date 2017‎-0‎2-13 ‏‎22:51:59
*/
  import DHeader from '../components/Header'
  import DLaside from '../components/LAside'
  import DRaside from '../components/RAside'

  export default {
    name: 'allindex',
    components: {
      DHeader,
      DLaside,
      DRaside
    },
    created() {
      this.getUser()
    },
    methods: {
      getUser() {
        var user = {}
        var items = ["_id", "name", "uid", "accessToken"]
        for (var i = 0, item; item = items[i++];) {
          if (!window.localStorage.getItem(item)) {
            return this.$store.commit('logIn', null)
          }
          user[item] = window.localStorage.getItem(item)
        }
        return this.$store.commit('logIn', user)
      }
    }
  }
</script>
<style>
  [v-cloak]{
    display:none;
  }
</style>
<style src="../main.css"></style>
