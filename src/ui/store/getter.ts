import { GetterTree } from "vuex";
import { RootState } from "./types/RootState";

export const getters: GetterTree<RootState, any> = {
  isLoading: (state) => {
    return state.isLoading;
  },
};
