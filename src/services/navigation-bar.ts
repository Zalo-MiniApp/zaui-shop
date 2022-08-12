import api from 'zmp-sdk';
import { statusBarColor, textStatusBarColor } from '../constants/referrence';

// eslint-disable-next-line import/prefer-default-export
export const changeStatusBarColor = (type?: 'primary' | 'secondary') => {
  if (!type) type = 'primary';
  api.setNavigationBarColor({
    color: '',
    statusBarColor: statusBarColor[type],
    textColor: textStatusBarColor[type] as 'white' | 'black',
  });
};
