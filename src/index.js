import React from 'react';
import ReactDOM from 'react-dom/client';
import {DCRouterProvider} from "./router";

const mountDestination = document.getElementById('root');
const root = ReactDOM.createRoot(mountDestination);
root.render(<DCRouterProvider />);
