// eslint-disable-next-line import/no-extraneous-dependencies
import { createStore } from 'zmp-core/lite';
import { userInfo } from 'zmp-sdk';
import { productResultDummy , storeDummy } from './dummy';
import { Store, Product, CartProduct, OrderStatus, Address, orderOfStore } from './models';

interface StoreState {
  user: userInfo;
  keyword: string;
  latlong: Location | null;
  address: Address;
  products: Product[];
  productResult: Product[];
  store: Store[];
  storeFollowing: Store[];
  cart: orderOfStore[];
}

const store = createStore<StoreState>({
  state: {
    user: {
      id: '',
      avatar: '',
      name: '',
    },
    products: productResultDummy.slice(0, 6),
    productResult: productResultDummy,
    store: storeDummy,
    storeFollowing: storeDummy.slice(0, 2),
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
        storeId: 0,
        status: 'pending',
        listOrder: [
          {
            id: 0,
            order: { quantity: 3, size: 'm', color: 'cloud-blue', note: 'buy' },
          },
        ],
        date: new Date(),
      },
      {
        orderId: 1,
        storeId: 1,
        status: 'pending',
        listOrder: [
          {
            id: 26,
            order: { quantity: 3, note: '' },
          },
        ],
        date: new Date(),
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
  },
  actions: {
    setUser({ state }, data: userInfo) {
      state.user = { ...state.user, ...data };
      // mock booking
    },
    setPosition({ state }, data: Location) {
      state.latlong = data;
      state.address = { city: '1', district: '19', ward: '258', detail: '' };
      // developer can parse address from the position state given by the user
    },
    setKeyword({ state }, keyword: string) {
      state.keyword = keyword;
    },
    setCart({ state }, { storeId, productOrder }: { storeId: number; productOrder: CartProduct }) {
      const indexStore = state.cart.findIndex((cart) => cart.storeId == storeId);
      if (indexStore < 0) {
        state.cart.push({
          orderId: state.cart.length,
          date: new Date(),
          storeId,
          status: 'pending',
          listOrder: [{ ...productOrder } as CartProduct],
        });
        state.cart = [...state.cart];
      } else {
        const { cart } = state;
        const indexOrder = cart[indexStore]?.listOrder.findIndex(
          (ord) => ord.id == productOrder.id
        );

        if (indexOrder >= 0) cart[indexStore].listOrder[indexOrder].order = productOrder.order;
        else cart[indexStore].listOrder.push({ ...productOrder });

        cart[indexStore].date = new Date();
        state.cart = [...cart];
      }
    },
  },
});

export default store;
