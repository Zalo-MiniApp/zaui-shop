import api from 'zmp-sdk';
import { statusBarColor } from '../constants/referrence';

export const setNavigationBarTitle = (title: string = '') => {
  api.setNavigationBarTitle({ title });
};

export const changeStatusBarColor = (type?: 'primary' | 'secondary') => {
  if (!type) type = 'primary';
  api.setNavigationBarColor({
    color: '',
    statusBarColor: statusBarColor[type],
  });
};
