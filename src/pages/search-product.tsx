// import React, { useState } from "react";
import Page from 'zmp-framework/react/page';
import List from 'zmp-framework/react/list';
import ListItem from 'zmp-framework/react/list-item';
import { useEffect, useState } from 'react';
import { useStore } from 'zmp-framework/react';
import CardProductHorizontal from '../components/card-item/card-product-horizontal';
import store from '../store';
import { hideNavigationBar, showNavigationBar } from '../components/navigation-bar';

import { Product } from '../models';
import Card from '../components/card';
import { changeStatusBarColor } from '../services/navigation-bar';
import setHeader from '../services/header';

const SearchProduct = ({ zmproute }) => {
  const [title, setTitle] = useState<string>('');
  const items = [];
  const [vlData, setVlData] = useState<{
    items: Product[];
    topPosition: number;
  }>({
    items: [],
    topPosition: 0,
  });

  const productResult = useStore('productResult');
  const renderExternal = (vl, newData) => {
    setVlData({ ...newData });
  };

  const keyword = useStore('keyword');

  const initialHeader = () => {
    // const textHeader = title || keyword;
    setHeader({ title, type: 'secondary' });
    changeStatusBarColor('secondary');
  };

  useEffect(() => {
    initialHeader();
  }, [keyword, title]);

  useEffect(() => {
    store.dispatch('setProductResult');
    const { title } = zmproute.query;
    setTitle(title);
  }, []);

  return (
    <Page
      onPageBeforeIn={() => {
        hideNavigationBar();
        initialHeader();
      }}
      onPageBeforeOut={showNavigationBar}
      name="search-product"
      className="bg-white"
    >
      <Card title={`${productResult.length} Sản phẩm`}>
        {productResult.length > 0 && (
          <List
            noHairlines
            noHairlinesBetween
            virtualList
            virtualListParams={{
              items: productResult,
              renderExternal,
              height: 104,
            }}
          >
            <ul>
              {vlData.items.map((item) => (
                <ListItem
                  key={item.id}
                  link="#"
                  style={{ top: `${vlData.topPosition}px`, width: '100%' }}
                  // @ts-ignore
                  virtualListIndex={items.indexOf(item)}
                >
                  <div className=" mb-2 w-full">
                    <CardProductHorizontal
                      productId={item.id}
                      storeId={item.storeId}
                      pathImg={item.imgProduct}
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
        )}
      </Card>
    </Page>
  );
};
export default SearchProduct;
