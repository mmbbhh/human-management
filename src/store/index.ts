import Vue from 'vue'
import Vuex from 'vuex'
import {mutations} from "./mutations";
/*import { actions } from "./actions";*/
import { getters } from "./getters";
import {state} from "./state";

//数据持久化插件
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    mutations,
    /*actions,*/
    getters,
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
})

export default store