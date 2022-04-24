/**
 * @description Clase para transformar las respuestas del tipo externas a internas
 * @author Rafael Cetina
 * @since 28 de Diciembre de 2021
 */

import { HttpAppError, HttpAppResponse } from "../utils/HttpAppResponse";
import { Response } from "./Response";
import { ErrorStatus } from "./ErrorStatus";

export default abstract class HttpResponseHandler {
  /**
   * @description Metodo que transforma una respuesta especifica a una general
   * @param response {HttpAppResponse<never>}
   * @return Response<never>
   */
  private transform(response: HttpAppResponse<never>): Response<never> {
    switch (response.status) {
      case 200:
        return {
          data: response.data,
          error: [],
          warning: [],
        };

      case 201:
        return {
          data: response.data,
          error: [],
          warning: [],
        };

      case 404:
        return {
          data: undefined,
          warning: [],
          error: [
            {
              code: "404",
              category: ErrorStatus.RESOURCE,
              msg: "NOT FOUNT",
            },
          ],
        };

      case 403:
        return {
          data: undefined,
          warning: [],
          error: [
            {
              code: "403",
              msg: "Forbidden",
              category: ErrorStatus.AUTHORIZATION,
            },
          ],
        };

      case 500:
        return {
          data: undefined,
          warning: [],
          error: [
            {
              code: "500",
              msg: "Internal server error",
              category: ErrorStatus.INTERNAL_ERROR,
            },
          ],
        };

      default:
        return {
          data: undefined,
          warning: [],
          error: [
            {
              code: "400",
              msg: "Bad Request",
              category: ErrorStatus.RESOURCE,
            },
          ],
        };
    }
  }

  protected handleAxiosErrors(response: HttpAppResponse): Response<never> {
    return this.transform({
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    });
  }

  protected handleAmplifyErrors(response: HttpAppResponse): Response<never> {
    return this.transform({
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    });
  }

  protected async commitRequest(
    response: Promise<HttpAppResponse<never>>
  ): Promise<Response<never>> {
    try {
      const result = await response;
      return this.transform(result);
    } catch (e) {
      // TODO: MAKE ERROR HANDLER
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.transform((e as HttpAppError).response!);
    }
  }
}
