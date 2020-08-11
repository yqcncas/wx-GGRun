import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime' // 引入相对时间
import 'dayjs/locale/zh-cn' // 引入中文
dayjs.locale('zh-cn') // 引入中文
dayjs.extend(relativeTime)
Vue.prototype.$dayjs = dayjs // 放入原型中



import fetch from './libs/request.js'
import api from './api'

Vue.prototype.$fetch = fetch
Vue.prototype.$api = api

const app = new Vue({
    ...App
})
app.$mount()
