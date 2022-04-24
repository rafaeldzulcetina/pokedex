/**
 * @description     Wrapper central de peticiones a un API con axios o amplify
 * @creationDate    28 de Diciembre de 2021
 * @autor           Rafael Cetina
 */
import { HttpClientInterface } from "../config/HttpClient";
import { Payload } from "../config/Payload";
import { HttpClientWrapper } from "../config/HttpClientWrapper";
import HttpResponseHandler from "../config/HttpResponseHandler";
import AmplifyClient from "./AmplifyClient";
import AxiosClient from "./AxiosClient";
import { Response } from "../config/Response";
import { injectable } from "inversify";

/**
 * Clase HttpClient para hacer peticiones HTTP por medio de un cliente [AXIOS, AMPLIFY]
 * @class
 * @implements {HttpClientWrapper, HttpResponseHandler}
 */
@injectable()
export default class HttpClient
  extends HttpResponseHandler
  implements HttpClientWrapper
{
  private readonly httpClient!: HttpClientInterface;

  constructor() {
    super();

    if (process.env.VUE_APP_HTTP_CLIENT !== "axios") {
      this.httpClient = AmplifyClient.getInstance();
    } else {
      this.httpClient = AxiosClient.getInstance();
    }
  }

  /**
   * Hacer una peticion DELETE usando un cliente HTTP y parceando la respuesta
   * @param url {string}
   * @param payload {Payload}
   * @override delete
   * @return {Promise<Response<any>>}
   */
  async delete<T, U>(url: string, payload: Payload): Promise<Response<U>> {
    return this.commitRequest(this.httpClient.delete(url, payload));
  }

  /**
   * Hacer una peticion GET usando un cliente HTTP y parceando la respuesta
   * @param url {string}
   * @param payload {Payload}
   * @override get
   * @return {Promise<Response<any>>}
   */
  async get<T, U>(url: string, payload: Payload): Promise<Response<U>> {
    return this.commitRequest(this.httpClient.get(url, payload));
  }

  /**
   * Hacer una peticion POST usando un cliente HTTP y parceando la respuesta
   * @param url {string}
   * @param payload {Payload}
   * @override post
   * @return {Promise<Response<any>>}
   */
  async post(url: string, payload: Payload): Promise<Response<any>> {
    return this.commitRequest(this.httpClient.post(url, payload));
  }

  /**
   * Hacer una peticion PUT usando un cliente HTTP y parceando la respuesta
   * @param url {string}
   * @param payload {Payload}
   * @override put
   * @return {Promise<Response<any>>}
   */
  async put(url: string, payload: Payload): Promise<Response<any>> {
    return this.commitRequest(this.httpClient.put(url, payload));
  }
}
