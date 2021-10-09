import Vue from 'vue'
import VueRouter from 'vue-router'
import user from "@/store/user";

Vue.use(VueRouter)

const routes = []

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    const userInfo = user.getters.getUser(user.state());
    // Record the router address of page accessed before login
    if (to.path === '/login') {
        localStorage.setItem("preRoute", router.currentRoute.fullPath);
    }
    // Login is required to access the following pages
    if (!userInfo && to.meta.requireAuth) {
        next({
            name: 'Home',
        })
    }
    next()
})

export default router
