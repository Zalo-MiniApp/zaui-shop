import React, { useEffect, useRef, useState } from "react";
import Page from "zmp-framework/react/page";

import List from "zmp-framework/react/list";
import ListItem from "zmp-framework/react/list-item";
import Box from "zmp-framework/react/box";
import Button from "zmp-framework/react/button";
import { zmp } from "zmp-framework/react/lite";
import { Product, Store } from "../models";
import store from "../store";

import {
  hideNavigationBar,
  showNavigationBar,
} from "../components/navigation-bar";
import { categoriesProductsDummy } from "../dummy/category-products";
import CartItemHorizontal from "../components/cart-item/cart-item-horizontal";
import CategoriesStore from "../components/mini-store/categories-store";
import CardShop from "../components/mini-store/card-shop";
import ButtonFixed from "../components/button-fixed";

const filter = [
  { key: "az", name: "A-Z" },
  { key: "newest", name: "Mới nhất" },
];

const listPickupProduct= {};

const MiniStore = ({zmprouter}) => {
  const [storeInfo, setStoreInfo] = useState<Store>();

  const [activeCate, setActiveCate] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<string>(filter[0].key);
  useEffect(() => {
    const { id } = zmp.views.main.router.currentRoute.query;
    setStoreInfo(store.state.store[parseInt(id!)]);
  }, []);

  const [vlData, setVlData] = useState<{
    items: Product[];
    topPosition: number;
  }>({
    items: [],
    topPosition: 0,
  });

  const renderExternal = (vl, newData) => {
    console.log("newData ", newData);
    setVlData({ ...newData });
  };

  return (
    <Page
      name="MiniStore"
      onPageBeforeIn={hideNavigationBar}
      onPageBeforeOut={showNavigationBar}
    >
      {storeInfo && (
        <>
          <div className=" sticky top-0 bg-primary z-50 mb-3">
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
          <div className="bg-white p-3 mb-[110px]" 
          // onClick={()=>{ console.log('a'); zmprouter.navigate("search-product");}}
          >
            <List
            noHairlines
            noHairlinesBetween
              virtualList
              virtualListParams={{
                items: store.state.productResult,
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
                      <CartItemHorizontal
                        pathImg={item.pathImg}
                        nameProduct={item.nameProduct}
                        salePrice={item.salePrice}
                        retailPrice={item.retailPrice}
                        pickerMode={true}
                        productId={index}
                        storeId={storeInfo.key}
                      />
                    </div>
                  </ListItem>
                ))}
              </ul>
            </List>
          </div>
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
              <div>3 món</div>
              <div className=" w-1 h-1 bg-black rounded-lg mx-3" />
              <div>501000đ</div>
            </Box>
          </Box>
          <ButtonFixed listBtn={[
            {
              content: 'Hoàn tất đơn hàng',
              type: "primary",
              onClick: ()=> console.log('click buy')
            }
          ]}/>
        </>
      )}
    </Page>
  );
};

export default MiniStore;
