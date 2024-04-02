import React from 'react';
import ReactDOM from 'react-dom/client';
import {DCRouterProvider} from "./router";
import './assets/styles/index.scss';

const mountDestination = document.getElementById('root');
const root = ReactDOM.createRoot(mountDestination);
root.render(<DCRouterProvider />);
