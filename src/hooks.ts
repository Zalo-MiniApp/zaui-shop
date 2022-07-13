import { useEffect, useMemo, useState } from "react"
import { useStore, zmp } from "zmp-framework/react"
import { Router } from "zmp-core/types";
import { Booking, Restaurant } from "./models"
import { Sheet } from 'zmp-core/types'
import api from 'zmp-sdk';
import appConfig from '../app-config.json';

export const useRestaurant = (id: number) => {
  const restaurants = useStore('restaurants') as Restaurant[]
  const restaurant = useMemo(() => {
    return restaurants.find(restaurant => restaurant.id == id);
  }, [id])
  return restaurant
}

export const useCurrentRoute = () => {
  const [currentRoute, setCurrentRoute] = useState({
    path: '/',
  } as Router.Route)
  useEffect(() => {
    const handleRouteChange = (route) => {
      setCurrentRoute(route)
    }
    zmp.on('routeChange', handleRouteChange);
    return () => {
      zmp.off('routeChange', handleRouteChange)
    }
  }, [])
  return [currentRoute];
}

export const matchStatusBar = (sheetOpened: boolean) => {
  api.setNavigationBarColor({
    statusBarColor: sheetOpened ? '#404040' : appConfig.app.statusBarColor,
    color: '',
  });
}

export const useSheetStatusBar = () => {
  useEffect(() => {
    const handleSheetOpen = (sheet: Sheet.Sheet) => {
      if (!sheet.el.classList.contains('cart-preview')) {
        matchStatusBar(true)
      }
    }
    const handleSheetClose = (sheet: Sheet.Sheet) => {
      if (!sheet.el.classList.contains('cart-preview')) {
        matchStatusBar(false)
      }
    }
    zmp.on('sheetOpen', handleSheetOpen);
    zmp.on('sheetClose', handleSheetClose);
    return () => {
      zmp.off('sheetOpen', handleSheetOpen);
      zmp.off('sheetClose', handleSheetClose);
    }
  }, [])
}

export const useBookingTotal = (booking?: Booking) => {
  const total = useMemo(() => {
    const serviceFee = 25000;
    if (!booking || !booking.cart) return serviceFee;
    return booking.cart.items.reduce((total, item) => total + item.food.price * item.quantity, serviceFee);
  }, [booking])
  return [total];
}