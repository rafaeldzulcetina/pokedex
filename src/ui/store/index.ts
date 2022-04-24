import Vue from "vue";
import Vuex from "vuex";
import PokedexStore from "./modules/pokedex/pokedexStore";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoading: false,
  },
  modules: {
    PokedexStore,
  },
  getters: {},
  actions: {},
  mutations: {},
});

export default store;
