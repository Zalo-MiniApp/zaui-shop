import React, { ReactNode } from "react";
import Box from "zmp-framework/react/box";
import { SectionProductsProps } from "../../models";
import cx from "../../utils/cx";
import { imgUrl } from "../../utils/imgUrl";
import { calcSalePercentage } from "../../utils/math";
import CardProductVertical from "../card-item/card-product-vertical";

const SectionProducts = ({
  title,
  pathBanner,
  watchMore = true,
  direction = "horizontal",
  colPercentage = 36,
  children,
  data = [],
  onChoose,
}: SectionProductsProps) => {

  return (
    <div className="pt-4 bg-gray-100" >
      <Box m={"0"} className="bg-white" p={"4"}>
        <div className="flex flex-row justify-between items-center pb-3.5">
          <span className="text-base text-primary font-semibold">{title}</span>
          {watchMore && (
            <span className="text-sm text-[#828588]" onClick={onChoose}>Xem tất cả</span>
          )}
        </div>
        {pathBanner && (
          <img
            src={imgUrl(pathBanner!)}
            className="pb-[14px] w-full h-auto object-contain"
          />
        )}
        <div
          className={cx(
            "gap-2",
            direction === "vertical"
              ? "grid grid-cols-2"
              : "flex flex-row overflow-x-auto"
          )}
        >
          {data.map((item, index) => (
            <div
              key={index}
              className={direction === "horizontal" ? "flex-none" : ""}
              style={{
                width: `${direction === "vertical" ? 100 : colPercentage}%`,
              }}
            >
              {children ? (
                children(item)
              ) : (
                <CardProductVertical
                  pathImg={item.pathImg}
                  nameProduct={item.nameProduct}
                  salePrice={item.salePrice}
                  salePercentage={calcSalePercentage(
                    item.salePrice,
                    item.retailPrice
                  )}
                  productId={item.id}
                  storeId={item.storeId}
                />
              )}
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default SectionProducts;
