import { Pokemon } from "./Pokemon";
import { IResponse } from "@/app/network/domain/interface/IResponse";

/**
 * Pokemon's entity operations
 * @interface PokemonRepository
 */
export default interface PokemonRepository {
  getPokemon(key: string): Promise<IResponse<Pokemon>>;
}
