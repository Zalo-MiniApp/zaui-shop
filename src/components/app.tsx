import { useEffect } from 'react';
import { App, View } from 'zmp-framework/react';
import api from 'zmp-sdk';
import Header from './header';
import NavigationBar from './navigation-bar';
import store from '../store';
import FoodPicker from '../pages/food-picker';
import Cart from './cart';
import BookingDetail from '../pages/booking-detail';
import { useSheetStatusBar } from '../hooks';
import ErrorBoundary from './error-boundary';
import { getUser, requestLocation } from '../services/zalo';
import appConfig from '../../app-config.json';

const MyApp = () => {
  const zmpparams = {
    name: appConfig.app.title,
    theme: 'auto',
    store: store,
  };

  const init = async () => {
    await api.login();
    getUser();
    requestLocation();
  }

  useEffect(() => {
    init();
  }, [])

  useSheetStatusBar();

  return (
    <ErrorBoundary>
      <App {...zmpparams}>
        {/* <Header /> */}
        <View
          main
          url="/"
          routesAdd={[
            {
              path: '/food-picker/',
              sheet: {
                component: FoodPicker,
              }
            }, {
              path: '/booking-detail/',
              sheet: {
                component: BookingDetail,
              }
            }
          ]}
        />
        <NavigationBar />
        <Cart />
      </App>
    </ErrorBoundary>
  );
}
export default MyApp;