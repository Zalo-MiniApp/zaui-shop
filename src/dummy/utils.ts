import { StoreTypeRef } from "../constants/referrence";
import { Product, Store } from "../models";
import { getRandomInt } from "../utils";
import {
  listAddress,
  listCategories,
  listDescriptions,
  listNameProducts,
  listNameStore,
  listPrices,
  listProductOptions,
  numLogo,
  numProduct,
  numStoreBanner,
} from "./constants";

const getImgUrl = (filename: string) =>
  `https://stc-zmp.zadn.vn/zmp-ecommerce/img/${filename}.png`;

export const createProductDummy = ({ id }: { id: number }): Product => {
  const randomPrice = listPrices[getRandomInt(listPrices.length) - 1];
  const product: Product = {
    id,
    imgProduct: getImgUrl(`product-large-${getRandomInt(numProduct)}`),
    nameProduct: listNameProducts[getRandomInt(listNameProducts.length) - 1],
    salePrice: randomPrice.salePrice,
    retailPrice: randomPrice.retailPrice,
    description: listDescriptions[getRandomInt(listDescriptions.length) - 1],
    options: getRandomInt(1, 0) === 0 ? [] : listProductOptions,
  };
  return product;
};

export const createDummyProductCategories = () => {
  const dummyProducts: Product[] = [];
  const num = 150;
  for (let x = 0; x < num; x += 1) {
    dummyProducts.push(createProductDummy({ id: dummyProducts.length }));
  }
  return dummyProducts;
};

export const createDummyStore = (): Store => {
  const storeId = +new Date();
  const listDummyProducts = createDummyProductCategories();
  const listType = Object.keys(StoreTypeRef) as (keyof typeof StoreTypeRef)[];
  const dummyStore = {
    id: storeId,
    logoStore: getImgUrl(`logo-${getRandomInt(numLogo)}-new`),
    bannerStore: getImgUrl(`store-banner-${getRandomInt(numStoreBanner)}`),
    nameStore: listNameStore[getRandomInt(listNameStore.length) - 1],
    followers: getRandomInt(9999, 10),
    address: listAddress[getRandomInt(listAddress.length) - 1],
    type: listType[getRandomInt(listType.length) - 1],
    listProducts: listDummyProducts,
    categories: listCategories,
  };
  return dummyStore;
};
