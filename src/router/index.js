import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: () => import('@/views/layout.vue'),
                children: [
                    {
                        path: 'home',
                        component: () => import('@/views/Home.vue'),
                    },
                    {
                        path: 'girls',
                        component: () => import('@/views/About.vue'),
                    }
                ]
            },
            {
                path: '/404',
                component: () => import('@/views/404.vue')
            }
        ]
    })
}