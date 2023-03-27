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

export const createProductDummy = ({
  id,
  storeId,
}: {
  id: number;
  storeId: number;
}) => {
  const randomPrice = listPrices[getRandomInt(listPrices.length) - 1];
  const product: Product = {
    id,
    storeId,
    imgProduct: `product-large-${getRandomInt(numProduct)}`,
    nameProduct: listNameProducts[getRandomInt(listNameProducts.length) - 1],
    salePrice: randomPrice.salePrice,
    retailPrice: randomPrice.retailPrice,
    description: listDescriptions[getRandomInt(listDescriptions.length) - 1],
    options: getRandomInt(1, 0) === 0 ? [] : listProductOptions,
  };
  return product;
};

export const createDummyProductCategories = ({
  storeId,
}: {
  storeId: number;
}) => {
  const dummyProducts: Product[] = [];
  const num = 150;
  for (let x = 0; x < num; x += 1) {
    dummyProducts.push(
      createProductDummy({ id: dummyProducts.length, storeId })
    );
  }
  return dummyProducts;
};

export const createDummyStore = () => {
  const storeId = + new Date();
  const listDummyProducts = createDummyProductCategories({
    storeId,
  });
  const listType = Object.keys(StoreTypeRef);
  const dummyStore = {
    id: storeId,
    logoStore: `logo-${getRandomInt(numLogo)}-new`,
    bannerStore: `store-banner-${getRandomInt(numStoreBanner)}`,
    nameStore: listNameStore[getRandomInt(listNameStore.length) - 1],
    followers: getRandomInt(9999, 10),
    address: listAddress[getRandomInt(listAddress.length) - 1],
    type: listType[getRandomInt(listType.length) - 1],
    listProducts: listDummyProducts,
    categories: listCategories,

  }
  return dummyStore;
};
