import React from "react";
import { cx } from "../utils";
import { Box, Icon, useNavigate } from "zmp-ui";
import { useRecoilValue } from "recoil";
import { headerState } from "../state";

const typeColor = {
  primary: {
    headerColor: "bg-primary",
    textColor: "text-white",
    iconColor: "text-white",
  },
  secondary: {
    headerColor: "bg-white",
    textColor: "text-black",
    iconColor: "text-gray-400",
  },
};

const Header = () => {
  const { route, hasLeftIcon, rightIcon, title, customTitle, type } =
    useRecoilValue(headerState);

  const { headerColor, textColor, iconColor } = typeColor[type! || "primary"];
  const navigate = useNavigate();

  return (
    <div
      className={cx(
        "fixed top-0 z-50 w-screen h-header flex items-center",
        headerColor,
        textColor
      )}
    >
      <div className=" flex items-center h-[44px] pl-5 pr-[105px] gap-3 w-full justify-between">
        <div className="flex flex-row items-center">
          {hasLeftIcon && (
            <span onClick={() => (route ? navigate(route) : navigate(-1))}>
              <Icon icon="zi-arrow-left" className={iconColor} />
            </span>
          )}
          {customTitle || (
            <div className="pl-2 text-lg font-medium">{title}</div>
          )}
        </div>
        {rightIcon || " "}
      </div>
    </div>
  );
};

export default Header;
