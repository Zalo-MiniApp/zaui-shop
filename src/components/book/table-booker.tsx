import { FunctionComponent } from "react";
import { Button, Title } from "zmp-framework/react";

interface TableBookerProps {
  value: string
  onChange: (table: string) => void
}

const TableBooker: FunctionComponent<TableBookerProps> = ({ value, onChange }) => {
  return <div className="w-36">
    <Title size="small">Bàn số</Title>
    <div className="relative">
      <select className="w-full rounded-full bg-white h-12 flex items-center justify-between px-5 border-none" value={value} onChange={e => onChange(e.target.value)}>
        {['01', '02', '03', '04', '05'].map(table => <option key={table} value={table}>No.{table}</option>)}
      </select>
      <Button
        iconZMP="zi-chevron-down"
        typeName="secondary"
        className="w-10 m-1 absolute top-0 right-0 pointer-events-none"
      ></Button>
    </div>
  </div>;
}

export default TableBooker;