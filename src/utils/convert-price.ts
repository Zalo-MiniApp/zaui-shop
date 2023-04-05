const convertPrice = (price: string | number | Number) =>
  Math.round(Number(price)).toLocaleString();

export default convertPrice;
