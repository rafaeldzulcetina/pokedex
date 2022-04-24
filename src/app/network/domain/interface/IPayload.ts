import { IHttpSettings } from "@/app/network/domain/interface/IHttpSettings";

export interface IPayload<T> {
  data?: T;
  headers?: IHttpSettings;
  params?: IHttpSettings;
}
