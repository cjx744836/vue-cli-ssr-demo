import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: () => import('@/views/Home.vue'),
                meta: {title: 'home'}
            },
            {
                path: '/girls',
                component: () => import('@/views/About.vue'),
                meta: {title: 'girls'}
            },
            {
                path: '*',
                component: () => import('@/views/404.vue'),
                meta: {title: '404'}
            }
        ]
    })
}