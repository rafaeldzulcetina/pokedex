// TODO: DOCUMENT THIS KIND
export interface IBaseUseCase<T, U> {
  execute(port?: T): U;
}
