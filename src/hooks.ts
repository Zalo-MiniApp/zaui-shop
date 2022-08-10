import { useEffect, useState } from 'react';
import { zmp } from 'zmp-framework/react';
// eslint-disable-next-line import/no-unresolved
import { Router } from 'zmp-core/types';

// eslint-disable-next-line import/prefer-default-export
export const useCurrentRoute = () => {
  const [currentRoute, setCurrentRoute] = useState({
    path: '/',
  } as Router.Route);
  useEffect(() => {
    const handleRouteChange = (route) => {
      setCurrentRoute(route);
    };
    zmp.on('routeChange', handleRouteChange);
    return () => {
      zmp.off('routeChange', handleRouteChange);
    };
  }, []);
  return [currentRoute];
};
