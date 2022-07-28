import { useStore } from "zmp-framework/react";
import Box from "zmp-framework/react/box";
import Page from "zmp-framework/react/page";
import Searchbar from "zmp-framework/react/searchbar";
import Icon from "zmp-framework/react/icon";
import { Store } from "../models";
import { orderOfStore } from "../store";
import CardStore from "../components/card-item/card-store";
import { OrderStatusRef } from "../constants/referrence";

const MyOrder = ({ zmprouter }) => {
  const handleSearchOA = (e) => {
    console.log(e.target[0].value);
  };
  const cart: orderOfStore[] = useStore("cart");
  const stores: Store[] = useStore("store");

  console.log("cart: ", cart);
  return (
    <Page ptr name="my-order">
      <Box m={0} p={4} flex justifyContent={"center"} className="bg-white">
        Số lượng đơn hàng: {cart.length}
      </Box>
      <Box m={0} pb={0} pt={4} className="bg-white">
        {cart.map((store, index) => (
          <CardStore
            key={index}
            store={stores[store.storeId]}
            handleOnClick={() =>
              zmprouter.navigate(`/finish-order/?id=${store.orderId}`)
            }
            type="order"
            className="p-3"
            customRightSide={
              <div className=" text-right">
                <div className="text-sm pb-3">
                  {
                    store.date
                      .toLocaleString("en-GB", { timeZone: "UTC" })
                      .split(",")[0]
                  }
                </div>
                <div className=" font-medium text-primary text-sm">
                  {OrderStatusRef[store.status]}
                </div>
              </div>
            }
          />
        ))}
      </Box>
    </Page>
  );
};

export default MyOrder;
