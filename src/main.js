import Vue from 'vue'
import App from './App.vue'
import {createRouter} from './router';
import {createStore} from "./store";
import {sync} from 'vuex-router-sync';
import './mixin/prefetching';
import VueMeta from "vue-meta";

Vue.use(VueMeta, {
    refreshOnceOnNavigation: true
});
Vue.config.productionTip = true;


export function createApp () {
    const router = createRouter();
    const store = createStore();

    sync(store, router);

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    });
    return { app, router, store }
}