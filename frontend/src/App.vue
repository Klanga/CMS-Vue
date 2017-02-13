<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎12‎ 15:42:53
 * @modify date 2017‎-0‎2-13 ‏‎22:51:47
*/
import Authorize from './pages/Authorize'
import AllIndex from './pages/Index'
import User from './pages/User'

export default {
  name: 'app',
  components: {
    Authorize,
    AllIndex,
    User
  }
}
</script>
<style>
  [v-cloak]{
    display:none;
  }
</style>
<style src="./main.css"></style>
