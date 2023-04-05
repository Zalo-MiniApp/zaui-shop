import React from "react";
import { Box } from "zmp-ui";
import { convertPrice } from "../../utils";
import ImageRatio from "../img-ratio";

type CardProductProps = {
  id: number;
  pathImg: string;
  nameProduct: string;
  salePrice: string | number;
  quantity: number;
  handleOnClick: (productId: number) => void;
};

const CardProductOrder = ({
  id,
  pathImg,
  nameProduct,
  salePrice,
  quantity,
  handleOnClick,
}: CardProductProps) => (
  <div
    className="w-full flex flex-row items-center justify-between gap-1 border border-[#E4E8EC] rounded-lg overflow-hidden h-24 p-2 mt-2 bg-white"
    onClick={() => handleOnClick(id)}
    role="button"
  >
    <div className="flex flex-row items-center gap-1">
      <div className="flex-none w-20 rounded-lg overflow-hidden">
        <ImageRatio src={pathImg} alt="image product" ratio={1} />
      </div>
      <Box
        p={0}
        m={0}
        className=" flex-none relative w-5 h-5 rounded-full bg-slate-100"
      >
        <div className=" absolute top-1/2 -translate-y-1/2 w-full text-center text-xs text-blue-700 ">
          {quantity}
        </div>
      </Box>
      <Box m={0} className="flex-none text-slate-500">
        x
      </Box>
      <div>
        <div className="line-clamp-2 text-sm break-words">{nameProduct}</div>
      </div>
    </div>
    <span className=" pt-1 font-semibold text-sm">
      <span className=" font-normal text-xs">đ</span>
      {convertPrice(salePrice)}
    </span>
  </div>
);

export default CardProductOrder;
