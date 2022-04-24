import Amplify, { API } from "aws-amplify";

import Axios, { AxiosError, AxiosInstance } from "axios";
import { IHttp } from "@/app/network/domain/interface/IHttp";
import { IPayload } from "@/app/network/domain/interface/IPayload";
import { IResponse } from "@/app/network/domain/interface/IResponse";
import { SupportedHttpClients } from "@/app/network/domain/data/SupportedHttpClients";
import { injectable } from "inversify";
import {
  Json,
} from "@/app/modules/Shared/domain/json.types";
import store from "@/ui/store/index";

@injectable()
export default class Http implements IHttp {
  private axios!: AxiosInstance;
  private requestHeaders: Json = { "content-type": "application/json" };
  private token: "";

  constructor() {
    switch (process.env.VUE_APP_HTTP_CLIENT) {
      case SupportedHttpClients.AXIOS:
        this.instanceAxios();
        break;
      case SupportedHttpClients.AMPLIFY:
        this.instanceAmplify();
        break;
      default:
        // FECTH
        break;
    }
  }

  private instanceAxios() {
    this.axios = Axios.create({
      baseURL: process.env.VUE_APP_BASE_URL + process.env.VUE_APP_API_STAGE,
    });
  }

  private instanceAmplify() {
    Amplify.configure({
      API: {
        endpoints: [
          {
            name: "api",
            endpoint: process.env.VUE_APP_BASE_URL + process.env.VUE_APP_API_STAGE,
            custom_header: async () => {
              return { Authorization: `Bearer ${this.token}` };
            },
          },
        ],
      },
    });
  }

  async delete<T, U>(
    url: string,
    payload?: IPayload<T>
  ): Promise<IResponse<U>> {
    switch (process.env.VUE_APP_HTTP_CLIENT) {
      case SupportedHttpClients.AXIOS:
        try {
          const response = await this.axios.delete(url, {
            params: payload?.params,

            headers: this.requestHeaders,
            data: payload?.data,
          });

          return {

            data: response.data,

            errors: response.data.errors,

            warnings: response.data.warnings,
          };
        } catch (e) {

          const { data, errors, warnings } = (e as AxiosError).response.data;
          return {
            data,
            errors,
            warnings,
          };
        }

      case SupportedHttpClients.AMPLIFY:
        try {
          const response = await API.del("api", url, {
            response: true,

            body: payload.data, // DATA

            queryStringParameters: payload.params, // QUERY STRINGS,
          });
          return {
            data: response.data,
            errors: response.data.errors,
            warnings: response.data.warnings,
          };
        } catch (e) {
          return {
            data: e.response.data,
            errors: e.response.data.errors,
            warnings: e.response.data.warnings,
          };
        }
      default:

        return Promise.resolve(undefined);
    }
  }

  async get<T, U>(url: string, payload?: IPayload<T>): Promise<IResponse<U>> {
    switch (process.env.VUE_APP_HTTP_CLIENT) {
      case SupportedHttpClients.AXIOS:
        try {
          const response = await this.axios.get(url, {
            params: payload?.params,

            headers: this.requestHeaders,
            data: payload?.data,
          });

          return {

            data: response.data,

            errors: response.data.errors,

            warnings: response.data.warnings,
          };
        } catch (e) {
          const error = e as AxiosError;
          return {

            data: null,

            errors: error.response.data.errors,

            warnings: error.response.data.warnings,
          };
        }

      case SupportedHttpClients.AMPLIFY:
        try {
          const response = await API.get("api", url, {
            response: true,
            queryStringParameters: payload.params, // QUERY STRINGS,
          });
          return {
            data: response.data,
            errors: response.data.errors,
            warnings: response.data.warnings,
          };
        } catch (e) {
          return {
            data: e.response.data,
            errors: e.response.data.errors,
            warnings: e.response.data.warnings,
          };
        }
      default:

        return Promise.resolve(undefined);
    }
  }

  async post<T, U>(url: string, payload?: IPayload<T>): Promise<IResponse<U>> {
    switch (process.env.VUE_APP_HTTP_CLIENT) {
      case SupportedHttpClients.AXIOS:
        try {

          const response = await this.axios.post(url, payload.data, {
            params: payload?.params,

            headers: this.requestHeaders,
          });

          return {

            data: response.data,

            errors: response.data.errors,

            warnings: response.data.warnings,
          };
        } catch (e) {

          const { data, errors, warnings } = (e as AxiosError).response.data;
          return {
            data,
            errors,
            warnings,
          };
        }

      case SupportedHttpClients.AMPLIFY:
        try {
          const response = await API.post("api", url, {
            response: true,

            body: payload.data, // DATA

            queryStringParameters: payload.params, // QUERY STRINGS,
          });
          return {
            data: response.data,
            errors: response.data.errors,
            warnings: response.data.warnings,
          };
        } catch (e) {
          return {
            data: e.response.data,
            errors: e.response.data.errors,
            warnings: e.response.data.warnings,
          };
        }
      default:

        return Promise.resolve(undefined);
    }
  }

  async put<T, U>(url: string, payload?: IPayload<T>): Promise<IResponse<U>> {
    switch (process.env.VUE_APP_HTTP_CLIENT) {
      case SupportedHttpClients.AXIOS:
        try {
          const response = await this.axios.put(url, payload?.data, {
            params: payload?.params,

            headers: this.requestHeaders,
          });

          return {

            data: response.data,

            errors: response.data.errors,

            warnings: response.data.warnings,
          };
        } catch (e) {

          const { data, errors, warnings } = (e as AxiosError).response.data;
          return {
            data,
            errors,
            warnings,
          };
        }

      case SupportedHttpClients.AMPLIFY:
        try {
          const response = await API.put("api", url, {
            response: true,

            body: payload.data, // DATA

            queryStringParameters: payload.params, // QUERY STRINGS,
          });
          return {
            data: response.data,
            errors: response.data.errors,
            warnings: response.data.warnings,
          };
        } catch (e) {
          return {
            data: e.response.data,
            errors: e.response.data.errors,
            warnings: e.response.data.warnings,
          };
        }
      default:

        return Promise.resolve(undefined);
    }
  }

  async patch<T, U>(url: string, payload?: IPayload<T>): Promise<IResponse<U>> {
    switch (process.env.VUE_APP_HTTP_CLIENT) {
      case SupportedHttpClients.AXIOS:
        try {
          const response = await this.axios.patch(url, {
            params: payload?.params,
            headers: this.requestHeaders,
            data: payload?.data,
          });

          return {

            data: response.data,

            errors: response.data.errors,

            warnings: response.data.warnings,
          };
        } catch (e) {

          const { data, errors, warnings } = (e as AxiosError).response.data;
          return {
            data,
            errors,
            warnings,
          };
        }

      case SupportedHttpClients.AMPLIFY:
        try {
          const response = await API.patch("api", url, {
            response: true,

            body: payload.data, // DATA

            queryStringParameters: payload.params, // QUERY STRINGS,
          });
          return {
            data: response.data,
            errors: response.data.errors,
            warnings: response.data.warnings,
          };
        } catch (e) {
          return {
            data: e.response.data,
            errors: e.response.data.errors,
            warnings: e.response.data.warnings,
          };
        }
      default:

        return Promise.resolve(undefined);
    }
  }
}
