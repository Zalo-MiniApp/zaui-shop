import { useCallback } from "react";
import {
  initialProductInfoPickedState,
  productInfoPickedState,
} from "./../state";
import { useSetRecoilState } from "recoil";

const useResetProductPicked = () => {
  const setProductPicked = useSetRecoilState(productInfoPickedState);
  return useCallback(
    () => setProductPicked(initialProductInfoPickedState),
    [setProductPicked]
  );
};
export default useResetProductPicked;
