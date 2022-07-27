import { useMemo, useState } from "react";
import Page from "zmp-framework/react/page";
import Box from "zmp-framework/react/box";
import CartItemHorizontal from "../components/cart-item/cart-item-horizontal";
import List from "zmp-framework/react/list";
import ListItem from "zmp-framework/react/list-item";
import store from "../store";
import {
  hideNavigationBar,
  showNavigationBar,
} from "../components/navigation-bar";

import { imgUrl } from "../utils/imgUrl";
import CartItemVertical from "../components/cart-item/cart-item-vertical";
import Card from "../components/card";

const DetailSection = () => {
  const items = [];
  const [vlData, setVlData] = useState<any>({
    items: [],
  });

  const renderExternal = (vl, newData) => {
    setVlData({ ...newData });
  };

  const chunkData = (inputArray) => {
    const perChunk = 2; // items per chunk
    const result = inputArray.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);
    return result;
  };

  const nomalizeData = useMemo(
    () => chunkData(store.state.productResult),
    [store.state.productResult]
  );

  const calcSalePercentage = (salePrice, retailPrice) => {
    return Math.floor((1 - parseInt(salePrice) / parseInt(retailPrice)) * 100);
  };
  return (
    <Page
      onPageBeforeIn={hideNavigationBar}
      onPageBeforeOut={showNavigationBar}
      name="search-product"
      className="bg-white"
    >
      <img src={imgUrl("banner")} className="w-full object-cover" />
      <Card title="365 Sản phẩm">
        <List
        noHairlines
        noHairlinesBetween
          virtualList
          virtualListParams={{
            items: nomalizeData,
            renderExternal,
            height: 300,
          }}
        >
          <ul>
            <div className="gap-2 grid grid-cols-2">
              {vlData.items.map((items, index) =>
                items.map((item, index) => (
                  <div key={index}>
                    <ListItem
                      key={index}
                      link="#"
                      style={{ top: `${vlData.topPosition}px` }}
                      // @ts-ignore
                      virtualListIndex={items.indexOf(item)}
                    >
                      <div className="w-full">
                        <CartItemVertical
                          pathImg={item.pathImg}
                          nameProduct={item.nameProduct}
                          salePrice={item.salePrice}
                          salePercentage={calcSalePercentage(
                            item.salePrice,
                            item.retailPrice
                          )}
                        />
                      </div>
                    </ListItem>
                  </div>
                ))
              )}
            </div>
          </ul>
        </List>
      </Card>
    </Page>
  );
};
export default DetailSection;
