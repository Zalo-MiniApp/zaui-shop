import { productResultDummy } from "../dummy/product-result";
import { CartProduct } from "./../models";
export const calcSalePercentage = (salePrice, retailPrice) => {
  return Math.floor((1 - parseInt(salePrice) / parseInt(retailPrice)) * 100);
};

export const calcTotalPriceOrder = (listOrder: CartProduct[]) => {
  const result: Number = listOrder.reduce((total, item, index) => {
    return (
      total +
      Number(item.order.quantity) *
        Number(productResultDummy[item.id].salePrice)
    );
  }, 0);
  return result;
};
