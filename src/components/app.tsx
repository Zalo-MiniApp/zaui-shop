import { useEffect } from "react";
import api from "zmp-sdk";
import NavigationBar from "./navigation-bar";
import store from "../store";
import { useSheetStatusBar } from "../hooks";
import ErrorBoundary from "./error-boundary";
import { getUser, requestLocation } from "../services/zalo";
import appConfig from "../../app-config.json";
import App from "zmp-framework/react/app";
import View from "zmp-framework/react/view";
import TabView from "zmp-framework/react/tab-view";
import ProductPicker from "../pages/product-picker";

const MyApp = () => {
  const zmpparams = {
    name: appConfig.app.title,
    theme: "auto",
    store: store,
  };

  const init = async () => {
    await api.login();
    getUser();
    requestLocation();
  };

  useEffect(() => {
    init();
  }, []);

  // useSheetStatusBar();

  return (
    <ErrorBoundary>
      <App {...zmpparams}>
        {/* <Header /> */}
      
        <View
          main
          url="/"
          routesAdd={[
            {
              path: '/product-picker/',
              sheet: {
                component: ProductPicker,
              }
            }
          ]}
        />
        <NavigationBar />
      </App>
    </ErrorBoundary>
  );
};
export default MyApp;
