import { useEffect, useMemo, useState } from "react"
import { useStore, zmp } from "zmp-framework/react"
import { Router } from "zmp-core/types";
import { Sheet } from 'zmp-core/types'
import api from 'zmp-sdk';
import appConfig from '../app-config.json';


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
    color: sheetOpened ? '' : appConfig.app.headerColor ,
  });
}

export const useSetNavigationBarTitle = (title: string = "") => {
  api.setNavigationBarTitle({title: title});
}

