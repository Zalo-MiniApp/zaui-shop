import { useStore } from 'zmp-framework/react';
import Box from 'zmp-framework/react/box';
import Page from 'zmp-framework/react/page';
import Searchbar from 'zmp-framework/react/searchbar';
import { Store } from '../models';
import CardStore from '../components/card-item/card-store';
import { setNavigationBarTitle } from '../services/navigation-bar';

const StoreFollowing = ({ zmprouter }) => {
  const handleSearchOA = (e) => {
    console.log(e.target[0].value);
  };
  const storeFollowing: Store[] = useStore('storeFollowing');
  return (
    <Page ptr name="store-following" onPageBeforeIn={()=> setNavigationBarTitle("OA đã theo dõi")}>
      <Box m={0} pt={4} pb={0} px={4} className="bg-white">
        <Searchbar
          className="w-full rounded-xl"
          placeholder="Tìm kiếm OA"
          onSubmit={handleSearchOA}
        />
        <div className="mt-4">
          {storeFollowing.map((store) => (
            <CardStore
              key={store.key}
              store={store}
              handleOnClick={() =>
                zmprouter.navigate(`/mini-store/?id=${store.key}`, { animate: false })
              }
            />
          ))}
        </div>
      </Box>
    </Page>
  );
};

export default StoreFollowing;
