import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './views';

hydrateRoot(document.querySelector('#app'), <App />);
