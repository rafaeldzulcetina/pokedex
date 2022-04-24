import Vue from "vue";
import Vuex from "vuex";
import PokedexStore from "./modules/pokedex/pokedexStore";
import { getters } from "./getter";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { RootState } from "@/ui/store/types/RootState";

Vue.use(Vuex);

const store = new Vuex.Store<RootState>({
  state: {
    isLoading: false,
  },
  modules: {
    PokedexStore,
  },
  getters,
  actions,
  mutations,
});

export default store;
