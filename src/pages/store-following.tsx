import { useStore } from 'zmp-framework/react';
import Box from 'zmp-framework/react/box';
import Page from 'zmp-framework/react/page';
import Searchbar from 'zmp-framework/react/searchbar';
import { SyntheticEvent } from 'react';
import { Store } from '../models';
import CardStore from '../components/card-item/card-store';
import { changeStatusBarColor } from '../services/navigation-bar';
import setHeader from '../services/header';

const StoreFollowing = ({ zmprouter }) => {
  const handleSearchOA = (e: SyntheticEvent) => {
    console.log(e.target[0].value);
  };
  const storeFollowing: Store[] = useStore('storeFollowing');

  return (
    <Page
      ptr
      name="store-following"
      onPageBeforeIn={() => {
        setHeader({
          title: 'OA đã theo dõi',
          hasLeftIcon: false,
          type: 'secondary',
        });
        changeStatusBarColor('secondary');
      }}
    >
      <Box m={0} pt={4} pb={0} px={4} className="bg-white">
        <Searchbar
          className="w-full rounded-xl"
          placeholder="Tìm kiếm OA"
          onSubmit={handleSearchOA}
        />
        <div className="mt-4">
          {storeFollowing.map((store) => (
            <CardStore
              key={store.id}
              store={store}
              handleOnClick={() =>
                zmprouter.navigate(`/mini-store/?id=${store.id}`, { transition: 'zmp-fade' })
              }
            />
          ))}
        </div>
      </Box>
    </Page>
  );
};

export default StoreFollowing;
