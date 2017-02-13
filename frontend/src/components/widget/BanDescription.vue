<template>
  <div id="threadbox">
    <div class="innerbox">
      <span class="ban-name">{{ name }}</span>
      <span class="ban-descp">{{ description }}</span>
    </div>
  </div>    
</template>
<script>
/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎13 ‏‎21:47:49
 * @modify date 2017‎-0‎2-‎11 ‏‎19:59:55
*/
  export default{
    name: 'bandescription',
    description: '版块介绍',
    props: [
      'name',
      'description'
    ]
  }
</script>
<style>
  #threadbox{
    padding: .5rem;
    padding-top: 1.2rem;
  }
  .ban-descp{
    font-size: .7rem;
  }
  .ban-name{
    display: block;
    font-size: 1.5rem;
    margin-bottom: .4rem;
  }
</style>
