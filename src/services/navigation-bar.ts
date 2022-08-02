import api from 'zmp-sdk';
import appConfig from '../../app-config.json';

export const matchStatusBar = (sheetOpened: boolean) => {
  api.setNavigationBarColor({
    color: sheetOpened ? '' : appConfig.app.headerColor,
  });
};

export const setNavigationBarTitle = (title: string = '') => {
  api.setNavigationBarTitle({ title });
};
