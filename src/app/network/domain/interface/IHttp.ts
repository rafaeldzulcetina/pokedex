import { IPayload } from "@/app/network/domain/interface/IPayload";
import { IResponse } from "@/app/network/domain/interface/IResponse";

export interface IHttp {
  get<T, U>(url: string, payload?: IPayload<T>): Promise<IResponse<U>>;
  put<T, U>(url: string, payload?: IPayload<T>): Promise<IResponse<U>>;
  post<T, U>(url: string, payload?: IPayload<T>): Promise<IResponse<U>>;
  delete<T, U>(url: string, payload?: IPayload<T>): Promise<IResponse<U>>;
  patch<T, U>(url: string, payload?: IPayload<T>): Promise<IResponse<U>>;
}
