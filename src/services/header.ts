import { HeaderType } from '../models';
import store from '../store';
import appConfig from '../../app-config.json';

export const setHeader = ({
  route = '',
  hasLeftIcon = true,
  rightIcon = null,
  title = appConfig.app.title,
  customTitle = null,
  type = 'primary',
}: HeaderType) => {
  store.dispatch('setHeader', { route, hasLeftIcon, rightIcon, title, customTitle, type });
};

export default setHeader;
