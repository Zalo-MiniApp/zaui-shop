import React from 'react';
import { Button, Icon } from 'zmp-ui';
import { Store } from '../../models';
import { getImgUrl } from '../../utils';

const CardShop = ({ storeInfo }: { storeInfo: Store }) => (
  <div className="flex flex-row justify-between items-center p-4 bg-white">
    {storeInfo && (
      <div className="flex flex-row items-center">
        <img
          src={getImgUrl(storeInfo.logoStore)}
          alt="store-img"
          className=" rounded-full object-cover w-[60px] h-[60px]"
        />
        <div className=" pl-4">
          <div className=" text-base font-medium pb-1">{storeInfo.nameStore}</div>
          <div className=" text-sm font-normal text-gray-500 pb-1">
            {storeInfo.followers} theo dõi
          </div>
          <div className=" flex flex-row text-sm font-normal  text-gray-500">
            <div className="flex items-center justify-center">
              <Icon icon="zi-location" size={12} />
            </div>
            <div>{storeInfo.address}</div>
          </div>
        </div>
      </div>
    )}
    <Button className="chat-button" variant="primary" size="small" onClick={() => {}}>
      Nhắn tin
    </Button>
  </div>
);

export default CardShop;
