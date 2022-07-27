import React from "react";
import { useStore } from "zmp-framework/react";
import Box from "zmp-framework/react/box";
import Page from "zmp-framework/react/page";
import Searchbar from "zmp-framework/react/searchbar";
import Icon from "zmp-framework/react/icon";
import { Store } from "../models";
import { imgUrl } from "../utils/imgUrl";
import { orderOfStore } from "../store";

const MyOrder = ({zmprouter}) =>{
  const handleSearchOA = (e) => {
    console.log(e.target[0].value);
  };
  const cart: orderOfStore[] = useStore("cart");
  console.log('cart: ',cart);
  return (
    <Page ptr name="my-order">
      <Box m={0} p={4} className="bg-white">
        {cart.length} đơn hàng
        {/* <div className=" mt-4" >
          {oaFollowing.map((oa) => (
            <div className="flex flex-row items-center justify-between w-full border-b" onClick={()=>zmprouter.navigate(`/mini-store/?id=${oa.key}`)}>
              <div className="flex flex-row items-center">
                <div className="w-auto flex-none">
                  <img
                    src={imgUrl(oa.pathImg)}
                    alt={"image product"}
                    className=" w-9 h-9 object-cover rounded-full bg-white"
                  />
                </div>
                <div className=" p-3 pr-0">
                  <div className="line-clamp-2 text-sm font-medium break-words">
                    {oa.nameStore}
                  </div>
                  <span className=" pt-1 font-semibold text-sm text-gray-500">
                    Cá nhân
                  </span>
                </div>
              </div>
              <Icon
                size={20}
                zmp="zi-chevron-right"
                className=" text-zinc-500 m-3"
              />
            </div>
          ))}
        </div> */}
      </Box>
    </Page>
  );
}

export default MyOrder;
