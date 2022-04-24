import Amplify, { API } from "aws-amplify";
import Axios, { AxiosError, AxiosInstance } from "axios";
import { IHttp } from "@/app/network/domain/interface/IHttp";
import { IPayload } from "@/app/network/domain/interface/IPayload";
import { IResponse } from "@/app/network/domain/interface/IResponse";
import { SupportedHttpClients } from "@/app/network/domain/data/SupportedHttpClients";
import { inject, injectable } from "inversify";
import {
  JsonPrimitive,
  JsonMap,
  JsonArray,
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

    this.token = store.getters["auth/token"];
    if (this.token) {
      // @ts-ignore
      this.requestHeaders["Authorization"] = `Bearer ${this.token}`;
    }
  }

  private instanceAxios() {
    this.axios = Axios.create({
      baseURL: process.env.VUE_APP_BASEURL,
    });
  }

  private instanceAmplify() {
    Amplify.configure({
      API: {
        endpoints: [
          {
            name: "api",
            endpoint: process.env.VUE_APP_FAKE_API_URL_DEV + "dev/",
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
            // @ts-ignore
            headers: this.requestHeaders,
            data: payload?.data,
          });

          return {
            // @ts-ignore
            data: response.data.data,
            // @ts-ignore
            errors: response.data.data.errors,
            // @ts-ignore
            warnings: response.data.data.warnings,
          };
        } catch (e) {
          // @ts-ignore
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
            // @ts-ignore
            body: payload.data, // DATA
            // @ts-ignore
            queryStringParameters: payload.params, // QUERY STRINGS,
          });
          return {
            data: response.data.data,
            errors: response.data.errors,
            warnings: response.data.warnings,
          };
        } catch (e) {
          return {
            data: e.response.data.data,
            errors: e.response.data.errors,
            warnings: e.response.data.warnings,
          };
        }
      default:
        // @ts-ignore
        return Promise.resolve(undefined);
    }
  }

  async get<T, U>(url: string, payload?: IPayload<T>): Promise<IResponse<U>> {
    switch (process.env.VUE_APP_HTTP_CLIENT) {
      case SupportedHttpClients.AXIOS:
        try {
          const response = await this.axios.get(url, {
            params: payload?.params,
            // @ts-ignore
            headers: this.requestHeaders,
            data: payload?.data,
          });

          return {
            // @ts-ignore
            data: response.data.data,
            // @ts-ignore
            errors: response.data.data.errors,
            // @ts-ignore
            warnings: response.data.data.warnings,
          };
        } catch (e) {
          const error = e as AxiosError;
          return {
            // @ts-ignore
            data: null,
            // @ts-ignore
            errors: error.response.data.errors,
            // @ts-ignore
            warnings: error.response.data.warnings,
          };
        }

      case SupportedHttpClients.AMPLIFY:
        try {
          const response = await API.get("api", url, {
            response: true,
            // @ts-ignore
            queryStringParameters: payload.params, // QUERY STRINGS,
          });
          return {
            data: response.data.data,
            errors: response.data.errors,
            warnings: response.data.warnings,
          };
        } catch (e) {
          return {
            data: e.response.data.data,
            errors: e.response.data.errors,
            warnings: e.response.data.warnings,
          };
        }
      default:
        // @ts-ignore
        return Promise.resolve(undefined);
    }
  }

  async post<T, U>(url: string, payload?: IPayload<T>): Promise<IResponse<U>> {
    switch (process.env.VUE_APP_HTTP_CLIENT) {
      case SupportedHttpClients.AXIOS:
        try {
          // @ts-ignore
          const response = await this.axios.post(url, payload.data, {
            params: payload?.params,
            // @ts-ignore
            headers: this.requestHeaders,
          });

          return {
            // @ts-ignore
            data: response.data.data,
            // @ts-ignore
            errors: response.data.data.errors,
            // @ts-ignore
            warnings: response.data.data.warnings,
          };
        } catch (e) {
          // @ts-ignore
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
            // @ts-ignore
            body: payload.data, // DATA
            // @ts-ignore
            queryStringParameters: payload.params, // QUERY STRINGS,
          });
          return {
            data: response.data.data,
            errors: response.data.errors,
            warnings: response.data.warnings,
          };
        } catch (e) {
          return {
            data: e.response.data.data,
            errors: e.response.data.errors,
            warnings: e.response.data.warnings,
          };
        }
      default:
        // @ts-ignore
        return Promise.resolve(undefined);
    }
  }

  async put<T, U>(url: string, payload?: IPayload<T>): Promise<IResponse<U>> {
    switch (process.env.VUE_APP_HTTP_CLIENT) {
      case SupportedHttpClients.AXIOS:
        try {
          const response = await this.axios.put(url, payload?.data, {
            params: payload?.params,
            // @ts-ignore
            headers: this.requestHeaders,
          });

          return {
            // @ts-ignore
            data: response.data.data,
            // @ts-ignore
            errors: response.data.data.errors,
            // @ts-ignore
            warnings: response.data.data.warnings,
          };
        } catch (e) {
          // @ts-ignore
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
            // @ts-ignore
            body: payload.data, // DATA
            // @ts-ignore
            queryStringParameters: payload.params, // QUERY STRINGS,
          });
          return {
            data: response.data.data,
            errors: response.data.errors,
            warnings: response.data.warnings,
          };
        } catch (e) {
          return {
            data: e.response.data.data,
            errors: e.response.data.errors,
            warnings: e.response.data.warnings,
          };
        }
      default:
        // @ts-ignore
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
            // @ts-ignore
            data: response.data.data,
            // @ts-ignore
            errors: response.data.data.errors,
            // @ts-ignore
            warnings: response.data.data.warnings,
          };
        } catch (e) {
          // @ts-ignore
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
            // @ts-ignore
            body: payload.data, // DATA
            // @ts-ignore
            queryStringParameters: payload.params, // QUERY STRINGS,
          });
          return {
            data: response.data.data,
            errors: response.data.errors,
            warnings: response.data.warnings,
          };
        } catch (e) {
          return {
            data: e.response.data.data,
            errors: e.response.data.errors,
            warnings: e.response.data.warnings,
          };
        }
      default:
        // @ts-ignore
        return Promise.resolve(undefined);
    }
  }
}
