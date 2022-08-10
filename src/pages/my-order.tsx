import { Button, useStore } from 'zmp-framework/react';
import Box from 'zmp-framework/react/box';
import Page from 'zmp-framework/react/page';
import { useEffect, useState } from 'react';
import api from 'zmp-sdk';
import { Store, orderOfStore } from '../models';
import CardStore from '../components/card-item/card-store';
import { OrderStatusRef } from '../constants/referrence';
import { cx } from '../utils';
import Swipeable from '../components/swipeable';
import store from '../store';
import { changeStatusBarColor } from '../services/navigation-bar';
import setHeader from '../services/header';

const MyOrder = ({ zmprouter }) => {
  const cart: orderOfStore[] = useStore('cart');
  const stores: Store[] = useStore('store');
  const [selectingState, setSelectingState] = useState<number>(-1);
  const deleteCart = (orderId: number) => {
    store.dispatch('deleteCart', orderId);
  };

  const getStore = (cart: orderOfStore) => {
    const store: Store | undefined = stores.find((store) => store.id === cart.storeId);
    return store;
  };

  return (
    <Page
      ptr
      name="my-order"
      onPageBeforeIn={() => {
        setHeader({
          title: 'Đơn đặt hàng',
          hasLeftIcon: false,
          type: 'secondary',
        });
        changeStatusBarColor('secondary');
      }}
    >
      <Box m={0} p={4} flex justifyContent="center" className="bg-white">
        Số lượng đơn hàng: {cart.length}
      </Box>
      <Box m={0} pb={0} pt={4} className="bg-white">
        {cart.map((cart) => (
          <Box m={0} flex alignItems="center" key={cart.orderId}>
            <Swipeable
              onSwipeLeft={() => setSelectingState(cart.orderId)}
              onSwipeRight={() => setSelectingState(-1)}
              className="bg-white rounded-xl relative duration-200 w-full z-10"
              style={{
                left: selectingState === cart.orderId ? -74 : 0,
              }}
            >
              <CardStore
                store={getStore(cart)!}
                handleOnClick={() =>
                  zmprouter.navigate(`/finish-order/?id=${cart.orderId}`, {
                    transition: 'zmp-fade',
                  })
                }
                hasBorderBottom={false}
                type="order"
                className="p-3"
                customRightSide={
                  <div className=" text-right">
                    <div className="text-sm pb-3">
                      {cart.date.toLocaleString('en-GB', { timeZone: 'UTC' }).split(',')[0]}
                    </div>
                    <div
                      className={cx(
                        'font-medium text-sm',
                        cart.status === 'pending' ? 'text-primary' : ' text-gray-500'
                      )}
                    >
                      {OrderStatusRef[cart.status]}
                    </div>
                  </div>
                }
              />
            </Swipeable>
            <Button
              onClick={() => deleteCart(cart.orderId)}
              typeName="primary"
              className={cx(
                'absolute right-4 rounded-[100px]',
                selectingState === cart.orderId ? 'opacity-100' : 'opacity-0'
              )}
            >
              Huỷ
            </Button>
          </Box>
        ))}
      </Box>
    </Page>
  );
};

export default MyOrder;
