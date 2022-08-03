import { HeaderType } from '../models';
import store from '../store';

const setHeader = ({
  route = '',
  hasLeftIcon = true,
  title = 'ZMP Ecommerce',
  customTitle = null,
  headerColor= '',
  textColor='',
}: HeaderType) => {
  store.dispatch('setHeader', { route, hasLeftIcon, title, customTitle, headerColor,textColor });
};

export default setHeader;
