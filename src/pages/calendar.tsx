import { useMemo, useState } from "react";
import { Box, Button, Page, useStore } from "zmp-framework/react";
import BookingItem from "../components/book/booking";
import { Booking } from "../models";

const labels = {
  upcoming: 'Sắp đến',
  finished: 'Hoàn thành',
}

function PageHeader({ status, setStatus }) {
  return <>
    <Box m="0" className="fixed top-0 left-0 right-0 pt-12">
      <Box m="0" flex>
        {['upcoming', 'finished'].map(s => <Button
          key={s}
          className={`border-b-2 rounded-none px-4 flex-1 mx-4 ${status === s ? 'border-primary' : ''}`}
          typeName={status === s ? undefined : 'ghost'}
          onClick={() => setStatus(s)}
        >
          {labels[s]}
        </Button>)}
      </Box>
    </Box>
    <Box height={48}></Box>
  </>;
}

function CalendarPage() {
  const [status, setStatus] = useState<'upcoming' | 'finished'>('upcoming');
  const allBookings = useStore('bookings') as Booking[];
  const bookings = useMemo(() => {
    return allBookings.filter(b => {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);
      if (status == "finished") {
        return b.bookingInfo && b.bookingInfo.date < startOfToday;
      } else {
        return !b.bookingInfo || b.bookingInfo.date >= startOfToday;
      }
    });
  }, [status, allBookings])

  return <Page>
    <PageHeader status={status} setStatus={setStatus} />
    {bookings.length === 0 ?
      <Box className="text-center" mt="10">Bạn chưa có booking nào {status === 'upcoming' ? 'sắp đến' : 'hoàn thành'}!</Box> : <>
        {bookings.map(booking => <Box key={booking.id} my="4"><BookingItem booking={booking} /></Box>)}
      </>}
  </Page>;
}

export default CalendarPage;