import { FunctionComponent, useMemo } from "react";
import { useStore } from "zmp-framework/react";
import { District } from "../models";

interface DistrictNameProps {
  id: number
}

const DistrictName: FunctionComponent<DistrictNameProps> = ({ id }) => {
  const districts = useStore('districts') as District[]
  const name = useMemo(() => {
    return districts.find(d => d.id === id)?.name ?? ''
  }, [id, districts])
  return <>{name}</>
}

export default DistrictName;