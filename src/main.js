import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import md5 from 'js-md5'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$md5 = md5;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
