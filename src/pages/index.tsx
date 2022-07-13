import {
  Page,
  useStore,
  Title,
  Box,
  Avatar,
  Text,
  Input,
  Searchbar,
  Icon,
} from "zmp-framework/react";
import { userInfo } from "zmp-sdk";
import Inquiry, { QuickFilter } from "../components/inquiry";
import RestaurantItem from "../components/restaurant";
import SearchCustom from "../components/search-custom";
import { Restaurant } from "../models";
import store from "../store";
import { imgUrl } from "../utils/imgUrl";

function Popular() {
  const populars = useStore("populars") as Restaurant[];

  return (
    <>
      <Box mx="4" mt="6">
        <Title size="small">Địa điểm phổ biến</Title>
      </Box>
      {populars.length ? (
        <div className="overflow-auto snap-x snap-mandatory scroll-p-4 no-scrollbar">
          <Box m="0" pr="4" flex className="w-max">
            {populars.map((restaurant) => (
              <Box
                key={restaurant.id}
                ml="4"
                mr="0"
                className="snap-start"
                style={{ width: "calc(100vw - 120px)" }}
              >
                <RestaurantItem layout="cover" restaurant={restaurant} />
              </Box>
            ))}
          </Box>
        </div>
      ) : (
        <Box mx="4">Không có địa điểm nào ở khu vực này</Box>
      )}
    </>
  );
}

function Nearest() {
  const nearests = useStore("nearests") as Restaurant[];
  return (
    <>
      <Box mx="4" mt="5">
        <Title size="small">Gần bạn nhất</Title>
        {nearests.map((restaurant) => (
          <Box key={restaurant.id} mx="0" my="3">
            <RestaurantItem
              layout="list-item"
              restaurant={restaurant}
              after={
                <Text size="small" className="text-gray-500">
                  {restaurant.address}
                </Text>
              }
            />
          </Box>
        ))}
      </Box>
    </>
  );
}
function Inquiry1() {
  const keyword = useStore("keyword") as string;
  const setKeyword = (s: string) => {
    store.dispatch("setKeyword", s);
  };
  return (
    <Searchbar
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      className="inquiry"
      placeholder="Tìm kiếm"
    />
  );
}

const HomePage = () => {
  const user: userInfo = useStore("user");

  return (
    <Page name="home">
      <div className="bg-theme">
        <SearchCustom/>
        <img src={imgUrl('banner')} className="w-full h-auto object-cover"/>
        
      </div>

      {/* <Box mx="4" mb="4" mt="5">
        <Avatar className="shadow align-middle mb-2" src={user.avatar}>
          Hi
        </Avatar>
        <Text>{user.name ? <>Chào, {user.name}!</> : "..."}</Text>
        <Title size="xlarge" bold>
          Hôm nay bạn muốn ăn ở đâu?
        </Title>
        <Inquiry />
        <Title size="small" className="mt-6 mb-4">
          Phân loại nhanh
        </Title>
        <QuickFilter />
      </Box> */}
      {/* <Popular /> */}
      {/* <Nearest /> */}
    </Page>
  );
};

export default HomePage;
