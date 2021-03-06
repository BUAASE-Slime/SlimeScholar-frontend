import Vue from 'vue'
import VueRouter from 'vue-router'
import user from "../store/user";

Vue.use(VueRouter)

const routes = [
    // 检索模块
    {
        path: '/',
        name: 'HomePage',
        component: () => import('../views/retrieval/HomePage'),
        meta: {
            noNav: true,
        }
    },
    {
        path: '/advSearch',
        name: 'AdvSearch',
        component: () => import('../views/retrieval/AdvSearch'),
    },
    {
        path: '/searchRes',
        name: 'searchRes',
        component: () => import('../views/retrieval/SearchRes'),
        meta: {
            noNav: true,
        }
    },
    // 文献详情模块
    {
        path: '/article',
        name: '/Article',
        component: () => import('../views/literature/Article'),
    },
    // 用户信息管理模块
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/user/Login'),
        meta: {
            // requireNotAuth: true,
            noNav: true
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../views/user/Register'),
        meta: {
            noNav: true,
            // requireNotAuth: true,
        }
    },
    {
        path: '/schLib',
        name: 'SchLib',
        component: () => import('../views/user/SchLib'),
    },
    {
        path: '/settings',
        name: 'Settings',
        component: () => import('../views/user/Settings'),
    },
    // 学者门户模块
    {
        path: '/schPortal',
        name: 'SchPortal',
        component: () => import('../views/scholar/SchPortal'),
    },
    {
        path: '/searchAut',
        name: 'SearchAut',
        component: () => import('../views/scholar/SearchAut'),
        meta: {
            noNav: true,
        }
    },
    {
        path: '/authorRes',
        name: 'AuthorRes',
        component: () => import('../views/scholar/AuthorRes'),
        meta: {
            noNav: true,
        }
    },
    {
        path: '/applySettle',
        name: 'ApplySettle',
        component: () => import('../views/scholar/ApplySettle'),
    },
    // 社区模块
    {
        path: '/commentDetail',
        name: 'CommentDetail',
        component: () => import('../views/community/CommentDetail.vue'),
    }
]

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

    // Not login is required to access the following pages
    // if (userInfo && to.meta.requireNotAuth) {
    //     next({
    //         name: 'HomePage',
    //     })
    // }
    next()
})

export default router
