import { createContext } from "react";
import { Restaurant } from "../../models";

const RestaurantContext = createContext({
  restaurant: {} as Restaurant,
})

export default RestaurantContext;