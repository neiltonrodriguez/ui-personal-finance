import { createRouter, createWebHashHistory } from "vue-router";
import { useAuth } from '../stores/auth.js'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
        meta: {
            auth: false
        }
    },
    {
        path: '/',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
        meta: {
            auth: true
        },
        children: [
            {
                path: '/',
                name: 'dashboard',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
                meta: {
                    auth: true
                },
            },
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    if(to.meta?.auth) {
        const auth = useAuth()
        if(auth.token) {
            const isAuthenticated = await auth.checkToken()
            if(isAuthenticated){
                next()
            } else {
                next({name: 'login'})
            }

        } else {
            next({name: 'login'})
        }
    } else {
        next()
    }
})

export default router