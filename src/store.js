import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from "vuex-plugin-persistedstate";

// Load Vuex
Vue.use(Vuex);
// Create store
export default new Vuex.Store({
    state: {
        user: null,
        token: null,
    },
    mutations: {
      setUser(state ,user){
        state.user = user;
      },
      setToken(state, token){
        state.token = token;
      },
      deleteUser(state){
        state.user = null;
      },
      deleteToken(state){
        state.token = null;
      },
      
    },

    plugins: [createPersistedState()]

});
