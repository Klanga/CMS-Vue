<template>
  <div id="timeline">
    <up-detail u-time="2017-2-7"
                u-version="alpha v2.1.0"
                u-detail="完成帖子模块的编写" >
    </up-detail>
    <up-detail u-time="2017-1-19"
                u-version="alpha v2.0.0"
                u-detail="完成登录/注册模块的编写" >
    </up-detail>
    <up-detail u-time="2017-1-15"
                u-version="alpha v1.0.0"
                u-detail="完成全部页面设计" >
    </up-detail>
    <up-detail u-time="2017-1-14"
                u-version="alpha v1.0.0"
                u-detail="完成大部分页面设计" >
    </up-detail>
    <up-detail u-time="2017-1-13"
                u-version="alpha v1.0.0"
                u-detail="完成基本页面设计" >
    </up-detail>
    <up-detail u-time="2017-1-12"
                u-version="alpha v1.0.0"
                u-detail="网站采用Vue + Express 开发" >
    </up-detail>
  </div> 
</template>
<script>
/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎12 ‏‎17:20:59
 * @modify date 2017‎-02-11 ‏‎19:47:32
*/
  import UpDetail from '../../components/UpDetail.vue'
  export default{
    name: 'update',
    description: '更新',
    components: {
      UpDetail
    }
  }
</script>
<style scoped>
  #timeline{
    border-left: 0.3rem solid #eee;
    padding-left: 0.3rem;
  }
</style>
