<template>
  <div>
    <d-loading v-if="!post"></d-loading>
    <div id="posts" v-if="post" class="post-header">
      <thread :post="post">
        <comment v-if="comments" slot="comment" v-for="(comment, index) in comments" :comment="comment" :number="comments.length-index"><comment>
      </thread>
    </div>
  </div>
</template>
<script>
/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-02-‎11 ‏‎‏‎21:35:06
 * @modify date 2017‎-0‎2-12 ‏‎17:53:24
*/
  import thread from '../../components/widget/Thread.vue'
  import comment from '../../components/widget/comment.vue'
  import DLoading from '../../components/widget/DLoading'

  export default {
    name: 'post',
    computed: {
      post () {
        return this.$store.getters.getPostOne
      },
      comments () {
        return this.$store.getters.getComments
      }
    },
    components: {
      thread,
      DLoading,
      comment
    },
    created () {
      this.fetchData()
    },
    watch: {
      post () {
        if(this.post)
          document.title = this.post.title
      },
      '$route': 'fetchData' //对路由变化做出响应
    },
    methods: {
      fetchData () {
        this.$store.dispatch('fetchPost', this.$route.params.id)
      }
    }
  }
</script>
<style>
  .post-header{
    margin-top: 1rem;
  }
</style>
