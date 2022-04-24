import { Pokemon } from "./Pokemon";
import { IResponse } from "@/app/network/domain/interface/IResponse";

/**
 * Pokemon's entity operations
 * @interface PokemonRepository
 */
export default interface PokemonRepository {
  getPokemons(limite: number): Promise<IResponse<Pokemon[]>>;
}
