export const calcSalePercentage = (salePrice, retailPrice) => {
  return Math.floor((1 - parseInt(salePrice) / parseInt(retailPrice)) * 100);
};
