import { setNavigationBarColor } from "zmp-sdk";
import { statusBarColor, textStatusBarColor } from "../constants/referrence";

export const changeStatusBarColor = (type?: "primary" | "secondary") => {
  if (!type) type = "primary";
  setNavigationBarColor({
    color: "",
    statusBarColor: statusBarColor[type],
    textColor: textStatusBarColor[type] as "white" | "black",
  });
};
