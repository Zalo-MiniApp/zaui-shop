import { Box, Button, Icon, Text, Title } from "zmp-framework/react";
import api from 'zmp-sdk';
import { useContext } from "react";
import Time from "../../components/format/time";
import Day from "../../components/format/day";
import RestaurantContext from "./context";

function Information() {
  const { restaurant } = useContext(RestaurantContext);

  return <Box mx="2">
    <Box mx="2" mt="5">
      <Title size="small">Thông tin</Title>
      <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente voluptas, corporis, doloremque nisi recusandae consequatur, magni ipsum deleniti sequi illo porro maxime voluptatibus vero animi excepturi repellat. Deleniti, corporis excepturi.</Text>
    </Box>
    <Box mx="2" mt="6">
      <Title size="small">Giờ mở cửa</Title>
      <Box flex mx="0" alignItems="center" justifyContent="space-between">
        <span><Icon zmp="zi-clock-1" className="text-green-500 mr-1" /><Time time={restaurant.hours.opening} /> - <Time time={restaurant.hours.closing} /></span>
        <span><Icon zmp="zi-calendar" className="text-secondary mr-1" /><Day day={restaurant.days.opening} /> - <Day day={restaurant.days.closing} /></span>
      </Box>
    </Box>
    <Box mx="2" mt="6">
      <Title size="small">Hotline liên hệ</Title>
      <Box flex mx="0" alignItems="center" justifyContent="space-between">
        <Button style={{ padding: 0 }} onClick={() => api.openPhone({ phoneNumber: restaurant.hotline })}><Icon zmp="zi-call" className="text-green-500 mr-1" />{restaurant.hotline}</Button>
      </Box>
    </Box>
    <Box mx="2" mt="6">
      <Title size="small">Địa chỉ</Title>
      <Box flex mx="0" alignItems="center" justifyContent="space-between" mb="5">
        <span><Icon zmp="zi-location-solid" className="text-red-500 mr-1" />{restaurant.address}</span>
      </Box>
      <iframe className="w-full aspect-cinema rounded-xl" src={restaurant.map} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </Box>
  </Box>;
}

export default Information;