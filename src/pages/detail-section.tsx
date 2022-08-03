import { useMemo, useState } from 'react';
import Page from 'zmp-framework/react/page';
import List from 'zmp-framework/react/list';
import ListItem from 'zmp-framework/react/list-item';
import store from '../store';
import { hideNavigationBar, showNavigationBar } from '../components/navigation-bar';
import getImgUrl from '../utils/img-url';
import CardProductVertical from '../components/card-item/card-product-vertical';
import Card from '../components/card';
import { Product } from '../models';
import { calcSalePercentage, setHeader } from '../utils';

const DetailSection = () => {
  const [vlData, setVlData] = useState<any>({
    items: [],
  });

  const renderExternal = (vl, newData) => {
    setVlData({ ...newData });
  };

  const chunkData = (inputArray: Product[]) => {
    const perChunk = 2; // items per chunk
    const result = inputArray.reduce((resultArray: any, item, index) => {
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

  return (
    <Page
      onPageBeforeIn={() => {
        hideNavigationBar();
        setHeader({ title: 'Hè giảm giá sự kiện', textColor: 'black', headerColor: 'white' });
      }}
      onPageBeforeOut={showNavigationBar}
      name="search-product"
      className="bg-white"
    >
      <img src={getImgUrl('banner')} className="w-full object-cover" alt="" />
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
              {vlData.items.map((items) =>
                items.map((item) => (
                  <div key={item.id}>
                    <ListItem
                      link="#"
                      style={{ top: `${vlData.topPosition}px` }}
                      // @ts-ignore
                      virtualListIndex={items.indexOf(item)}
                    >
                      <div className="w-full">
                        <CardProductVertical
                          pathImg={item.pathImg}
                          nameProduct={item.nameProduct}
                          salePrice={item.salePrice}
                          salePercentage={calcSalePercentage(item.salePrice, item.retailPrice)}
                          productId={item.id}
                          storeId={item.storeId}
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
