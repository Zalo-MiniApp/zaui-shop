import Box from 'zmp-framework/react/box';
import Icon from 'zmp-framework/react/icon';
import { useStore, zmp } from 'zmp-framework/react';
import { cx } from '../utils';
import { HeaderType } from '../models';

const Header = () => {
  const {route,hasLeftIcon,title,headerColor,textColor,customTitle}:HeaderType = useStore('header');

  return(
  <div className="sticky top-0 z-50 w-full bg-primary text-white" style={{ backgroundColor: headerColor, color: textColor}}>
    <Box flex alignItems="center" className="h-[42px] pl-5 pr-[110px] gap-3 w-full" m={0}>
      {hasLeftIcon && (
        <Icon
          zmp="zi-arrow-left"
          className=" text-white"
          onClick={() =>
            route
              ? zmp.views.main.router.navigate('/', { animate: false })
              : zmp.views.main.router.back('',{animate:false})
          }
          style={{color: textColor}}
        />
      )}
      {customTitle || (
        <div className={cx('text-lg font-medium')}>{title}</div>
      )}
    </Box>
  </div>
)};

export default Header;
