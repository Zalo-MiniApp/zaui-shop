import { productResultDummy } from "./dummy/product-result";

import { createStore } from "zmp-core/lite";
import { userInfo } from "zmp-sdk";
import { Store, Product, CartProduct } from "./models";
import { calcCrowFliesDistance } from "./utils/location";

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
    store: [
      {
        key: 0,
        pathImg: "logo-budweiser",
        bannerStore: "img-7",
        nameStore: "BUDWEISER VIET NAM",
        followers: 9999,
        address: "TP Ho Chi Minh",
        categories: [
          "Tất cả sản phẩm",
          " Quần áo",
          "Dụng cụ thể thao",
          "Giày dép",
        ],
      },
      {
        key: 1,
        pathImg: "logo-cp",
        bannerStore: "img-6",
        nameStore: "BUDWEISER VIET NAM",
        followers: 9999,
        address: "TP Ho Chi Minh",
        categories: [
          "Tất cả sản phẩm",
          " Quần áo",
          "Dụng cụ thể thao",
          "Giày dép",
        ],
      },
      {
        key: 2,
        pathImg: "logo-bigC",
        bannerStore: "img-7",
        nameStore: "BigC\nVIET NAM",
        followers: 9999,
        address: "TP Ho Chi Minh",
        categories: [
          "Tất cả sản phẩm",
          " Quần áo",
          "Dụng cụ thể thao",
          "Giày dép",
        ],
      },
      {
        key: 3,
        pathImg: "logo-mcdonald",
        bannerStore: "img-2",
        nameStore: "McDonald VIET NAM",
        followers: 9999,
        address: "TP Ho Chi Minh",
        categories: [
          "Tất cả sản phẩm",
          " Quần áo",
          "Dụng cụ thể thao",
          "Giày dép",
        ],
      },
    ],
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
        const currentCart = state.cart[indexStore];
        const indexOrder = currentCart?.listOrder.findIndex((ord) => {
          return ord.id == productOrder.id;
        });
        console.log(indexOrder);
        indexOrder >= 0
          ? (currentCart.listOrder[indexOrder].order = productOrder.order)
          : currentCart.listOrder.push({ ...productOrder });
        state.cart[indexStore] = {...currentCart};
      }
    },
  },
});

export default store;
