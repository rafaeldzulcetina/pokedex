import { lazyInject } from "@/inversify.config";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { Pokemon } from "@/app/modules/Pokedex/domain/Pokemon";
import { GetPokemonUseCase } from "@/app/modules/Pokedex/useCases/getPokemonUseCase";

/**
 * Declare the vuex module to be implemented
 * @module Pokemons
 */
@Module({
  name: "PokedexStore",
  namespaced: true,
})

/**
 * Declare Pokedex Store
 * @class PokedexStore
 * @implement PokedexState
 * @extend VuexModule
 */
export default class PokedexStore extends VuexModule {
  @lazyInject("GetPokemonsUseCase")
  private readonly getPokemon!: GetPokemonUseCase;

  pokemon: Pokemon = {
    base_experience: 0,
    id: 0,
    name: "",
    sprites: {
      front_default: '',
      other: {
        home: {
          front_default: ''
        }
      }
    }
  };
  /**
   * Mutations of Pokemon Store
   */
  @Mutation
  setItems(pokemon: Pokemon): void {
    this.pokemon = pokemon;
  }

  /**
   * get payments
   * @method fetchItems
   */
  @Action
  async fetchPokemon(key: string): Promise<void> {
    /*Se ejecuta la función para obtener payments y se subscribe al observable para obtener el resultado*/
    const response = await this.getPokemon.execute(key);
    this.setItems(response.data);
  }
  /*
  public get Pokemon(): Pokemon | null {
    return this.pokemon
  }
  */
}
