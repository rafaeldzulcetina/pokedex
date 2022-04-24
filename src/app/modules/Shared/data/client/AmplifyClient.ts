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
  private apiStage = "dev/api/";
  //private apiStage = 'api/'

  constructor() {
    AmplifyClient.instance = this;

    API.configure({
      API: {
        endpoints: [
          {
            name: "MyAPIGatewayAPI",
            // endpoint_old: 'https://qolvv3jx5a.execute-api.us-east-2.amazonaws.com',
            endpoint: process.env.VUE_APP_BASEURL + this.apiStage,
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
