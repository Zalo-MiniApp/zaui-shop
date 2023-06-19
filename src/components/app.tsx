import React, { Suspense } from "react";
import { Route } from "react-router-dom";
import {
  App,
  ZMPRouter,
  AnimationRoutes,
  SnackbarProvider,
  Spinner,
} from "zmp-ui";
import { RecoilRoot } from "recoil";
import HomePage from "../pages";
import ProductPicker from "./product-picker";
import DetailProduct from "../pages/detail-product";
import Header from "./header";
import { ConfigProvider, getConfig } from "./config-provider";
import { hexToRgb } from "../utils";
const FinishOrder = React.lazy(() => import("../pages/finish-order"));

const MyApp = () => {
  return (
    <RecoilRoot>
      <ConfigProvider
        cssVariables={{
          "--zmp-primary-color": getConfig((c) => c.template.primaryColor),
          "--zmp-primary-color-rgb": hexToRgb(
            getConfig((c) => c.template.primaryColor)
          ),
        }}
      >
        <App>
          <Suspense
            fallback={
              <div className=" w-screen h-screen flex justify-center items-center">
                <Spinner />
              </div>
            }
          >
            <SnackbarProvider>
              <ZMPRouter>
                <Header />
                <AnimationRoutes>
                  <Route path="/" element={<HomePage></HomePage>}></Route>
                  <Route
                    path="/finish-order"
                    element={<FinishOrder></FinishOrder>}
                  ></Route>
                  <Route
                    path="/detail-product/:productId"
                    element={<DetailProduct></DetailProduct>}
                  ></Route>
                </AnimationRoutes>
                <ProductPicker />
              </ZMPRouter>
            </SnackbarProvider>
          </Suspense>
        </App>
      </ConfigProvider>
    </RecoilRoot>
  );
};
export default MyApp;
