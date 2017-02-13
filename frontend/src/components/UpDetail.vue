<template>
  <div class="record">
        <span class="origin">●</span>
        <h4 class="uptime">{{ UTime }}</h4>
          <h5 class="upversion">-- Dollarsbbs <em>{{ UVersion }}</em> &nbsp;版  <a @click="show = !show" v-text="show?'[-]':'[+]'" class="upopen"></a></h5>
            <span class="detail" v-show="show">{{ UDetail }}</span>
</template>
<script>
/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎14‎ ‏‎21:40:53
 * @modify date 2017‎-0‎1-14 ‏‎22:10:44
*/
  export default{
    name: 'updetail',
    props: [
      'UTime',
      'UVersion',
      'UDetail'
    ],
    data () {
      return {
        show: false
      }
    }
  }
</script>
<style>
    .record{
    position: relative;
    padding: 0 1rem; 
  }
  .detail{
    display: inline-block;
    padding: 3px 10px;
    margin-left: 13px;
    border-radius: 4px;
    background: #151515;
    font-size: 0.8rem;
    letter-spacing: 0.17rem;
    /*text-shadow: 0 0 0.3em blue;  */
    box-shadow: inset 0 -1px 0 0 rgba( 255, 255, 250, 0.6)
  }
  .origin{
    position: absolute;
    top: -0.2rem;
    font-size: 2rem;
    left: -1.083rem;
  }
  .uptime{
    margin-bottom: 0.3rem;
  }
  .upopen{
    margin-left: 0.5rem;
    cursor: pointer;
  }
  .upversion{
    margin: 0.4rem 0 0.8rem 0;
  }
</style>
