import { useSetRecoilState } from "recoil";
import { HeaderType } from "../models";
import appConfig from "../../app-config.json";
import { headerState } from "../state";
import { useCallback } from "react";

const useSetHeader = () => {
  const setHeader = useSetRecoilState(headerState);
  return useCallback(
    ({
      route = "",
      hasLeftIcon = true,
      rightIcon = null,
      title = appConfig.app.title,
      customTitle = null,
      type = "primary",
    }: HeaderType) =>
      setHeader({
        route,
        hasLeftIcon,
        rightIcon,
        title,
        customTitle,
        type,
      }),
    [setHeader]
  );
};

export default useSetHeader;
