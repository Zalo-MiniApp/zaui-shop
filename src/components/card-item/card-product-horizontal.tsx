import React, { useState } from "react";
import { imgUrl } from "../../utils/imgUrl";
import ImageRatio from "../img-ratio";
import Box from "zmp-framework/react/box";
import Icon from "zmp-framework/react/icon";
import { zmp } from "zmp-framework/react/lite";

type CardProductHorizontalProps = {
  productId: number;
  storeId: number;
  pathImg: string;
  nameProduct: string;
  salePrice: number | string;
  retailPrice: number | string;
  pickerMode?: boolean;
};
const CardProductHorizontal = ({
  productId,
  storeId,
  pathImg,
  nameProduct,
  salePrice,
  retailPrice,
  pickerMode = false,
}: CardProductHorizontalProps) => {
  const [quantity, setQuantity] = useState<number>(0);
  return (
    <div
      className="w-full flex flex-row items-center justify-between border border-[#E4E8EC] rounded-lg overflow-hidden h-24"
      onClick={() => {
        zmp.views.main.router.navigate(
          `/detail-product/?productId=${productId}&storeId=${storeId}`,
          { animate: false }
        );
      }}
    >
      <div className="flex flex-row items-center">
        <div className="w-24 flex-none">
          <ImageRatio src={imgUrl(pathImg)} alt={"image product"} ratio={1} />
        </div>
        <div className=" p-3 pr-0">
          <div className="line-clamp-2 text-sm break-words">{nameProduct}</div>
          <span className=" pt-1 font-semibold text-sm text-primary">
            <span className=" font-normal text-xs text-primary">đ</span>
            {salePrice}
          </span>
          <span className=" pl-2 pt-1 font-medium text-xs text-zinc-400">
            đ{retailPrice}
          </span>
        </div>
      </div>
      {pickerMode ? (
        <Box
          mt="6"
          mb="5"
          flex
          justifyContent="center"
          alignItems="center"
          p={0}
        >
          <div
            className="w-6 h-6 rounded-full bg-primary flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
              zmp.views.main.router.navigate(
                {
                  path: "/product-picker/",
                  query: {
                    productId,
                    storeId,
                  },
                },
              );
            }}
          >
            <Icon zmp="zi-plus" size={16} className="text-white" />
          </div>
        </Box>
      ) : (
        <Icon size={20} zmp="zi-chevron-right" className=" text-zinc-500 m-3" />
      )}
    </div>
  );
};

export default CardProductHorizontal;
