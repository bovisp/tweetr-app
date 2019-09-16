import Vue from 'vue'
import axios from 'axios'
import VeeValidate from 'vee-validate'
import moment from 'moment'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(VeeValidate)

window.axios = axios
axios.defaults.baseURL = 'http://127.0.0.1:3333'

Vue.filter('timeAgo', date => moment(date).fromNow())
Vue.filter('joined', date => moment(date).format('MMMM YYYY'))
Vue.filter('dob', date => moment(date).format('MMMM Do YYY'))

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
