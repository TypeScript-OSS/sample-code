import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

const renderApp = () => {
  // Note: Must not use useTranslation in this file
  const root = createRoot(window.document.getElementById('root')!);
  root.render(<App />);
};

renderApp();
