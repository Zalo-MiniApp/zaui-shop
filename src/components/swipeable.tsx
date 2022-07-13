import { FunctionComponent } from "react";

interface Swipeable extends React.HTMLAttributes<HTMLDivElement> {
  onSwipeLeft: () => void
  onSwipeRight: () => void
}

const Swipeable: FunctionComponent<Swipeable> = ({ children, onSwipeLeft, onSwipeRight, ...props }) => {
  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    const { clientX } = e.touches[0];
    const { clientWidth } = e.currentTarget;
    if (clientX < clientWidth / 2) {
      onSwipeLeft();
    } else {
      onSwipeRight();
    }
  }

  return <div {...props} onTouchMove={handleTouch}>
    {children}
  </div>
}

export default Swipeable;