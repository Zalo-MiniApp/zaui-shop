import { StoreTypeRef } from "../constants/referrence";
import { Product } from "../models";
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

export const productsDummy: Product[] = [];

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
  productsDummy.push(product);
  return product;
};

export const createProductCategoriesDummy = ({
  storeId,
}: {
  storeId: number;
}) => {
  const createProducts: Product[] = [];
  const num = 150;
  for (let x = 0; x < num; x += 1) {
    createProducts.push(
      createProductDummy({ id: productsDummy.length, storeId })
    );
  }
  return createProducts;
};

export const createStoreDummy = (num: number) => {
  const storesDummy: any = [];
  const listType = Object.keys(StoreTypeRef);
  for (let i = 0; i < num; i += 1) {
    storesDummy.push({
      id: i,
      logoStore: `logo-${getRandomInt(numLogo)}-new`,
      bannerStore: `store-banner-${getRandomInt(numStoreBanner)}`,
      nameStore: listNameStore[getRandomInt(listNameStore.length) - 1],
      followers: getRandomInt(9999, 10),
      address: listAddress[getRandomInt(listAddress.length) - 1],
      type: listType[getRandomInt(listType.length) - 1],
      listProducts: createProductCategoriesDummy({
        storeId: i,
      }),
      categories: listCategories,
    });
  }
  // const readOnlyProduct: Product = createProductDummy({ id: 9999, storeId: 9999 });
  // productsDummy.push(readOnlyProduct);
  // storesDummy.push({
  //   id: 9999,
  //   logoStore: `logo-${getRandomInt(numLogo)}-new`,
  //   bannerStore: `store-banner-${getRandomInt(numStoreBanner)}`,
  //   nameStore: listNameStore[getRandomInt(listNameStore.length) - 1],
  //   followers: getRandomInt(9999, 10),
  //   address: listAddress[getRandomInt(listAddress.length) - 1],
  //   type: listType[getRandomInt(listType.length) - 1],
  //   listProducts: [readOnlyProduct],
  //   categories: listCategories,
  // });
  return storesDummy;
};
