import { FailureModel } from "./FailureModel";

export interface Response<T> {
  data?: T;
  warning: FailureModel[];
  error: FailureModel[];
}
