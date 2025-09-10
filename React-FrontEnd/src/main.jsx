import React from 'react';
import ReactDOM from 'react-dom/client';
import ScrollToTop from './ScrollToTop';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
