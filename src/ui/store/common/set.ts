// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const set = (property: any) => (store: any, payload: any) => {
  store[property] = payload
}
