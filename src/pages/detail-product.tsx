import React, { useEffect, useMemo } from "react";
import { Product } from "../models";
import { calcSalePercentage, convertPrice } from "../utils";
import ButtonFixed, {
  ButtonType,
} from "../components/button-fixed/button-fixed";
import ButtonPriceFixed from "../components/button-fixed/button-price-fixed";
import { Box, Icon, Page } from "zmp-ui";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  cartState,
  cartTotalPriceState,
  openProductPickerState,
  productInfoPickedState,
  storeState,
} from "../state";

import { useParams, useNavigate } from "react-router-dom";
import { changeStatusBarColor } from "../services";
import useSetHeader from "../hooks/useSetHeader";
import { openShareSheet } from "zmp-sdk";

const DetailProduct = () => {
  const storeInfo = useRecoilValue(storeState);
  const cart = useRecoilValue(cartState);
  const totalPrice = useRecoilValue(cartTotalPriceState);

  let { productId } = useParams();

  const setOpenSheet = useSetRecoilState(openProductPickerState);
  const setProductInfoPicked = useSetRecoilState(productInfoPickedState);

  const navigate = useNavigate();
  const setHeader = useSetHeader();

  const product: Product | undefined = useMemo(() => {
    if (storeInfo) {
      const currentProduct = storeInfo.listProducts.find(
        (item) => item.id === Number(productId)
      );
      return currentProduct;
    }
    return undefined;
  }, [productId]);

  const salePercentage = useMemo(
    () => calcSalePercentage(product?.salePrice!, product?.retailPrice!),
    [product]
  );

  const btnCart: ButtonType = useMemo(
    () => ({
      id: 1,
      content: "Thêm vào giỏ",
      type: "primary",
      onClick: () => {
        setOpenSheet(true);
        setProductInfoPicked({ productId: Number(productId), isUpdate: true });
      },
    }),
    [product, storeInfo, productId]
  );

  const btnPayment: ButtonType = useMemo(
    () => ({
      id: 2,
      content: "Thanh toán",
      type: "secondary",
      onClick: () => {
        navigate("/finish-order");
      },
    }),
    [cart]
  );

  const listBtn = useMemo<ButtonType[]>(
    () => (totalPrice > 0 ? [btnPayment, btnCart] : [btnCart]),
    [totalPrice, btnCart, btnPayment]
  );

  useEffect(() => {
    setHeader({
      title: "",
      rightIcon: (
        <div
          onClick={() =>
            openShareSheet({
              type: "zmp",
              data: {
                path: "/",
                title: product?.nameProduct,
                description: product?.description.slice(0, 100),
                thumbnail: product?.imgProduct,
              },
            })
          }
        >
          <Icon icon="zi-share-external-1" />
        </div>
      ),
    });
    changeStatusBarColor();
  }, []);
  return (
    <Page>
      <div
        className=" relative bg-white w-full"
        style={{ paddingBottom: totalPrice > 0 ? "120px" : "80px" }}
      >
        {product && (
          <>
            <img src={product.imgProduct} alt="" className="w-full h-auto" />
            {salePercentage && (
              <div className="absolute top-2.5 right-2.5 text-white font-medium text-sm px-2 py-1 bg-[#FF9743] w-auto h-auto rounded-lg">
                -{salePercentage}%
              </div>
            )}
            <Box m={0} p={4} className="border-b">
              <div className=" text-lg">{product?.nameProduct}</div>
              <span className=" pt-1 font-semibold text-base text-primary">
                <span className=" font-normal text-xs text-primary">đ</span>
                {convertPrice(product.salePrice)}
              </span>
              <span className=" pl-2 pt-1 font-medium text-sm text-zinc-400">
                đ{convertPrice(product.retailPrice)}
              </span>
            </Box>
            <Box
              m={0}
              px={4}
              py={5}
              className=" text-justify break-words whitespace-pre-line"
            >
              {product.description}
            </Box>
          </>
        )}
      </div>

      {!!totalPrice && (
        <ButtonPriceFixed
          quantity={cart.listOrder.length}
          totalPrice={totalPrice}
          handleOnClick={() => navigate("/finish-order")}
        />
      )}
      <ButtonFixed listBtn={listBtn} />
    </Page>
  );
};

export default DetailProduct;
