import React from 'react';
import { Store } from '../../models';
import { imgUrl } from '../../utils/imgUrl';
import Icon from "zmp-framework/react/icon";
import Button from "zmp-framework/react/button";

const CardShop = ({ storeInfo }: { storeInfo: Store }) => {
    return (
      <div className="flex flex-row justify-between items-center p-4 bg-white">
        {storeInfo && (
          <div className="flex flex-row items-center">
            <img
              src={imgUrl(storeInfo.pathImg)}
              alt="store-img"
              className=" rounded-full object-cover w-[60px] h-[60px]"
            />
            <div className=" pl-4">
              <div className=" text-base font-medium pb-1">
                {storeInfo.nameStore}
              </div>
              <div className=" text-sm font-normal text-gray-500 pb-1">
                {storeInfo.followers} theo dõi
              </div>
              <div className=" flex flex-row text-sm font-normal  text-gray-500">
                <div className="flex items-center justify-center">
                  <Icon zmp="zi-location" size={12} />
                </div>
                <div>{storeInfo.address}</div>
              </div>
            </div>
          </div>
        )}
        <Button
          className="chat-button"
          typeName="primary"
          small
          onClick={() => {}}
        >
          Nhắn tin
        </Button>
      </div>
    );
  };

export default CardShop;