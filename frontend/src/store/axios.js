/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-20‎ ‏‎9:26:13
 * @modify date 2017‎-0‎2-12 ‏‎17:49:39
*/
import axios from 'axios'

const $ =  axios.create({
  baseURL: '/api/'
  // baseURL: 'http://127.0.0.1:3000/api'
})
export default $
