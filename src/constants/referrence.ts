import appConfig from '../../app-config.json';

export const StoreTypeRef = {
  personal: 'Cá nhân',
  business: 'Doanh nghiệp',
};

export const OrderStatusRef = {
  pending: 'Chưa hoàn thành',
  shipping: 'Đang vận chuyển',
  finish: 'Hoàn thành',
};

export const statusBarColor = {
  primary: appConfig.app.statusBarColor,
  secondary: '#FFFFFF',
};

export const textStatusBarColor = {
  primary: appConfig.app.textColor,
  secondary: 'black',
};
