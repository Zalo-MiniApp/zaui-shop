import React from "react";
import { useStore } from "zmp-framework/react";
import Box from "zmp-framework/react/box";
import Page from "zmp-framework/react/page";
import Searchbar from "zmp-framework/react/searchbar";
import Icon from "zmp-framework/react/icon";
import { Store } from "../models";
import { imgUrl } from "../utils/imgUrl";
import { OrderStatusRef, StoreTypeRef } from "../constants/referrence";
import CardShop from "../components/mini-store/card-shop";
import CardStore from "../components/card-item/card-store";

const StoreFollowing = ({ zmprouter }) => {
  const handleSearchOA = (e) => {
    console.log(e.target[0].value);
  };
  const storeFollowing: Store[] = useStore("storeFollowing");
  return (
    <Page ptr name="store-following">
      <Box m={0} pt={4} pb={0} px={4} className="bg-white">
        <Searchbar
          className="w-full rounded-xl"
          placeholder="Tìm kiếm OA"
          onSubmit={handleSearchOA}
        />
        <div className="mt-4">
          {storeFollowing.map((store) => (
            <CardStore
              store={store}
              handleOnClick={() =>
                zmprouter.navigate(`/mini-store/?id=${store.key}`)
              }
            />
          ))}
        </div>
      </Box>
    </Page>
  );
}

export default StoreFollowing;
