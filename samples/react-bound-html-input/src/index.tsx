import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App.js';

const renderApp = () => {
  const root = createRoot(window.document.getElementById('root')!);
  root.render(<App />);
};

renderApp();
