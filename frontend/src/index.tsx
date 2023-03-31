import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import App from './App';

const container = document.getElementById('app-root')!;

const root = createRoot(container);
root.render(
  <>
    <div className="banner">
      <h1 className="hero-heading" data-test="hero-heading">
        Sheddington Membership Manager
      </h1>
    </div>
    <div className="app-content">
      <App />
    </div>
  </>,
);
