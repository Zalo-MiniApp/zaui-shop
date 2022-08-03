import Link from 'zmp-framework/react/link';
import Tabbar from 'zmp-framework/react/tabbar';
import { zmp } from 'zmp-framework/react/lite';
import { useCurrentRoute } from '../hooks';
import IconOA from './icons/icon-oa';
import IconOrder from './icons/icon-order';

export const hideNavigationBar = () => {
  zmp.toolbar.hide('#app-tab-bar');
  zmp.$('.view-main')[0].classList.add('hidden-nav');
};

export const showNavigationBar = () => {
  zmp.toolbar.show('#app-tab-bar');
  zmp.$('.view-main')[0].classList.remove('hidden-nav');
};

const NavigationBar = () => {
  const [currentRoute] = useCurrentRoute();
  return (
    <Tabbar bottom id="app-tab-bar">
      <Link href="/" animate={false} iconZMP="zi-home" tabLinkActive={currentRoute.path === '/'}>
        Trang chủ
      </Link>
      <Link
        href="/my-order"
        animate={false}
        tabLinkActive={currentRoute.path.startsWith('/my-order')}
      >
        <IconOrder />
        Đơn hàng
      </Link>
      <Link
        animate={false}
        href="/store-following"
        tabLinkActive={currentRoute.path.startsWith('/store-following')}
      >
        <IconOA />
        OA theo dõi
      </Link>
    </Tabbar>
  );
}

export default NavigationBar;
