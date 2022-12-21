import { useRecoilValue } from "recoil";
import { productsDummy } from "../dummy/utils";
import { CartProduct } from "../models";
import { productState } from "../state";

export const calcSalePercentage = (
  salePrice: string | number,
  retailPrice: string | number
) => Math.floor((1 - Number(salePrice) / Number(retailPrice)) * 100);

export const calcTotalPriceOrder = (listOrder: CartProduct[]) => {
  const result: Number = listOrder.reduce(
    (total, item) =>
      total +
      Number(item.order.quantity) *
        Number(productsDummy.find((prod) => prod.id === item.id)?.salePrice),
    0
  );
  return result;
};

export const getRandomInt = (max: number, min: number = 1): number => {
  min = Math.floor(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};
