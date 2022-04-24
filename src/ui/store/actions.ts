import { ActionTree } from "vuex";
import { RootState } from "@/ui/store/types/RootState";

export const actions: ActionTree<RootState, any> = {
  /**
   * Establece el valor de la bandera isLoading=true
   */
  initLoader({ commit }) {
    // Ejecuta la mutación para establecer el valor de la
    // propiedad isLoading=true
    commit("isLoading", true);
  },
  /**
   * Establece el valor de la bandera isLoading=false
   */
  stopLoader({ commit }) {
    // Ejecuta la mutación para establecer el valor de la
    // propiedad isLoading=false
    commit("isLoading", false);
  },
};
