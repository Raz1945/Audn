import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from '@app/store'
import { app_routes } from '@/routes/app_routes';

import './app.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={app_routes} />
    </Provider>
  </React.StrictMode>,
);
