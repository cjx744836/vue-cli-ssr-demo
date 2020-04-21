import Vue from 'vue'
import axios from 'axios';
import App from './App.vue'
import {createRouter} from './router.js';

export function createApp () {
    const router = createRouter()
    Vue.prototype.$http = axios;
    const app = new Vue({
        router,
        render: h => h(App)
    });
    return { app, router }
}