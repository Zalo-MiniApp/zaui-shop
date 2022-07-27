import { productResultDummy } from "./dummy/product-result";

import { createStore } from "zmp-core/lite";
import { userInfo } from "zmp-sdk";
import { Store, Product, CartProduct } from "./models";
import { calcCrowFliesDistance } from "./utils/location";
import { storeDummy } from "./dummy/list-store";
import oaFollowing from "./pages/oa-following";

export type orderOfStore = {
  storeId: number;
  status: "pending" | "shipping";
  listOrder: CartProduct[];
};

interface StoreState {
  user: userInfo;
  keyword: string;
  position: Location | null;
  products: Product[];
  productResult: Product[];
  store: Store[];
  oaFollowing: Store[];
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
    oaFollowing: storeDummy.slice(0,2),
    keyword: "",
    position: null,
    cart: [],
  },
  getters: {
    user({ state }) {
      return state.user;
    },
    keyword({ state }) {
      return state.keyword;
    },
    cart({ state }) {
      return state.cart;
    },
    store({state}) {
      return state.store;
    },
    oaFollowing({state}) {
      return state.oaFollowing;
    }
  },
  actions: {
    setUser({ state }, data: userInfo) {
      state.user = { ...state.user, ...data };
      // mock booking
    },
    setPosition({ state }, data: Location) {
      state.position = data;
    },
    setKeyword({ state }, keyword: string) {
      state.keyword = keyword;
      console.log("keyword: ", keyword);
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
          storeId,
          status: "pending",
          listOrder: [{ ...productOrder } as CartProduct],
        });
        state.cart = [...state.cart ];
      } else {
        const cart = state.cart;
        const indexOrder = cart[indexStore]?.listOrder.findIndex((ord) => {
          return ord.id == productOrder.id;
        });
        indexOrder >= 0
          ? (cart[indexStore].listOrder[indexOrder].order = productOrder.order)
          : cart[indexStore].listOrder.push({ ...productOrder });
        state.cart = [...cart];
      }
    },
  },
});

export default store;
