import Box from 'zmp-framework/react/box';
import Icon from 'zmp-framework/react/icon';
import { useStore, zmp } from 'zmp-framework/react';
import { cx } from '../utils';
import { HeaderType } from '../models';

const typeColor = {
  primary: {
    headerColor: 'bg-primary',
    textColor: 'text-white',
    iconColor: 'text-white',
  },
  secondary: {
    headerColor: 'bg-white',
    textColor: 'text-black',
    iconColor: 'text-gray-400',
  },
};
const Header = () => {
  const { route, hasLeftIcon, title, customTitle, type }: HeaderType = useStore('header');

  const { headerColor, textColor, iconColor } = typeColor[type! || 'primary'];
  return (
    <div
      className={cx('sticky top-0 z-50 w-ful', headerColor, textColor)}
      // style={{ backgroundColor: headerColor, color: textColor }}
    >
      <Box flex alignItems="center" className="h-[44px] pl-5 pr-[110px] gap-3 w-full" m={0}>
        {hasLeftIcon && (
          <Icon
            zmp="zi-arrow-left"
            className={iconColor}
            onClick={() =>
              route
                ? zmp.views.main.router.navigate('/', { transition: 'zmp-fade' })
                : zmp.views.main.router.back('', { transition: 'zmp-fade' })
            }
          />
        )}
        {customTitle || <div className={cx('text-lg font-medium')}>{title}</div>}
      </Box>
    </div>
  );
};

export default Header;
