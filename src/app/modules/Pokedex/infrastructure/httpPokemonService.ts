/**
 * @description Clase para definir repositorio http de pagos
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
    Método para obtener todos los pagos
     */
  /*
    Método para obtener todos los pagos con límite
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getPokemons(limite = 2): Promise<IResponse<Pokemon[]>> {
    console.log("entra a get pagos httpRepository");
    /*Construcción de la url para la petición http*/
    //const url = `pagos/limit/${limite}`
    const url = `users`;
    return this.http.get(url, {});
  }
}
