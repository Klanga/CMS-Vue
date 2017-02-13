<template>
  <div>
    <d-bds :name="name" :description="description"></d-bds>
    <d-loading v-if="!posts"></d-loading>
    <div id="posts" v-if="posts">
      <thread v-for="post in posts" :post="post" :show="type === 'board'" ref="post._id">
        <reply :id="post._id" slot="reply" ></reply>
      </thread>
    </div>
    <getmore @fetchData="fetchData">
      {{ cues }}
    </getmore>
  </div>
</template>

<script>
/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎12‎ ‏‎16:10:50
 * @modify date 2017‎-0‎2-‎12 ‏‎13:35:24
*/
import DBds from './widget/BanDescription'
import reply from './Reply'
import DLoading from './widget/DLoading'
import thread from './widget/Thread'
import getmore from './widget/getMore'

export default {
  name: 'basepage',
  props: [ 'name', 'description', 'type' ],
  computed: {
    posts () {
      return this.$store.getters.getPosts
    },
    cues () {
      return this.$store.getters.getCues
    }
  },
  components: {
    DBds,
    DLoading,
    thread,
    getmore,
    reply
  },
  created () {
    this.$store.commit('InitNow')
    this.$store.commit('InitPosts')
    this.$store.commit('InitCues')
    return this.fetchData()
  },
  methods: {
    fetchData () {
      this.$store.dispatch('fetchPosts', this.type)
    }
  }
}
</script>
