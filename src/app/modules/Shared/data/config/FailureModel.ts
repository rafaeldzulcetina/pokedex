import { ErrorStatus } from "./ErrorStatus";

export interface FailureModel {
  code: string;
  category: ErrorStatus;
  msg: string;
}
