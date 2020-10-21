import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export interface RootStateInterface {
  message: string;
}

export default new Vuex.Store<RootStateInterface>({
  state: {
    message: 'hello',
  },
  getters: {
    getMessage(state) {
      return state.message;
    },
  },
  mutations: {
    changeMessage(state, newMessage: string) {
      state.message = newMessage;
    },
  },
  actions: {
    changeMessage({ commit }, newMessage: string) {
      commit('changeMessage', newMessage);
    },
  },
  modules: {},
});
