// import React, { useState } from "react";
import Page from 'zmp-framework/react/page';
import List from 'zmp-framework/react/list';
import ListItem from 'zmp-framework/react/list-item';
import { useEffect, useState } from 'react';
import { useStore } from 'zmp-framework/react';
import CardProductHorizontal from '../components/card-item/card-product-horizontal';
import store from '../store';
import { hideNavigationBar, showNavigationBar } from '../components/navigation-bar';

import { HeaderType, Product } from '../models';
import Card from '../components/card';
import { setHeader } from '../utils';

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

  const keyword = useStore('keyword');

  useEffect(() => {
    setHeader({ title: keyword, headerColor: 'white', textColor: 'black' });
  }, [keyword]);

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
            {vlData.items.map((item) => (
              <ListItem
                key={item.id}
                link="#"
                style={{ top: `${vlData.topPosition}px` }}
                // @ts-ignore
                virtualListIndex={items.indexOf(item)}
              >
                <div className=" mb-2">
                  <CardProductHorizontal
                    productId={item.id}
                    storeId={item.storeId}
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
