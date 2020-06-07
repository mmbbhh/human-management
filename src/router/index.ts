import Vue from 'vue'
import VueRouter from 'vue-router'
import {routes} from "@/router/routes";
import store from "@/store";

Vue.use(VueRouter)

const router = new VueRouter({
    /*mode: 'history',*/
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) { // 判断跳转的路由是否需要登录
        if (!store.state.user.name) {
            next({
                path: '/login'
            })
        }
        next()
    } else {
        next()
    }
})

export default router
