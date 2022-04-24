/**
 * @description Interface de Wrapper que consume diferentes clientes HTTP
 * @author Rafael Cetina
 * @since 28 de Diciembre de 2021
 */
import { Payload } from "./Payload";
import { Response } from "./Response";
/**
 * @see Response
 * @description Interfaz con metodos HTTP y transoformacion a respuesta estandar
 * @interface
 */
export interface HttpClientWrapper {
  /**
   * @description Crea una peticion GET haciendo uso de un cliente HTTP
   * @param url {string}
   * @param payload {Payload}
   * @return Promise<Response<any>>
   */
  get(url: string, payload: Payload): Promise<Response<any>>;
  /**
   * @description Crea una peticion POST haciendo uso de un cliente HTTP
   * @param url {string}
   * @param payload {Payload}
   * @return Promise<Response<any>>
   */
  post(url: string, payload: Payload): Promise<Response<any>>;
  /**
   * @description Crea una peticion PUT haciendo uso de un cliente HTTP
   * @param url {string}
   * @param payload {Payload}
   * @return Promise<Response<any>>
   */
  put(url: string, payload: Payload): Promise<Response<any>>;
  /**
   * @description Crea una peticion DELETE haciendo uso de un cliente HTTP
   * @param url {string}
   * @param payload {Payload}
   * @return Promise<Response<any>>
   */
  delete(url: string, payload: Payload): Promise<Response<any>>;
}
