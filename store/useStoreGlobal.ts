import { create } from 'zustand';

type StoreGlobalType = {};

const store = () => ({});

const useStoreGlobal = create<StoreGlobalType>(store);

export default useStoreGlobal;

export function setStoreGlobal<T extends keyof StoreGlobalType>(x: Pick<StoreGlobalType, T>) {
  useStoreGlobal.setState(x);
}
