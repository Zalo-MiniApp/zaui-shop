import { useEffect, useRef, useState } from "react";
import { Box, Button, Sheet, Text, Title, useStore, zmp } from "zmp-framework/react";
import { Cart, TabType, Booking } from "../../models";
import Notch from "../notch";
import Price from "../format/price";
import { matchStatusBar, useCurrentRoute, useRestaurant } from "../../hooks";
import store from "../../store";
import { pay } from "../../services/zalo";
import { message } from "../../utils/notificaiton";
import CartItem from "./cart-item";

function CartDetail() {
  const cart = useStore('cart') as Cart;
  const edit = (i: number) => {
    zmp.views.main.router.navigate({
      path: '/food-picker/',
      query: {
        cartItemIndex: i
      }
    });
    setTimeout(() => {
      document.querySelector('.sheet-backdrop')?.classList.add('backdrop-in');
    }, 300); // workaround for backdrop not showing
  }

  return <Box m="0" p="2" pt="3" className="overflow-y-auto" style={{ maxHeight: '50vh' }}>
    {cart.items.map((item, i) => <CartItem key={i} item={item} onEdit={() => edit(i)} />)}
  </Box>;
}

function CartPreview() {
  const cart = useStore('cart') as Cart;
  const total = useStore('total') as number;
  const [expaned, setExpanded] = useState(false);
  const [currentRoute] = useCurrentRoute();
  const restaurant = useRestaurant(Number(currentRoute.query?.id));

  const sheetRef = useRef<any>();

  const nextStep = () => {
    sheetRef.current.zmpSheet().stepOpen();
    matchStatusBar(true);
    setExpanded(true);
  }

  useEffect(() => {
    document.querySelector('.sheet-backdrop')?.classList[expaned ? 'add' : 'remove']('backdrop-in');
  }, [expaned])

  const currentTab = useStore('restaurantTab') as TabType;

  const book = () => {
    matchStatusBar(false);
    store.dispatch('changeRestaurantTab', 'book' as TabType)
  }

  const payFoods = async () => {
    await pay(total);
    await store.dispatch('book', {
      id: + new Date() + '',
      restaurant: restaurant,
    } as Booking)
    message('Đặt thức ăn thành công');
    matchStatusBar(false);
    zmp.views.main.router.navigate('/calendar/');
  }

  return <Sheet
    ref={sheetRef}
    backdrop={false}
    opened={cart.items.length > 0 && currentRoute.path === '/restaurant/' && currentTab !== 'book'}
    closeByBackdropClick={false}
    className="h-auto border-t cart-preview"
    swipeToStep
    onSheetStepOpen={() => {
      setExpanded(true);
      matchStatusBar(true);
    }}
    onSheetStepClose={() => {
      setExpanded(false);
      matchStatusBar(false);
    }}
    onSheetClose={() => setExpanded(false)}
    swipeHandler=".swipe-handler"
  >
    <Notch color="#637875" />
    <Box className="swipe-handler" p="1"></Box>
    <div className={`swipe-handler sheet-modal-swipe-step ${expaned ? 'pb-4' : 'pb-6'}`}>
      {expaned && <>
        <Box p="4" flex justifyContent="center"><Title size="small">Pizza</Title></Box>
        <hr />
        <Title size="small" className="mx-6 my-4">Chi tiết</Title>
        <hr />
        <CartDetail />
        <hr />
      </>}
      <Box className="swipe-handler" m="0" px="6" mt="6" flex justifyContent="space-between">
        <Title bold size="small">Tổng cộng ({cart.items.length} món)</Title>
        <Text className="ml-6 text-secondary mb-0" size="xlarge" bold><Price amount={total} /></Text>
      </Box>
      <Box m="0" px="6" pt="6">
        <Button large fill responsive className="rounded-xl" onClick={expaned ? book : nextStep}>
          {expaned ? <span>Đặt bàn với thực đơn</span> : <span>Tiếp theo</span>}
        </Button>
      </Box>
    </div>
    <Box m="0" px="6" pb="6">
      <Button onClick={payFoods} large fill responsive className="rounded-xl" typeName="secondary">Chỉ đặt món ăn</Button>
    </Box>
  </Sheet>;
}

export default CartPreview;