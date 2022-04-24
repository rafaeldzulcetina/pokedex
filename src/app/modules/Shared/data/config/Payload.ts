/**
 * @description Payload estandar para setear una peticion HTTP
 * @author Rafael Cetina
 * @since 28 de Diciembre de 2021
 */
export interface Payload {
  /**
   * @interface
   * @param data Estructura de datos o elemento data de una respuesta HTTP
   * @param headers son los encabezados dentro de un cliente que hara una peticion HTTP
   * @param params son los query params que se enviaran en una peticion HTTP
   */
  data?: never;
  headers?: never;
  params?: never;
}
