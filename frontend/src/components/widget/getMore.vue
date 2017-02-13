<template>
  <div>
    <input type="button" :value="cues" @click="fetchData" class="getmore" :class="{ 'no': cues === '没有更多帖子啦Σ(っ °Д °;)っ' }" :disabled = "cues === '没有更多帖子啦Σ(っ °Д °;)っ'"></input>
  </div>
</template>
<script>
/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-02‎-‎11 ‏‎‏‎15:19:02
 * @modify date 2017‎-0‎2-‎11 ‏‎19:27:32
*/
  export default {
    name: 'getmore',
    computed: {
      cues () {
        return this.$store.getters.getCues
      }
    },
    methods: {
      fetchData () {
        return this.$emit('fetchData')
      }
    }
  }
</script>
