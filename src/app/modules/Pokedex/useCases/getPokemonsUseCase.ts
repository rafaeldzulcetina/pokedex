import { Pokemon } from "../domain/Pokemon";
import { inject, injectable } from "inversify";
import PokemonRepository from "../domain/PokemonRepository";
import { IResponse } from "@/app/network/domain/interface/IResponse";
import { IBaseUseCase } from "@/app/modules/Shared/domain/IBaseUseCase";

@injectable()
/**
 * Get limit teen payments
 * @class GetPokemonsUseCase
 * @implements IBaseUseCase
 */
export class GetPokemonsUseCase
  implements IBaseUseCase<number, Promise<IResponse<Pokemon[]>>>
{
  /**
   * @constructor
   * @param {PokemonRepository} pokemonRepo
   */
  constructor(
    @inject("PokemonRepository") private pokemonRepo: PokemonRepository
  ) {}

  /**
   * run the getAll method
   * @method execute
   */
  execute(port: number): Promise<IResponse<Pokemon[]>> {
    return this.pokemonRepo.getPokemons(port);
  }
}
