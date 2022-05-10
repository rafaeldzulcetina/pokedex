import Vue from "vue";
import Vuex from "vuex";
import PokedexStore from "./modules/pokedex/pokedexStore";
import AuthStore from "@/ui/store/modules/auth/authStore";
import {actions} from "@/ui/store/actions";
import {mutations} from "@/ui/store/mutations";
import {getters} from "@/ui/store/getter";
import UiStore from "@/ui/store/modules/uiStore";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoading: false,
  },
  modules: {
    PokedexStore,
    AuthStore,
    UiStore
  },
  getters: getters,
  actions: actions,
  mutations: mutations,
});

export default store;
