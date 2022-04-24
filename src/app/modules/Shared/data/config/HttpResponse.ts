/**
 * @description Respuesta estandar para peticiones HTTP
 * @author Rafael Cetina
 * @since 28 de Diciembre de 2021
 */
export interface HttpResponse<T> {
  /**
   * @interface
   * @param <T> Esctructura de datos que se esperan de la peticion http
   * @param data Estructura de datos o elemento data de una respuesta HTTP
   * @param status Codigo de estatus de la respuesta HTTP
   * @param errors Errores que puede lanzar la peticion HTTP
   */
  data?: T;
  status: string;
  errors?: string[];
}
