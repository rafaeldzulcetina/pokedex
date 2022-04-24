import { injectable } from "inversify";
import { Pokemon } from "@/app/modules/Pokedex/domain/Pokemon";
import { IResponse } from "@/app/network/domain/interface/IResponse";
import PokemonRepository from "@/app/modules/Pokedex/domain/PokemonRepository";

@injectable()
export default class PokemonService implements PokemonRepository {
  readonly _pokemons: Pokemon[];

  constructor() {
    const pokemons = [];

    pokemons.push({
      id: 1,
      name: "Pikachu",
      base_experience: 10,
    });

    this._pokemons = pokemons;
  }

  /**
   * return pokemons
   * @param { Number } limite - number last pokemons
   * @returns { Array } - Items
   */
  public getPokemons(limite: number): Promise<IResponse<Pokemon[]>> {
    const fakeResponse: IResponse<Pokemon[]> = {
      data: [],
      warnings: [],
      errors: [],
    };
    fakeResponse.data = this._pokemons.slice(
      Math.max(this._pokemons.length - limite, 0)
    );
    return new Promise((resolve) => {
      resolve(fakeResponse);
    });
  }
}
