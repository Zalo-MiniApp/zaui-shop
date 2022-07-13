import { Hours } from '../../models'

function Time({ time }: { time: Hours }) {
  const [hour, minute, ampm] = time;
  return <>{`${hour}`.padStart(2, '0')}:{`${minute}`.padStart(2, '0')} {ampm}</>;
}

export default Time;