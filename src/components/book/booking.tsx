import { FunctionComponent, useMemo, useState } from "react";
import { Box, Button, Card, Text, Title, zmp } from "zmp-framework/react";
import { useBookingTotal } from "../../hooks";
import { Booking } from "../../models";
import store from "../../store";
import Price from "../format/price";
import Time from "../format/time";
import RestaurantItem from "../restaurant";
import Swipeable from "../swipeable";

interface BookingItemProps {
  booking: Booking
}

const BookingItem: FunctionComponent<BookingItemProps> = ({ booking }) => {
  const [total] = useBookingTotal(booking);
  const [selectingState, setSelectingState] = useState(false);
  const unbook = (bookingId: string) => {
    store.dispatch('unbook', bookingId);
  }

  return <Box flex alignItems="center">
    <Swipeable
      onClick={() => setSelectingState(s => !s)}
      onSwipeLeft={() => setSelectingState(true)}
      onSwipeRight={() => setSelectingState(false)}
      className="bg-white rounded-xl pb-8 pt-4 px-4 relative duration-200 w-full z-10"
      style={{
        left: selectingState ? -64 : 0
      }}
    >
      <Box mx="0" my="4" flex justifyContent="space-between" alignItems="center">
        <Title size="small" className="whitespace-nowrap mb-0">Booking ID: {booking.id}</Title>
        <Text className="ml-6 text-secondary mb-0 whitespace-nowrap" size="large" bold><Price amount={total} /></Text>
      </Box>
      <div className="border rounded-xl">
        <RestaurantItem
          layout="list-item"
          restaurant={booking.restaurant}
          before={booking.bookingInfo ? <Text size="small" className="text-gray-500">
            <Time time={booking.bookingInfo?.hour} />
            {' - '}
            {booking.bookingInfo.date.toLocaleDateString()}
          </Text> : <Text size="small" className="text-gray-500">Chỉ đặt thức ăn</Text>}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSelectingState(false);
            zmp.views.main.router.navigate({
              path: '/booking-detail/',
              query: {
                id: booking.id
              }
            })
          }}
        />
      </div>
    </Swipeable>
    <Button onClick={() => unbook(booking.id)} typeName="secondary" className={`absolute right-4 ${selectingState ? 'opacity-100' : 'opacity-0'}`}>Huỷ</Button>
  </Box >;
}

export default BookingItem;