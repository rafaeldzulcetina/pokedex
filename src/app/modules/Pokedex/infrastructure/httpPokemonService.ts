/**
 * @description Clase para definir repositorio http de pokemon
 * @author Rafael Cetina
 * @creationDate 06 de Enero del 2022
 */
import { inject, injectable } from "inversify";
import { Pokemon } from "@/app/modules/Pokedex/domain/Pokemon";
import PokemonRepository from "@/app/modules/Pokedex/domain/PokemonRepository";
import { IHttp } from "@/app/network/domain/interface/IHttp";
import { IResponse } from "@/app/network/domain/interface/IResponse";
/*
  Se indica que la implmentación se va injectar como dependencia
 */
@injectable()
export default class PokemonService implements PokemonRepository {
  constructor(@inject("Http") private http: IHttp) {}

  /*
    Método para obtener un pokemon con el id o nombre
   */
  public getPokemon(key = "pikachu"): Promise<IResponse<Pokemon>> {
    /*Construcción de la url para la petición http*/
    const url = `pokemon/${key}`;
    return this.http.get(url, {});
  }
}
