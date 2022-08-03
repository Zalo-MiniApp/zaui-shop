import React, { useEffect, useMemo, useState } from 'react';
import { zmp } from 'zmp-framework/react/lite';
import Page from 'zmp-framework/react/page';
import Box from 'zmp-framework/react/box';
import { useStore } from 'zmp-framework/react';
import { hideNavigationBar, showNavigationBar } from '../components/navigation-bar';
import { Product, Store, orderOfStore } from '../models';
import { calcSalePercentage, calcTotalPriceOrder, convertPrice, getImgUrl, setHeader } from '../utils';
import ButtonFixed, { ButtonType } from '../components/button-fixed';

const DetailProduct = ({ zmproute }) => {
  const [product, setProduct] = useState<Product>();
  const [storeInfo, setStoreInfo] = useState<Store>();
  const cart: orderOfStore[] = useStore('cart');
  const listStores: Store[] = useStore('store');

  useEffect(() => {
    const { productId, storeId } = zmproute.query;
    if (listStores && storeId && productId && listStores) {
      const currentStore = listStores.find((store) => store.key === Number(storeId));
      const currentProduct = currentStore!.listProducts.find(
        (product) => product.id === Number(productId)
      );
      currentStore && setStoreInfo(currentStore);
      currentProduct && setProduct(currentProduct);
    }
  }, [listStores]);

  const salePercentage = useMemo(
    () => calcSalePercentage(product?.salePrice!, product?.retailPrice!),
    [product]
  );

  const cartStore: orderOfStore | undefined = useMemo(() => {
    if (storeInfo) {
      const storeInCart = cart.find((currentStore) => currentStore.storeId === storeInfo.key);
      if (storeInCart) return storeInCart;
    }
    return undefined;
  }, [storeInfo, cart]);

  const totalPrice = useMemo(() => {
    if (cartStore) return calcTotalPriceOrder(cartStore.listOrder);
    return 0;
  }, [cartStore, cart]);

  const btnCart: ButtonType = useMemo(
    () => ({
      id: 1,
      content: 'Thêm vào giỏ',
      type: 'primary',
      onClick: () => {
        zmp.views.main.router.navigate({
          path: '/product-picker/',
          query: {
            productId: product?.id,
            storeId: storeInfo?.key,
          },
        });
      },
    }),
    [product, storeInfo]
  );

  const btnPayment: ButtonType = useMemo(
    () => ({
      id: 2,
      content: 'Thanh toán',
      type: 'secondary',
      onClick: () => {
        zmp.views.main.router.navigate({
          path: '/finish-order/',
          query: {
            id: cartStore?.orderId,
          },
        });
      },
    }),
    [cartStore]
  );

  const listBtn = useMemo<ButtonType[]>(
    () => (totalPrice > 0 ? [btnPayment, btnCart] : [btnCart]),
    [totalPrice, btnCart, btnPayment]
  );

  return (
    <Page
      name="Detail Product"
      onPageBeforeIn={() => {
        hideNavigationBar();
        setHeader({ title: '' });
      }}
      onPageBeforeOut={showNavigationBar}
      className=""
    >
      <div className=" relative bg-white mb-[80px]">
        {product && (
          <>
            <img src={getImgUrl(product!.pathImg)} alt="" className="w-full h-auto" />
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
            <Box m={0} px={4} py={5} className=" text-justify break-words whitespace-pre-line">
              {product.description}
            </Box>
          </>
        )}
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
            <div>{cartStore?.listOrder.length} món</div>
            <div className=" w-1 h-1 bg-black rounded-lg mx-3" />
            <div>{convertPrice(totalPrice)}</div>
          </Box>
        </Box>
      )}

      <ButtonFixed listBtn={listBtn} />
    </Page>
  );
};

export default DetailProduct;
