/**
 * @description     Cliente HTTP axios
 * @creationDate    28 de Diciembre de 2021
 */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { HttpClientInterface } from "../config/HttpClient";
import { Payload } from "../config/Payload";
import { HttpAppResponse } from "../utils/HttpAppResponse";

/**
 * @description Clase para configurar y hacer peticiones HTTP con axios
 * @class
 * @implements {HttpClientInterface}
 */
export default class AxiosClient implements HttpClientInterface {
  private static instance: AxiosClient;

  /**
   * @description     Instancia de la clase para usar el patron singleton
   * @type AxiosInstance
   */
  private axios!: AxiosInstance;
  private apiStage = "dev/api";
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.VUE_APP_FAKE_API_URL + this.apiStage,
    });

    this.axios.interceptors.request.use((config: AxiosRequestConfig) => {
      return config;
    });

    AxiosClient.instance = this;
  }

  /**
   * @description Metodo que devuelve una instancia de Axios Client usando el patron singleton
   * @return AxiosClient
   */
  public static getInstance(): AxiosClient {
    if (AxiosClient.instance) {
      return AxiosClient.instance;
    }
    return new AxiosClient();
  }

  /**
   * @description Hacer una peticion DELETE usando axios
   * @override delete
   * @param url {string}
   * @param payload {Payload}
   * @return {Promise<AxiosResponse>}
   */
  delete(url: string, payload: Payload): Promise<HttpAppResponse> {
    return this.axios.delete(url, {
      data: payload.data,
      headers: payload.headers,
      params: payload.params,
    });
  }

  /**
   * @description Hacer una peticion GET usando axios
   * @override get
   * @param url {string}
   * @param payload {Payload}
   * @return {Promise<AxiosResponse>}
   */
  get(url: string, payload: Payload): Promise<HttpAppResponse> {
    return this.axios.get(url, {
      headers: payload.headers,
      params: payload.params,
    });
  }

  /**
   * @description Hacer una peticion POST usando axios
   * @override post
   * @param url {string}
   * @param payload {Payload}
   * @return {Promise<AxiosResponse>}
   */
  post(url: string, payload: Payload): Promise<HttpAppResponse> {
    return this.axios.post(url, payload.data, {
      headers: payload.headers,
      params: payload.params,
    });
  }

  /**
   * @description Hacer una peticion PUT usando axios
   * @override put
   * @param url {string}
   * @param payload {Payload}
   * @return {Promise<AxiosResponse>}
   */
  put(url: string, payload: Payload): Promise<HttpAppResponse> {
    return this.axios.put(url, payload.data, {
      headers: payload.headers,
      params: payload.params,
    });
  }
}
