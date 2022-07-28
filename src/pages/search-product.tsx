// import React, { useState } from "react";
import Page from "zmp-framework/react/page";
import Box from "zmp-framework/react/box";
import CardProductHorizontal from "../components/card-item/card-product-horizontal";
import List from "zmp-framework/react/list";
import ListItem from "zmp-framework/react/list-item";
import Avatar from "zmp-framework/react/avatar";
import store from "../store";
import {
  hideNavigationBar,
  showNavigationBar,
} from "../components/navigation-bar";

import { useState } from "react";
import { Product } from "../models";
import Card from "../components/card";

const SearchProduct = () => {
  const items = [];
  const [vlData, setVlData] = useState<{
    items: Product[];
    topPosition: number;
  }>({
    items: [],
    topPosition: 0,
  });

  const renderExternal = (vl, newData) => {
    setVlData({ ...newData });
  };
  return (
    <Page
      onPageBeforeIn={hideNavigationBar}
      onPageBeforeOut={showNavigationBar}
      name="search-product"
      className="bg-white"
    >
      <Card title="365 Sản phẩm">
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
                // @ts-ignore
                virtualListIndex={items.indexOf(item)}
              >
                <div className=" mb-2">
                  <CardProductHorizontal
                    productId={index}
                    pathImg={item.pathImg}
                    nameProduct={item.nameProduct}
                    salePrice={item.salePrice}
                    retailPrice={item.retailPrice}
                    pickerMode={false}
                  />
                </div>
              </ListItem>
            ))}
          </ul>
        </List>
      </Card>
    </Page>
  );
};
export default SearchProduct;
