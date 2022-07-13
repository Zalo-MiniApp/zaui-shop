import { ReactNode, useEffect, useMemo, useState } from "react";
import { Box, Button, Sheet, Text, Title, useStore, zmp } from "zmp-framework/react";
import Notch from "../components/notch";
import Price from "../components/format/price";
import { Booking } from "../models";
import { useBookingTotal } from "../hooks";
import Time from "../components/format/time";
import CartItem from "../components/cart/cart-item";

function Section({ left, right }: { left: ReactNode, right: ReactNode }) {
  return <>
    <Box m="0" flex justifyContent="space-between" alignItems="center">
      <Title size="small" className="mx-6 my-4">{left}</Title>
      <Title size="small" className="mx-6 my-4">{right}</Title>
    </Box>
    <hr />
  </>;
}

function BookingDetail({ zmproute, zmprouter }) {
  const bookings = useStore('bookings') as Booking[];
  const booking = useMemo(() => bookings.find(b => b.id === zmproute.query.id), [zmproute])
  const [total] = useBookingTotal(booking);

  return <Sheet backdrop swipeToClose className="h-auto" swipeHandler=".swiper-handler">
    <Notch color="black" />
    {booking && <>
      <Box className="swiper-handler" p="4" mt="6" flex justifyContent="center">
        <Title size="small">{booking.bookingInfo ? 'Thông tin đặt bàn' : 'Pizza'}</Title>
      </Box>
      <hr />
      <div className="swiper-handler">
        {booking.bookingInfo && <>
          <Section left="Ngày, giờ" right={<>{booking.bookingInfo.date.toLocaleDateString()} - <Time time={booking.bookingInfo.hour} /></>} />
          <Section left="Bàn số" right={booking.bookingInfo.seats} />
          <Section left="Số ghế" right={booking.bookingInfo.table} />
        </>}
        <Section left="Chi tiết" right={<Price amount={total} />} />
      </div>
      {booking.cart && booking.cart.items.length ? <Box m="0" p="2" className="overflow-y-auto" style={{ maxHeight: `calc(50vh - ${booking.bookingInfo ? 54 * 4 : 0}px)`, minHeight: 120 }}>
        {booking.cart.items.map((item, i) => <CartItem key={i} item={item} />)}
      </Box> : <Box my="4" flex justifyContent="center">Không có món ăn</Box>}
      <hr />
      <Box m="6">
        <Button onClick={() => zmprouter.back()} large typeName="secondary" responsive className="rounded-xl">Huỷ</Button>
      </Box>
    </>}
  </Sheet>;
}

export default BookingDetail;