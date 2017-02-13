<template>
  <div class="form">
      <table>
        <tbody>
          <template v-if="show&&user">
            <tr style="vertical-align:top">
              <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
              <td>
                评论：
                <textarea v-focus v-model="comment" name="comment" cols="64" rows="5" style="vertical-align: top" placeholder="请输入评论内容...."></textarea>
              </td>
              <td>
                <input type="button" @click="poComment" value="提交">
              </td>
            </tr>
          </template>
          <tr>
            <td></td>
            <td>
            <div class="threadlinks">
              <a v-if="user" @click.stop="show = !show" v-text="show?'收起':'评论'"></a>
              <a :href="id|formatUrl('posts')" class="post-enter">进入帖子</a>
            </div>
            </td>
          </tr>
        </tbody>
      </table>
      <d-dialog v-show="err" title="错误" @close="close">
        <p slot="content">{{ err }}</p>
      </d-dialog>
  </div>
</template>
<script>
/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎14‎ 16:23:11
 * @modify date 2017‎-0‎2-12 14:35:23
*/
  export default {
    name: 'reply',
    props: [ 'id' ],
    data () {
      return {
        comment: '',
        show: false,
        err: null
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    },
    methods: {
      poComment () {
        if (!this.comment.length) {
          this.err = '评论不能为空！'
          return 
        }
        return this.$store.dispatch('poComment', { parent: this.id, body: this.comment, type: 'p', go: true })
      },
      close () {
          this.err = null
          return 
      }
    }
  }
</script>
<style>
  .threadlinks>a{
    cursor: pointer
  }
  .post-enter{
    color: #eee;
  }
</style>
