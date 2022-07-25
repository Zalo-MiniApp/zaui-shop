import Link from "zmp-framework/react/link";
import Tabbar from "zmp-framework/react/tabbar";
import { zmp } from "zmp-framework/react/lite";
import { useCurrentRoute } from "../hooks";

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
        animate={false}
        iconZMP="zi-home"
        tabLinkActive={currentRoute.path === "/"}
      >
        Trang chủ
      </Link>
      <Link
        href="/calendar"
        animate={false}
        iconZMP="zi-calendar"
        tabLinkActive={currentRoute.path.startsWith("/calendar")}
      >
        Lịch của tôi
      </Link>
    </Tabbar>
  );
}

export default NavigationBar;
