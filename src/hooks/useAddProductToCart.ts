import { useRecoilState } from "recoil";
import { useCallback } from "react";
import { CartProduct } from "../models";
import { cartState } from "../state";

const useAddProductToCart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  return useCallback(
    ({ productOrder }: { productOrder: CartProduct }) => {
      setCart((oldCart) => {
        const cart = { ...oldCart };
        const orderIndex = cart.listOrder.findIndex(
          (prod) => prod.id === productOrder.id
        );
        if (orderIndex >= 0) {
          // available in cart
          cart.listOrder = [...cart.listOrder];
          if (productOrder.order.quantity === 0) {
            // delete product in cart
            cart.listOrder.splice(orderIndex, 1);
          } else {
            cart.listOrder.splice(orderIndex, 1, {
              ...cart.listOrder[orderIndex],
              order: productOrder.order,
            });
          }
        } else if (productOrder.order.quantity > 0) {
          cart.listOrder = cart.listOrder.concat({ ...productOrder });
        }
        cart.date = new Date();
        return cart;
      });
    },
    [cart]
  );
};
export default useAddProductToCart;
