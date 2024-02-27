import React from 'react';
import ReactDOM from 'react-dom/client';
// import { AuthProvider } from './context/AuthProvider';
import { Provider } from 'react-redux';
import {store} from './app/store'
import { RouterProvider } from "react-router-dom";
import { AppRoutes } from './Routes/AppRoutes';

import './app.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <AuthProvider> */}
    <Provider store={store}>
      <RouterProvider router={AppRoutes} />
    </Provider>
    {/* </AuthProvider> */}
  </React.StrictMode>,
);
