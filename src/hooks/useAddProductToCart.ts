import { useRecoilState } from 'recoil';
import { useCallback } from 'react';
import { CartProduct } from '../models';
import { cartState } from '../state';

const useAddProductToCart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  return useCallback(
    ({ storeId, productOrder }: { storeId: number; productOrder: CartProduct }) => {
      const newCart = JSON.parse(JSON.stringify(cart));
      const indexStore = newCart.findIndex((cart) => cart.storeId === storeId);
      if (indexStore < 0) {
        if (productOrder.order.quantity > 0) {
          newCart.push({
            orderId: newCart.length,
            date: new Date(),
            storeId,
            status: 'pending',
            listOrder: [{ ...productOrder } as CartProduct],
          });
          setCart([...newCart]);
        }
      } else {
        const { listOrder } = newCart[indexStore];
        const indexOrder = listOrder.findIndex((prod) => prod.id === productOrder.id);

        if (indexOrder >= 0) {
          // available in cart
          if (productOrder.order.quantity === 0) {
            // delete product in cart
            const filtered = listOrder.filter((product) => product.id !== productOrder.id);
            newCart[indexStore].listOrder = filtered;
            if (filtered.length === 0) {
              // delete cart item
              newCart.splice(indexStore, 1);
            }
          } else listOrder[indexOrder].order = productOrder.order;
        } else if (productOrder.order.quantity > 0) {
          listOrder.push({ ...productOrder });
        }

        if (newCart[indexStore]) newCart[indexStore].date = new Date();
        setCart([...newCart]);
      }
    },
    [cart]
  );
};
export default useAddProductToCart;
