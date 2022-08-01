import { productResultDummy } from "./dummy/product-result";

import { createStore } from "zmp-core/lite";
import { userInfo } from "zmp-sdk";
import { Store, Product, CartProduct, OrderStatus, Address } from "./models";
import { calcCrowFliesDistance } from "./utils/location";
import { storeDummy } from "./dummy/list-store";

export type orderOfStore = {
  orderId: number;
  storeId: number;
  status: OrderStatus;
  listOrder: CartProduct[];
  date: Date;
};

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
      id: "",
      avatar: "",
      name: "",
    },
    products: productResultDummy.slice(0, 6),
    productResult: productResultDummy,
    store: storeDummy,
    storeFollowing: storeDummy.slice(0, 2),
    keyword: "",
    latlong: null,
    address: {
      city: "",
      district: "",
      ward: "",
      detail: "",
    },
    cart: [
      {
        orderId: 0,
        storeId: 0,
        status: "pending",
        listOrder: [
          {
            id: 0,
            order: { quantity: 3, size: "m", color: "cloud-blue", note: "buy" },
          },
        ],
        date: new Date(),
      },
      {
        orderId: 1,
        storeId: 1,
        status: "pending",
        listOrder: [
          {
            id: 0,
            order: { quantity: 3, size: "m", color: "cloud-blue", note: "buy" },
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
      state.address ={ city: "1", district: "19", ward: "258", detail: "" };
        //developer can parse address from the position state given by the user
    },
    setKeyword({ state }, keyword: string) {
      state.keyword = keyword;
   
    },
    setCart(
      { state },
      { storeId, productOrder }: { storeId: number; productOrder: CartProduct }
    ) {
      const indexStore = state.cart.findIndex(
        (store) => store.storeId == storeId
      );
      if (indexStore < 0) {
        state.cart.push({
          orderId: state.cart.length,
          date: new Date(),
          storeId,
          status: "pending",
          listOrder: [{ ...productOrder } as CartProduct],
        });
        state.cart = [...state.cart];
      } else {
        const cart = state.cart;
        const indexOrder = cart[indexStore]?.listOrder.findIndex((ord) => {
          return ord.id == productOrder.id;
        });

        indexOrder >= 0
          ? (cart[indexStore].listOrder[indexOrder].order = productOrder.order)
          : cart[indexStore].listOrder.push({ ...productOrder });

        cart[indexStore].date = new Date();
        state.cart = [...cart];
      }
    },
  },
});

export default store;
