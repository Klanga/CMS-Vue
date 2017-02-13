<template>
  <div class="comment">
    <div class="comment-header">
      <span class="comment-floor">{{ number }}</span>
      <a class="comment-name" :href="comment.author._id|formatUrl('member')">{{ comment.author.name }}</a>
      <span class="comment-uid">UID：{{ comment.author.uid }}</span>
      <a class="comment-created" @click="timeType = !timeType">
        <span v-if="timeType">评论于{{ comment.created|formatTime }}</span>
        <span v-else>{{ comment.created|formatTime('LLL') }}</span>
      </a>
    </div>
    <div class="comment-body">
      {{ comment.body }}
    </div>
  </div>
</template>
<script>
/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-02‎-‎12‎ 15:51:00
 * @modify date 2017‎-0‎2-‎12 17:31:10
*/
  export default{
    name: 'comment',
    data () {
      return {
        timeType: true  
      }
    },
    props: {
      comment: Object,
      number: Number
    }
  }
</script>
<style>
   .comment{
    background-color: #4d4d4d;
    border: .12rem solid #eee;
    border-radius: .3rem;
    margin-bottom: .2rem;
  }
  .comment-header{
    padding: .5rem 1rem;
  }
  .comment-floor{
    display: inline-block;
    font-size: .5rem;
    width: 1.3rem;
  }
  .comment-name{
    text-decoration: none;
    font-weight: bold;
    padding: 0 .8rem;
  }
  .comment-uid{
    margin-right: 1rem;
    font-size: .5rem;
  }
  .comment-created{
    font-size: .5rem;
    margin-right: 1rem;
  }
  .comment-body{
    padding: 0rem 2.5rem 1rem 3.2rem;
  }
</style>
