import { FunctionComponent } from "react";
import { Button, Title } from "zmp-framework/react";

interface SeatsBookerProps {
  value: number
  onChange: (value: number) => void
}

const SeatsBooker: FunctionComponent<SeatsBookerProps> = ({ value, onChange }) => {
  return <div className="w-36">
    <Title size="small">Số ghế</Title>
    <div className="flex rounded-full bg-white h-12 items-center justify-between px-1">
      <Button
        typeName="secondary"
        className="w-10"
        onClick={() => onChange(Math.max(value - 1, 1))}
      ><div className="border-t border-primary w-4" /></Button>
      <span>{value}</span>
      <Button
        iconZMP="zi-plus"
        typeName="secondary"
        className="w-10"
        onClick={() => onChange(value + 1)}
      ></Button>
    </div>
  </div>;
}

export default SeatsBooker;