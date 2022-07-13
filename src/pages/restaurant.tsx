import { Box, Page } from "zmp-framework/react";
import { useRestaurant } from "../hooks";
import { hideNavigationBar, showNavigationBar } from "../components/navigation-bar";
import RestaurantContext from "./restaurant/context";
import RestaurantDetail from "./restaurant/detail";

function RestaurantPage({ zmproute }) {
  const restaurant = useRestaurant(zmproute.query.id)!;

  return <Page onPageBeforeIn={hideNavigationBar} onPageBeforeOut={showNavigationBar}>
    <RestaurantContext.Provider value={{ restaurant }}>
      <RestaurantDetail />
    </RestaurantContext.Provider>
    <Box height={200}></Box>
  </Page>;
}

export default RestaurantPage;