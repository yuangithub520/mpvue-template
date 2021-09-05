import vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
import home from './modules/home';

Vuex.use(Vuex);

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    home
  }
})