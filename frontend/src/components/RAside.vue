<template>
  <div id="sidebar">
    <b></b>
    <br>
    <br>
    <a id="createthread" @click="isActive = !isActive" v-show="user">发表新帖</a>
    <d-createthread v-if="isActive && user" @close = "isActive = !isActive"></d-createthread>
  </div>
</template>
<script>
/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎13‎ 12:46:59
 * @modify date 2017‎-0‎2-12 14:01:35
*/
import DCreatethread from './NewThread'

export default{
  name: 'raside',
  components: {
    DCreatethread
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>
<style>
  #createthread{
    padding: 0.5rem 3rem;
    cursor: pointer
  }
</style>
