/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎13‎ 20:03:31
 * @modify date 2017‎-0‎2-12 13:58:12
*/
import moment from 'moment'
moment.locale('zh-cn')
export default (Vue) => {
  Vue.filter('formatUrl', function(){
    var url = [].shift.apply(arguments)
    var type = [].shift.apply(arguments)
    var fullPath = `/${type}/${url}`
    for (var i=0, argument; argument = arguments[i++];) {
      fullPath += `/${argument}`
    }
    return fullPath
  })
  Vue.filter('formatTime', function(time, type){
    if(type === 'LLL')
      return moment(time, "YYYY-MM-DD HH:mm:ss.fffZ").format('YYYY-MM-DD HH:mm:ss');
    return moment(time, "YYYY-MM-DD HH:mm:ss.fffZ").fromNow()
  })
}
