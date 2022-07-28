import Link from "zmp-framework/react/link";
import Tabbar from "zmp-framework/react/tabbar";
import { zmp } from "zmp-framework/react/lite";
import { useCurrentRoute } from "../hooks";
import OAIcon from "../static/icons/OA-icon";
import OrderIcon from "../static/icons/order-icon";

export const hideNavigationBar = () => {
  zmp.toolbar.hide("#app-tab-bar");
  zmp.$(".view-main")[0].classList.add("hidden-nav");
};

export const showNavigationBar = () => {
  zmp.toolbar.show("#app-tab-bar");
  zmp.$(".view-main")[0].classList.remove("hidden-nav");
};

function NavigationBar() {
  const [currentRoute] = useCurrentRoute();
  // console.log(zmp);
  return (
    <Tabbar bottom id="app-tab-bar">
      <Link
        href="/"
        iconZMP="zi-home"
        tabLinkActive={currentRoute.path === "/"}
      >
        Trang chủ
      </Link>
      <Link
        href="/my-order"
        tabLinkActive={currentRoute.path.startsWith("/my-order")}
      >
        <OrderIcon />
        Đơn hàng
      </Link>
      <Link
        href="/store-following"
        tabLinkActive={currentRoute.path.startsWith("/store-following")}
      >
        <OAIcon />
        OA theo dõi
      </Link>
    </Tabbar>
  );
}

export default NavigationBar;
