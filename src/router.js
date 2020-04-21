import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: () => import('./views/Tome.vue'),
                meta: {title: 'home'}
            }, {
                path: '/about',
                component: () => import('./views/About.vue'),
                meta: {title: 'about'}
            }
        ]
    })
}