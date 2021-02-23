import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import request from '@/utils/httpRequest.js'
import store from './store'

Vue.config.productionTip = false
Vue.use(uView);
Vue.prototype.$request = request
Vue.prototype.$store = store

// 敏感字符串脱敏过滤器
Vue.filter('dp', function (value, start, leng) {
	if (!value) return ''
	return value.replace(value.substr(start, leng), new Array(leng + 1).join('*'))
})

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
