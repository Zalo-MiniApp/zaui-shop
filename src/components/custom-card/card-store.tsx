import React, { ReactNode } from "react";
import { Icon } from "zmp-ui";
import { StoreTypeRef } from "../../constants/referrence";
import { Store } from "../../models";
import { cx } from "../../utils";

const CardStore = ({
  store,
  type = "standard",
  handleOnClick = () => {},
  hasRightSide = true,
  hasBorderBottom = true,
  customRightSide,
  className,
}: {
  store: Store;
  type?: "order" | "standard";
  handleOnClick?: () => void;
  hasRightSide?: boolean;
  hasBorderBottom?: boolean;
  customRightSide?: ReactNode;
  className?: string;
}) => (
  <div
    key={store.id}
    className={cx(
      "flex flex-row items-center justify-between w-full",
      hasBorderBottom && " border-b",
      className && className
    )}
    onClick={handleOnClick}
    role="button"
  >
    <div className="flex flex-row items-center">
      <div className="w-auto flex-none">
        <img
          src={store.logoStore}
          alt="product"
          className=" w-9 h-9 object-cover rounded-full bg-white"
        />
      </div>
      <div className=" p-3 pr-0">
        <div className="line-clamp-2 text-sm font-medium break-words">
          {store.nameStore}
        </div>
        {type === "standard" && (
          <span className=" pt-1 font-semibold text-sm text-gray-500">
            {StoreTypeRef[store.type]}
          </span>
        )}
      </div>
    </div>
    {hasRightSide &&
      (customRightSide || (
        <Icon size={20} icon="zi-chevron-right" className=" text-zinc-500" />
      ))}
  </div>
);

export default CardStore;
