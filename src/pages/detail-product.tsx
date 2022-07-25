import React, { useEffect, useMemo, useState } from "react";
import { zmp } from "zmp-framework/react/lite";
import Page from "zmp-framework/react/page";
import Box from "zmp-framework/react/box";
import ImageRatio from "../components/img-ratio";
import {
  hideNavigationBar,
  showNavigationBar,
} from "../components/navigation-bar";
import { productResultDummy } from "../dummy/product-result";
import { Product } from "../models";
import { imgUrl } from "../utils/imgUrl";
import { calcSalePercentage } from "../utils/math";
import ButtonFixed from "../components/button-fixed";

const DetailProduct = () => {
  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    const { id } = zmp.views.main.router.currentRoute.query;
    console.log(id);
    if (id) setProduct(productResultDummy[parseInt(id)]);
  }, []);
  console.log(product);

  const salePercentage = useMemo(
    () => calcSalePercentage(product?.salePrice, product?.retailPrice),
    [product]
  );

  return (
    <Page
      name="Detail Product"
      onPageBeforeIn={hideNavigationBar}
      onPageBeforeOut={showNavigationBar}
      className=""
    >
      <div className=" relative bg-white mb-[80px]">
        {product && (
            <img src={imgUrl(product!.pathImg)} alt="" className="w-full h-auto"/>
        //   <ImageRatio src={imgUrl(product!.pathImg)} alt="" ratio={1} />
        )}
        {salePercentage && (
          <div className="absolute top-2.5 right-2.5 text-white font-medium text-sm px-2 py-1 bg-[#FF9743] w-auto h-auto rounded-lg">
            -{salePercentage}%
          </div>
        )}
        <Box m={0} p={4} className="border-b">
          <div className=" text-lg">{product?.nameProduct}</div>
          <span className=" pt-1 font-semibold text-base text-primary">
            <span className=" font-normal text-xs text-primary">đ</span>
            {product?.salePrice}
          </span>
          <span className=" pl-2 pt-1 font-medium text-sm text-zinc-400">
            đ{product?.retailPrice}
          </span>
        </Box>
        <Box m={0} px={4} py={5} className=" text-justify break-words whitespace-pre-line">
          {product?.description}
        </Box>
      </div>
      <ButtonFixed
        listBtn={[
          {
            content: "Thêm vào giỏ",
            type: "primary",
            onClick: () => {
                
            },
          },
          
        ]}
      />
    </Page>
  );
};

export default DetailProduct;
