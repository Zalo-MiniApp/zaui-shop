import { useEffect } from 'react';
import api from 'zmp-sdk';
import App from 'zmp-framework/react/app';
import View from 'zmp-framework/react/view';
import NavigationBar from './navigation-bar';
import store from '../store';
import ErrorBoundary from './error-boundary';
import { getUser, requestLocation } from '../services/zalo';
import appConfig from '../../app-config.json';
import ProductPicker from '../pages/product-picker';
import Header from './header';

const MyApp = () => {
  const zmpparams = {
    name: appConfig.app.title,
    theme: 'auto',
    store,
  };

  const init = async () => {
    await api.login();
    getUser();
    requestLocation();
    store.dispatch('initDummyData');
  };

  useEffect(() => {
    init();
  }, []);

  // useSheetStatusBar();

  return (
    <ErrorBoundary>
      <App {...zmpparams}>
        <Header />
        <View
          main
          url="/"
          routesAdd={[
            {
              path: '/product-picker/',
              sheet: {
                component: ProductPicker,
              },
            },
          ]}
        />
        <NavigationBar />
      </App>
    </ErrorBoundary>
  );
};
export default MyApp;
