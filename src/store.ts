// eslint-disable-next-line import/no-extraneous-dependencies
import { createStore } from 'zmp-core/lite';
import { userInfo } from 'zmp-sdk';
import { getRandomInt } from './utils/math';
import { createStoreDummy, productsDummy } from './dummy/utils';
import { Store, Product, CartProduct, Address, orderOfStore, HeaderType } from './models';

interface StoreState {
  user: userInfo;
  keyword: string;
  latlong: Location | null;
  address: Address;
  product: Product[];
  productResult: Product[];
  storeProductResult: Product[];
  store: Store[];
  storeFollowing: Store[];
  cart: orderOfStore[];
  header: HeaderType;
}

const store = createStore<StoreState>({
  state: {
    user: {
      id: '',
      avatar: '',
      name: '',
    },
    header: {},
    product: [],
    productResult: [],
    storeProductResult: [],
    store: [],
    storeFollowing: [],
    keyword: '',
    latlong: null,
    address: {
      city: '',
      district: '',
      ward: '',
      detail: '',
    },
    cart: [
      {
        orderId: 0,
        storeId: 9999,
        status: 'finish',
        listOrder: [
          {
            id: 9999,
            order: { quantity: 3, size: 'm', color: 'cloud-blue', note: 'buy' },
          },
        ],
        date: new Date(),
        address: {
          city: '1',
          district: '19',
          ward: '258',
          detail: 'Khu chế xuất Tân Thuận, Z06, Số 13',
        },
      },
    ],
  },
  getters: {
    user({ state }) {
      return state.user;
    },
    latlong({ state }) {
      return state.latlong;
    },
    header({ state }) {
      return state.header;
    },
    address({ state }) {
      return state.address;
    },
    keyword({ state }) {
      return state.keyword;
    },
    cart({ state }) {
      return state.cart;
    },
    store({ state }) {
      return state.store;
    },
    storeFollowing({ state }) {
      return state.storeFollowing;
    },
    product({ state }) {
      return state.product;
    },
    productResult({ state }) {
      return state.productResult;
    },
    storeProductResult({ state }) {
      return state.storeProductResult;
    },
  },
  actions: {
    async initDummyData({ state }) {
      const res = createStoreDummy(8);
      const resProducts = productsDummy;
      state.store = res;
      state.storeFollowing = res.slice(0, 3);
      state.product = resProducts;
    },
    setProductResult({ state }) {
      const pos = getRandomInt(state.product.length - 122, 0);
      const num = getRandomInt(120, 50);
      state.productResult = [...state.product.slice(pos, pos + num)];
    },
    setStoreProductResult({ state }, storeId: number) {
      const indexStore = state.store.findIndex((store) => store.id === storeId);
      const pos = getRandomInt(state.store[indexStore].listProducts.length - 122, 0);
      const num = getRandomInt(120, 50);
      state.storeProductResult = [...state.store[indexStore].listProducts.slice(pos, pos + num)];
    },
    setUser({ state }, data: userInfo) {
      state.user = { ...state.user, ...data };
    },
    setPosition({ state }, data: Location) {
      state.latlong = data;
      state.address = { city: '1', district: '19', ward: '258', detail: '' };
      // developer can parse address from the position state given by the user
    },
    setHeader({ state }, data: HeaderType) {
      state.header = data;
    },
    setKeyword({ state }, keyword: string) {
      state.keyword = keyword;
    },
    setCart({ state }, { storeId, productOrder }: { storeId: number; productOrder: CartProduct }) {
      const indexStore = state.cart.findIndex((cart) => cart.storeId === storeId);
      if (indexStore < 0) {
        if (productOrder.order.quantity > 0) {
          state.cart.push({
            orderId: state.cart.length,
            date: new Date(),
            storeId,
            status: 'pending',
            listOrder: [{ ...productOrder } as CartProduct],
          });
          state.cart = [...state.cart];
        }
      } else {
        const { listOrder } = state.cart[indexStore];
        const indexOrder = listOrder.findIndex((prod) => prod.id === productOrder.id);

        if (indexOrder >= 0) {
          // available in cart
          if (productOrder.order.quantity === 0) {
            // delete product in cart
            const filtered = listOrder.filter((product) => product.id !== productOrder.id);
            state.cart[indexStore].listOrder = filtered;
            if (filtered.length === 0) {
              // delete cart item
              state.cart.splice(indexStore, 1);
            }
          } else listOrder[indexOrder].order = productOrder.order;
        } else if (productOrder.order.quantity > 0) {
          listOrder.push({ ...productOrder });
        }

        if (state.cart[indexStore]) state.cart[indexStore].date = new Date();
        state.cart = [...state.cart];
      }
    },
    deleteCart({ state }, orderId: number) {
      const deleted = state.cart.filter((cart) => cart.orderId !== orderId);
      state.cart = deleted;
    },
  },
});

export default store;
