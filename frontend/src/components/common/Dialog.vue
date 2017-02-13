<template>
  <div>
    <div class="dialog">
      <div class="dialog-body">
        <div class="dialog-head">
          {{ title || '提示' }}
        </div>
        <a class="dialog-close" @click="close">&times;</a>
        <div class="dialog-content">
          <slot name="content"></slot>
        </div>
        <div class="dialog-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
    <div class="dialog-bg"></div>
  </div>
</template>
<script>
/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-02‎-‎08‎ ‏‎21:19:32
 * @modify date 2017‎-0‎2-‎11 ‏‎23:47:32
*/
  export default {
    name: 'dialog',
    props: {
      title: String,
      post: Object
    },
    methods: {
      close () {
        return this.$emit('close')
      }
    }
  }

</script>
<style>
  .dialog {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 9999999
  }
  .dialog-body {
    position: relative;
    margin: 14rem auto;
    max-width: 16rem;
    text-align: center;
    border: .125rem solid #4d4d4d;
    border-radius: .4375rem;
    background-color: #151515;
    z-index: 1;
  }
  
  .dialog-head {
    padding: .2rem 0;
    font-weight: bold;
    border-bottom: .125rem solid #4d4d4d;
  }
  .dialog-close{
    position: absolute;
    top: .1rem;
    right: .3rem;
  }
  .dialog-content {
    padding: .3rem 1rem;
  }
  .dialog-footer{
    margin-bottom: .3rem;
  }
  .dialog-bg {
    position: fixed;
    top:0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #000;
    filter: alpha(Opacity=80);
    -moz-opacity: .8;
    opacity: .8;
    z-index: 9999998;
  }
</style>
