import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { calcSalePercentage, calcTotalPriceOrder } from "../utils/math";
import ButtonFixed, { ButtonType } from "../components/button-fixed";
import store, { orderOfStore } from "../store";
import { Store } from "zmp-framework";
import { Button, useStore } from "zmp-framework/react";

const DetailProduct = ({ zmproute }) => {
  const [product, setProduct] = useState<Product>();
  const [productId, setProductId] = useState();
  const [storeId, setStoreId] = useState();
  const cart = useStore("cart");

  useEffect(() => {
    const { productId, storeId } = zmproute.query;
    if (productId) {
      setProductId(productId);
      setProduct(productResultDummy[Number(productId)]);
    }
    if (storeId) setStoreId(storeId);
  }, []);

  const salePercentage = useMemo(
    () => calcSalePercentage(product?.salePrice, product?.retailPrice),
    [product]
  );

  const cartStore: orderOfStore = useMemo(() => {
    const indexStore = cart.findIndex((store) => store.storeId == storeId);
    if (indexStore >= 0) {
      return cart[indexStore];
    } else return undefined;
  }, [storeId, cart]);

  const totalPrice = useMemo(() => {
    if (cartStore) return calcTotalPriceOrder(cartStore.listOrder);
    else return 0;
  }, [cartStore, cart]);

  const btnCart: ButtonType = useMemo(() => {
    return {
      content: "Thêm vào giỏ",
      type: "primary",
      onClick: () => {
        console.log(zmp, zmp.views.main.router.navigate);
        zmp.views.main.router.navigate({
          path: "/product-picker/",
          query: {
            productId,
            storeId
          },
        });
      },
    };
  }, [productId, storeId]);

  const btnPayment: ButtonType = useMemo(() => {
    return {
      content: "Thanh toán",
      type: "secondary",
      onClick: () => {
        // zmp.views.main.router.navigate({
        //   path: "/product-picker/",
        //   query: {
        //     productId,
        //     storeId,
        //   },
        // });
      },
    };
  }, [productId]);

  const listBtn = useMemo<ButtonType[]>(
    () => (totalPrice > 0 ? [btnPayment, btnCart] : [btnCart]),
    [totalPrice, btnCart, btnPayment]
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
          <img
            src={imgUrl(product!.pathImg)}
            alt=""
            className="w-full h-auto"
          />
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
        <Box
          m={0}
          px={4}
          py={5}
          className=" text-justify break-words whitespace-pre-line"
        >
          {product?.description}
        </Box>
      </div>

      {totalPrice && (
        <Box
          px={4}
          py={3}
          flex
          justifyContent="space-between"
          alignItems="center"
          className=" bg-gray-300 rounded-primary fixed bottom-20 left-0 right-0 z-50"
        >
          <div>Đơn hàng</div>
          <Box m={0} flex justifyContent="space-around" alignItems="center">
            <div>{cartStore.listOrder.length} món</div>
            <div className=" w-1 h-1 bg-black rounded-lg mx-3" />
            <div>{totalPrice.toString()}</div>
          </Box>
        </Box>
      )}

      <ButtonFixed listBtn={listBtn}></ButtonFixed>
    </Page>
  );
};

export default DetailProduct;
