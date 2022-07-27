// Import React and ReactDOM
import React from 'react';
import { createRoot } from 'react-dom/client';

import ZMP from 'zmp-framework/core/lite-core';

// Import ZMP-React Plugin
import ZMPReact from 'zmp-framework/react/lite';


// Import tailwind styles
import './css/styles.css';

// Import ZMP Styles
import 'zmp-framework/zmp-bundle.min.css';
import Input from 'zmp-framework/core/modules/input';
import Form from 'zmp-framework/core/modules/form';
import View from 'zmp-framework/core/modules/view';
import List from 'zmp-framework/core/modules/list';
import VirtualList from 'zmp-framework/core/modules/virtual-list';
import Sheet from 'zmp-framework/core/modules/sheet';
import Searchbar from 'zmp-framework/core/modules/searchbar';

// Import Icons and App Custom Styles
import './css/icons.css';
import './css/app.scss';

// Import App Component
import App from './components/app';
import appConfig from '../app-config.json';

if (!(window as any).APP_CONFIG) {
  (window as any).APP_CONFIG = appConfig
}

// Init ZMP React Plugin
ZMP.use([ZMPReact, Input, Form, View, List, VirtualList,Sheet, Searchbar])

// Mount React App
createRoot(document.getElementById('app')!).render(React.createElement(App));
