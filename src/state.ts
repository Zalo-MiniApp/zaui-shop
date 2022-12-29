import { createStoreDummy, productsDummy } from './dummy/utils';
import { atom, atomFamily, selector } from 'recoil';
import { userInfo } from 'zmp-sdk';
import { Address, HeaderType, orderOfStore, Product, ProductInfoPicked, Store } from './models';
import { getRandomInt } from './utils';
import { filter } from './constants/referrence';

export const storeState = atom<Store>({
  key: 'user',
  default: createStoreDummy(1)[0],
});

export const productState = atom<Product[]>({
  key: 'product',
  default: productsDummy,
});

export const cartState = atom<orderOfStore[]>({
  key: 'cart',
  default: [],
});

export const headerState = atom<HeaderType>({
  key: 'header',
  default: {},
});

export const searchProductState = atom<string>({
  key: 'searchProduct',
  default: '',
});

export const activeCateState = atom<number>({
  key: 'activeCate',
  default: 0,
});

export const activeFilterState = atom<string>({
  key: 'activeFilter',
  default: filter[0].key,
});

export const storeProductResultState = selector<Product[]>({
  key: 'storeProductResult',
  get: ({ get }) => {
    const store = get(storeState);

    const activeCate = get(activeCateState);
    const searchProduct = get(searchProductState);

    const pos = getRandomInt(store.listProducts.length - 122, 0);
    const num = getRandomInt(120, 50);
    return [...store.listProducts.slice(pos, pos + num)];
  },
});

export const addressState = atom<Address>({
  key: 'address',
  default: {
    city: '',
    district: '',
    ward: '',
    detail: '',
  },
});

export const openProductPickerState = atom<boolean>({
  key: 'openProductPicker',
  default: false,
});

export const initialProductInfoPickedState = {
  productId: -1,
  isUpdate: false,
};

export const productInfoPickedState = atom<ProductInfoPicked>({
  key: 'productInfoPicked',
  default: initialProductInfoPickedState,
});
