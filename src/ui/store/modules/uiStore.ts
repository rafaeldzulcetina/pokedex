import { lazyInject } from "@/inversify.config";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

/**
 * Declare the vuex module to be implemented
 * @module Pokemons
 */
@Module({
  name: "UiStore",
  namespaced: true,
})

/**
 * Declare Pokedex Store
 * @class PokedexStore
 * @implement PokedexState
 * @extend VuexModule
 */
export default class UiStore extends VuexModule {
  isLoading = false
  /**
   * Mutations of Pokemon Store
   */
  @Mutation
  setLoading(loading :boolean): void {
    this.isLoading = loading;
  }

  /**
   * get payments
   * @method fetchItems
   */
  @Action
  initLoader(): void {
    this.setLoading(true)
  }

  @Action
  stopLoader(): void {
    this.setLoading(false)
  }

}
