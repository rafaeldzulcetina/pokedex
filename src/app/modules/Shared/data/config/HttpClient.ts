/**
 * @description Interface de Cliente crear peticiones HTTP estandar
 * @author Rafael Cetina
 * @since 28 de Diciembre de 2021
 */
import { Payload } from "./Payload";
import { HttpAppResponse } from "../utils/HttpAppResponse";
/**
 * @description Interface para mapero de los diferentes verbos HTTP en la app
 * @interface
 */
export interface HttpClientInterface {
  /**
   * @description Crea una peticion GET y retornar una promesa de {AxiosResponse}
   * @param url {string}
   * @param payload {Payload}
   * @return Promise<AxiosResponse>
   */
  get(url: string, payload: Payload): Promise<HttpAppResponse>;
  /**
   * @description Crea una peticion POST y retornar una promesa de {AxiosResponse}
   * @param url {string}
   * @param payload {Payload}
   * @return Promise<AxiosResponse>
   */
  post(url: string, payload: Payload): Promise<HttpAppResponse>;
  /**
   * @description Crea una peticion PUT y retornar una promesa de {AxiosResponse}
   * @param url {string}
   * @param payload {Payload}
   * @return Promise<AxiosResponse>
   */
  put(url: string, payload: Payload): Promise<HttpAppResponse>;
  /**
   * @description Crea una peticion DELETE y retornar una promesa de {AxiosResponse}
   * @param url {string}
   * @param payload {Payload}
   * @return Promise<AxiosResponse>
   */
  delete(url: string, payload: Payload): Promise<HttpAppResponse>;
}
