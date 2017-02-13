<template>
  <div class="rl-dialog">
    <div class="title">{{ utitle }}<a class="close" @click="hidden">&times;</a></div>
    <slot></slot>
  </div>
</template>
<script>
/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎16‎ 21:02:08
 * @modify date 2017‎-0‎2-08 21:37:06
*/
  export default{
    name: 'signinorlogin',
    props: ['utitle'],
    methods: {
      hidden () {
        return this.$emit('hidden')
      }
    }
  }
</script>
<style>
  .rl-dialog{
    position: fixed;
    top:8.5rem;
    left: 30.5%;
    height: 24.125rem;
    width: 33rem;
    background: #181818;
    border: .3rem solid #4d4d4d;
    color: #7d7d7d;
    border-radius: .5rem;
    z-index: 99;
  }
  .title{
    text-align: center;
    margin: 0;
    padding: .5rem;
    border-bottom: .4rem solid #4d4d4d;
  }
  .close{
    position: absolute;
    right: 1rem;
    top: .1rem;
    color: #4d4d4d;
    font-size: 1.4rem;
    font-weight: bold;
  }
</style>
