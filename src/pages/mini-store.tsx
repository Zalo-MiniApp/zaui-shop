import React, { useEffect, useMemo, useRef, useState } from "react";
import Page from "zmp-framework/react/page";

import List from "zmp-framework/react/list";
import ListItem from "zmp-framework/react/list-item";
import Box from "zmp-framework/react/box";
import Searchbar from "zmp-framework/react/searchbar";
import Icon from "zmp-framework/react/icon";
import Button from "zmp-framework/react/button";
import { zmp } from "zmp-framework/react/lite";
import { Product, Store } from "../models";
import store, { orderOfStore } from "../store";

import {
  hideNavigationBar,
  showNavigationBar,
} from "../components/navigation-bar";
import { categoriesProductsDummy } from "../dummy/category-products";
import CardProductHorizontal from "../components/card-item/card-product-horizontal";
import CategoriesStore from "../components/mini-store/categories-store";
import CardShop from "../components/mini-store/card-shop";
import ButtonFixed from "../components/button-fixed";
import { useStore } from "zmp-framework/react";
import { calcTotalPriceOrder } from "../utils/math";
import { matchStatusBar } from "../hooks";

const filter = [
  { key: "az", name: "A-Z" },
  { key: "newest", name: "Mới nhất" },
];

const MiniStore = ({ zmprouter }) => {
  const [storeInfo, setStoreInfo] = useState<Store>();

  const [activeCate, setActiveCate] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<string>(filter[0].key);
  const cart = useStore("cart");

  useEffect(() => {
    const { id } = zmp.views.main.router.currentRoute.query;
    setStoreInfo(store.state.store[Number(id!)]);
    matchStatusBar(true);
  }, []);

  const [vlData, setVlData] = useState<{
    items: Product[];
    topPosition: number;
  }>({
    items: [],
    topPosition: 0,
  });

  const cartStore: orderOfStore = useMemo(() => {
    const indexStore = cart.findIndex(
      (store) => store.storeId == storeInfo?.key
    );
    if (indexStore >= 0) {
      return { ...cart[indexStore] };
    } else return undefined;
  }, [storeInfo, cart]);

  const totalPrice = useMemo(() => {
    if (cartStore) return calcTotalPriceOrder(cartStore.listOrder);
    else return 0;
  }, [cartStore]);

  const renderExternal = (vl, newData) => {
    setVlData({ ...newData });
  };

  const handleInputSearch = (e) => {
    console.log(e.target[0].value);
  };

  return (
    <Page
      name="MiniStore"
      onPageBeforeIn={() => {
        hideNavigationBar();
        matchStatusBar(true);
      }}
      onPageBeforeOut={() => {
        showNavigationBar();
        matchStatusBar(false);
      }}
      className="w-full bg-white"
    >
      {storeInfo && (
        <>
          <div className=" sticky top-0 z-50 w-full bg-white">
            <Box
              flex
              justifyContent={"space-between"}
              alignItems="center"
              className=" bg-white gap-2 p-2"
              m={0}
              style={{
                width: "calc(100vw - 110px)",
              }}
            >
              <Icon
                zmp="zi-arrow-left"
                className=" text-gray-500"
                onClick={() => zmprouter.navigate("/",{animate: false})}
              />
              <Searchbar
                className="w-full rounded-xl"
                placeholder="Tìm kiếm sản phẩm"
                onSubmit={handleInputSearch}
              />
            </Box>
          </div>

          <div className=" bg-primary">
            <CardShop storeInfo={storeInfo} />
            <CategoriesStore
              categories={storeInfo.categories!}
              activeCate={activeCate}
              setActiveCate={(index) => setActiveCate(index)}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              filter={filter}
            />
          </div>
          <Box m={0} className="bg-gray-100 h-3" />
          <div
            className="bg-white p-3 mb-[120px]"
          >
            <List
              noHairlines
              noHairlinesBetween
              virtualList
              virtualListParams={{
                items: storeInfo?.listProducts,
                renderExternal,
                height: 104,
              }}
            >
              <ul>
                {vlData.items.map((item, index) => (
                  <ListItem
                    key={index}
                    link="#"
                    style={{ top: `${vlData.topPosition}px` }}
                  >
                    <div className=" mb-2 w-full">
                      <CardProductHorizontal
                        pathImg={item.pathImg}
                        nameProduct={item.nameProduct}
                        salePrice={item.salePrice}
                        retailPrice={item.retailPrice}
                        pickerMode={true}
                        productId={item.id}
                        storeId={item.storeId}
                      />
                    </div>
                  </ListItem>
                ))}
              </ul>
            </List>
          </div>
          {totalPrice > 0 && (
            <>
              {" "}
              <Box
                px={4}
                py={3}
                flex
                justifyContent="space-between"
                alignItems="center"
                className=" bg-gray-300 rounded-primary fixed bottom-20 left-0 right-0 z-50"
              >
                <div>Đơn hàng</div>
                <Box
                  m={0}
                  flex
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <div>{cartStore.listOrder.length} món</div>
                  <div className=" w-1 h-1 bg-black rounded-lg mx-3" />
                  <div>{totalPrice.toString()}</div>
                </Box>
              </Box>
              <ButtonFixed
                listBtn={[
                  {
                    content: "Hoàn tất đơn hàng",
                    type: "primary",
                    onClick: () =>
                      zmprouter.navigate(`/finish-order/?id=${cartStore.orderId}`, {animate: false}),
                  },
                ]}
              />
            </>
          )}
        </>
      )}
    </Page>
  );
};

export default MiniStore;
