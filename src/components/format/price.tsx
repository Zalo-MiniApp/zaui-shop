import { FunctionComponent } from "react";

interface PriceProps {
  amount: number;
}

const Price: FunctionComponent<PriceProps> = ({ amount }) => {
  return <>đ {amount.toLocaleString()}</>;
}

export default Price;