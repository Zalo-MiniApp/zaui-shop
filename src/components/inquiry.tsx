import { Button, Searchbar, useStore } from "zmp-framework/react";
import { District } from '../models'
import store from "../store";

function Inquiry() {
  const keyword = useStore('keyword') as string;
  const setKeyword = (s: string) => {
    store.dispatch('setKeyword', s);
  }
  return <Searchbar value={keyword} onChange={(e) => setKeyword(e.target.value)} className="inquiry" placeholder="Tìm kiếm" />;
}

export function QuickFilter() {
  const selectedDistrict = useStore('selectedDistrict') as number;
  const setSelectedDistrict = (districtId: number) => {
    store.dispatch('changeDistrict', districtId);
  }
  const districts = useStore('districts') as District[];
  return <div className="overflow-auto no-scrollbar snap-x snap-mandatory">
    <div className="flex w-max">
      <Button onClick={() => setSelectedDistrict(0)} typeName={!selectedDistrict ? 'primary' : 'tertiary'} className="mr-3 snap-start" fill>Tất cả</Button>
      {districts.map(district => <Button
        key={district.id}
        typeName={selectedDistrict === district.id ? 'primary' : 'tertiary'}
        className="mr-3 snap-start"
        fill
        onClick={() => setSelectedDistrict(district.id)}
      >{district.name}</Button>)}
    </div>
  </div>;
}

export default Inquiry;