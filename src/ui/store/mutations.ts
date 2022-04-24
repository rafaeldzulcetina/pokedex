import { MutationTree } from "vuex";
import { RootState } from "@/ui/store/types/RootState";
import { set } from "@/ui/store/common/set";
/*
const set = (property: any) => (store: any, payload: any) => {
   store[property] = payload
}
 */

export const mutations: MutationTree<RootState> = {
  isLoading: set("isLoading"),
};
