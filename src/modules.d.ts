declare module 'zmp-core/lite' {
  function createStore<T>({ getters }: {
    state: T,
    getters: { [key: string]: (params: { state: T }) => unknown },
    actions: { [key: string]: (params: { state: T }, payload?: unknown) => unknown }
  }): {
    state: T;
    getters: typeof getters;
    dispatch: (name: string, data?: any) => Promise<any>;
    __removeCallback: (callback: any) => void;
  }
}

declare module "*.png" {
  const value: string;
  export default value;
}