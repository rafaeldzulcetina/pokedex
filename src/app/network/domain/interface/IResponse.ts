import { INetworkMessage } from "@/app/network/domain/interface/INetworkMessage";

export interface IResponse<T> {
  data: T;
  warnings: INetworkMessage[];
  errors: INetworkMessage[];
}
