<template>
  <div id="boardmenu">
      <br>
        <router-link class="mainbutton" to="/board">揭示板</router-link>
        <router-link class="mainbutton" to="/bump">灌水</router-link>
        <router-link class="mainbutton" to="/voice">心の声</router-link>
        <router-link class="mainbutton" to="/activity">活动</router-link>
        <router-link class="mainbutton" to="/bullshit">吐槽</router-link>
        <router-link class="mainbutton" to="/acg">二次元</router-link>
        <router-link class="mainbutton" to="/shinban">新番</router-link>
        <router-link class="mainbutton" to="/cos">COS</router-link>
        <router-link class="mainbutton" to="/guru">大触</router-link>
        <router-link class="mainbutton" to="/game">游戏</router-link>
  </div>
</template>
<script>
/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎12‎ 16:33:52
 * @modify date 2017‎-0‎2-12 13:24:54
*/
export default{
  name: 'laside'
}
</script>
<style>
  .mainbutton.router-link-active{
    background-color: #4D4D4D;
    color: #FFFFFF
  }
</style>
