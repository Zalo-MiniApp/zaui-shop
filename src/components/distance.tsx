import { FunctionComponent, useMemo } from "react";
import { Button, useStore } from "zmp-framework/react";
import { Location } from "../models";
import { requestLocation } from "../services/zalo";
import { calcCrowFliesDistance } from "../utils/location";

interface DistanceProps {
  location: Location
}

const Distance: FunctionComponent<DistanceProps> = ({ location }) => {
  const position = useStore('position') as Location | null;
  const distance = useMemo(() => {
    if (position) {
      const d = calcCrowFliesDistance(position, location);
      if (d > 1) {
        return `${Math.round(d * 10) / 10} km`;
      }
      return `${Math.round(d * 1000)} m`;
    }
    return 0;
  }, [position, location]);
  return position ? <>{distance}</> : <Button className="px-0" onClick={e => {
    e.stopPropagation();
    requestLocation();
  }}>Bật vị trí</Button>;
}

export default Distance;