import React from "react";
import { zmp } from "zmp-framework/react/lite";
import { convertPrice, getImgUrl } from "../../utils";
import ImageRatio from "../img-ratio";

type CardProductVerticalProps = {
  pathImg: string;
  nameProduct: string;
  salePrice: number | string;
  salePercentage?: number;
  productId: number | string;
  storeId: number | string;
};
const CardProductVertical = ({
  productId, 
  storeId,
  pathImg,
  nameProduct,
  salePrice,
  salePercentage,
}: CardProductVerticalProps) => (
    <div className="w-full relative border border-[#E4E8EC] rounded-lg overflow-hidden" onClick={()=>zmp.views.main.router.navigate(`/detail-product/?productId=${productId}&storeId=${storeId}`)} role="button">
      <ImageRatio src={getImgUrl(pathImg)} alt="image product" ratio={1} />
      {salePercentage && (
        <div className="absolute top-2.5 right-2.5 text-white font-medium text-sm px-2 py-1 bg-[#FF9743] w-auto h-auto rounded-lg">
          -{salePercentage}%
        </div>
      )}
      <div className=" p-3">
        <div className="line-clamp-2 text-sm">{nameProduct}</div>
        <div className=" pt-1 font-semibold text-sm text-primary">
          <span className=" font-normal text-xs text-primary">đ</span>
          {convertPrice(salePrice)}
        </div>
      </div>
    </div>
  );

export default CardProductVertical;
