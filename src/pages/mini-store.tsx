import { SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Page from 'zmp-framework/react/page';

import List from 'zmp-framework/react/list';
import ListItem from 'zmp-framework/react/list-item';
import Box from 'zmp-framework/react/box';
import Searchbar from 'zmp-framework/react/searchbar';
import { zmp } from 'zmp-framework/react/lite';
import { useStore } from 'zmp-framework/react';
import { Product, Store, orderOfStore } from '../models';
import store from '../store';
import { hideNavigationBar, showNavigationBar } from '../components/navigation-bar';
import CardProductHorizontal from '../components/card-item/card-product-horizontal';
import CategoriesStore from '../components/mini-store/categories-store';
import CardShop from '../components/mini-store/card-shop';
import ButtonFixed from '../components/button-fixed/button-fixed';
import { calcTotalPriceOrder } from '../utils';
import ButtonPriceFixed from '../components/button-fixed/button-price-fixed';
import { changeStatusBarColor } from '../services/navigation-bar';
import setHeader from '../services/header';

const filter = [
  { key: 'az', name: 'A-Z' },
  { key: 'newest', name: 'Mới nhất' },
];

const MiniStore = ({ zmprouter }) => {
  const [storeInfo, setStoreInfo] = useState<Store>();
  const [activeCate, setActiveCate] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<string>(filter[0].key);
  const cart: orderOfStore[] = useStore('cart');
  const storeProductResult = useStore('storeProductResult');
  const vlInstance = useRef<any>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const { id } = zmp.views.main.router.currentRoute.query;
    setStoreInfo(store.state.store[Number(id!)]);
    store.dispatch('setStoreProductResult', Number(id!));
  }, [isVisible]);

  const [vlData, setVlData] = useState<{
    items: Product[];
    topPosition: number;
  }>({
    items: [],
    topPosition: 0,
  });

  const cartStore: orderOfStore | undefined = useMemo(() => {
    if (storeInfo) {
      const indexStore = cart.findIndex((store) => store.storeId === storeInfo.id);
      if (indexStore >= 0) {
        return { ...cart[indexStore] };
      }
    }
    return undefined;
  }, [storeInfo, cart]);

  const totalPrice = useMemo<Number>(() => {
    if (cartStore) return calcTotalPriceOrder(cartStore.listOrder);
    return 0;
  }, [cartStore]);

  const renderExternal = (vl, newData) => {
    setVlData({ ...newData });
  };

  const handleInputSearch = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      e.target[0].blur();
      store.dispatch('setStoreProductResult', storeInfo!.id);
    },
    [storeInfo]
  );

  const searchBar = useMemo(
    () => (
      <Searchbar
        className="w-full rounded-xl"
        placeholder="Tìm kiếm sản phẩm"
        onSubmit={handleInputSearch}
      />
    ),
    [storeInfo]
  );

  const initialHeader = () => {
    setHeader({
      customTitle: searchBar,
      type: 'secondary',
    });
    changeStatusBarColor('secondary');
  };

  useEffect(() => {
    if (isVisible) initialHeader();
  }, [storeInfo, isVisible]);

  useEffect(() => {
    // update new list items for virtual list
    if (vlInstance.current) {
      const virtualList = vlInstance.current.zmpVirtualList();
      virtualList.replaceAllItems(storeProductResult);
    }
  }, [storeProductResult]);

  return (
    <Page
      name="MiniStore"
      onPageBeforeIn={() => {
        hideNavigationBar();
        setIsVisible(true);
      }}
      onPageBeforeOut={() => {
        showNavigationBar();
        setIsVisible(false);
      }}
      className="w-full bg-white"
    >
      {storeInfo && storeProductResult && (
        <>
          <div className="bg-primary">
            <CardShop storeInfo={storeInfo} />
            <CategoriesStore
              categories={storeInfo.categories!}
              activeCate={activeCate}
              setActiveCate={(index) => setActiveCate(index)}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              filter={filter}
              quantity={storeProductResult.length}
              storeId={storeInfo.id}
            />
          </div>
          <Box m={0} className="bg-gray-100 h-3" />
          <div
            className="bg-white p-3 mt-3"
            style={{ marginBottom: totalPrice > 0 ? '120px' : '0px' }}
          >
            <List
              ref={vlInstance}
              noHairlines
              noHairlinesBetween
              virtualList
              virtualListParams={{
                items: storeProductResult,
                renderExternal,
                height: 104,
              }}
            >
              <ul>
                {vlData.items.map((item) => (
                  <ListItem key={item.id} link="#" style={{ top: `${vlData.topPosition}px` }}>
                    <div className=" mb-2 w-full">
                      <CardProductHorizontal
                        pathImg={item.imgProduct}
                        nameProduct={item.nameProduct}
                        salePrice={item.salePrice}
                        retailPrice={item.retailPrice}
                        // eslint-disable-next-line react/jsx-boolean-value
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
              <ButtonPriceFixed
                quantity={cartStore!.listOrder.length}
                totalPrice={totalPrice}
                handleOnClick={() => zmprouter.navigate(`/finish-order/?id=${cartStore!.orderId}`)}
              />
              <ButtonFixed
                listBtn={[
                  {
                    id: 1,
                    content: 'Hoàn tất đơn hàng',
                    type: 'primary',
                    onClick: () => zmprouter.navigate(`/finish-order/?id=${cartStore!.orderId}`),
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
