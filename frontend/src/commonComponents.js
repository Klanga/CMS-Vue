/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎15‎ ‏‎13:34:24
 * @modify date 2017‎-0‎2-11 ‏‎22:10:15
*/
import BasePage from './components/BasePage.vue'
import DDialog from './components/common/Dialog.vue'

export default (Vue) => {
  Vue.component('base-page', BasePage)
  Vue.component('d-dialog', DDialog)
}
