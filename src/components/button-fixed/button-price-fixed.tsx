import React from "react";
import { Box } from "zmp-ui";
import { convertPrice } from "../../utils";

const ButtonPriceFixed = ({
  quantity,
  totalPrice,
  handleOnClick,
}: {
  quantity: number;
  totalPrice: Number;
  handleOnClick: () => void;
}) => (
  <div
    className=" text-base mx-2 px-4 py-3 flex items-center justify-between bg-gray-300 rounded-primary fixed bottom-[88px] left-0 right-0 z-50 anime-fade"
    onClick={handleOnClick}
    role="button"
  >
    <div className="font-medium">Đơn hàng</div>
    <Box m={0} flex justifyContent="space-around" alignItems="center">
      <div>{quantity} món</div>
      <div className=" w-1 h-1 bg-black rounded-lg mx-3" />
      <div>{convertPrice(totalPrice)}</div>
    </Box>
  </div>
);

export default ButtonPriceFixed;
