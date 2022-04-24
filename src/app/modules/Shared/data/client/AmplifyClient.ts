import { API } from "aws-amplify";
import _ from "lodash";
import { HttpClientInterface } from "../config/HttpClient";
import { Payload } from "../config/Payload";
import store from "../../../../../ui/store/index";
import { HttpAppResponse } from "../utils/HttpAppResponse";

export default class AmplifyClient implements HttpClientInterface {
  private static instance: AmplifyClient;

  private amplifyPayload = {
    headers: {},
    response: true,
  };
  constructor() {
    AmplifyClient.instance = this;
    const { VUE_APP_API_STAGE = "", VUE_APP_BASEURL = "" } = process.env;
    API.configure({
      API: {
        endpoints: [
          {
            name: "MyAPIGatewayAPI",
            endpoint: VUE_APP_BASEURL + VUE_APP_API_STAGE,
            // custom_header: async () => ({ Authorization: store.getters["auth/token"] }),
            custom_header: async () => ({ Authorization: store.state }),
            // custom_header: async () => ({ Authorization: process.env.VUE_APP_TOKEN_CRM }),
          },
        ],
      },
    });
  }

  public static getInstance(): AmplifyClient {
    if (!AmplifyClient.instance) return new AmplifyClient();
    return AmplifyClient.instance;
  }

  delete(url: string, payload: Payload): Promise<HttpAppResponse> {
    return API.del(
      "MyAPIGatewayAPI",
      url,
      _.merge(this.amplifyPayload, payload)
    );
  }

  get(url: string, payload: Payload): Promise<HttpAppResponse> {
    return API.get(
      "MyAPIGatewayAPI",
      url,
      _.merge(this.amplifyPayload, payload)
    );
  }

  post(url: string, payload: Payload): Promise<HttpAppResponse> {
    return API.post(
      "MyAPIGatewayAPI",
      url,
      _.merge(this.amplifyPayload, payload)
    );
  }

  put(url: string, payload: Payload): Promise<HttpAppResponse> {
    return API.put(
      "MyAPIGatewayAPI",
      url,
      _.merge(this.amplifyPayload, payload)
    );
  }
}
