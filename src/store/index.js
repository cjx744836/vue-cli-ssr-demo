import Vue from 'vue';
import Vuex from 'vuex';
import { getList } from '@/api';
Vue.use(Vuex);
export function createStore () {
    return new Vuex.Store({
        state: {
            items: {
                list: []
            }
        },
        actions: {
            getList ({ commit }, id) {
                return getList(id).then(item => {
                    commit('setItem', item.list)
                });
            }
        },
        mutations: {
            setItem (state, v) {
                state.items.list = v;
            }
        }
    });
}