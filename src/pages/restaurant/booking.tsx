import { Box, Button, Text, Title, useStore, zmp } from "zmp-framework/react";
import { Booking as BookingModel } from "../../models";
import { useContext, useState } from "react";
import DateBooker from "../../components/book/date-booker";
import TableBooker from "../../components/book/table-booker";
import SeatsPicker from "../../components/book/seats-booker";
import TimeBooker from "../../components/book/time-booker";
import Price from "../../components/format/price";
import { pay } from "../../services/zalo";
import store from "../../store";
import { message } from "../../utils/notificaiton";
import RestaurantContext from "./context";

function Booking() {
  const [seats, setSeats] = useState(4);
  const { restaurant } = useContext(RestaurantContext);
  const [hour, setHour] = useState(restaurant.hours.opening);
  const [date, setDate] = useState(new Date());
  const [table, setTable] = useState('05');
  const total = useStore('total') as number;

  const book = async () => {
    await pay(25000 + total);
    await store.dispatch('book', {
      restaurant: restaurant,
      id: + new Date() + '',
      bookingInfo: {
        seats,
        hour,
        date,
        table
      }
    } as BookingModel)
    message('Đặt bàn thành công');
    zmp.views.main.router.navigate('/calendar/');
  }

  return <>
    <Box mx="4" my="6">
      <DateBooker onChange={setDate} />
      <Box flex justifyContent="space-between" my="6">
        <TableBooker value={table} onChange={setTable} />
        <SeatsPicker value={seats} onChange={setSeats} />
      </Box>
      <TimeBooker hours={restaurant.hours} onChange={setHour} />
      <Box height={80}></Box>
    </Box>
    <Box m="0" p="6" className="bg-white fixed bottom-0 left-0 right-0 shadow z-10 border">
      <Box mb="4" flex justifyContent="space-between">
        <Title size="small">Phí dịch vụ</Title>
        <Text className="ml-6 text-secondary mb-0" bold><Price amount={25000} /></Text>
      </Box>
      <Button fill responsive large className="rounded-xl" onClick={book}>Đặt bàn</Button>
    </Box>
  </>;
}

export default Booking;