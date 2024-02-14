import React from 'react';
import ReactDOM from 'react-dom/client';
// import { AuthProvider } from './context/AuthProvider';
import { RouterProvider } from "react-router-dom";
import { AppRoutes } from './Routes/AppRoutes';

import './app.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      {/* <AuthProvider> */}
        <RouterProvider router={AppRoutes} />
      {/* </AuthProvider> */}
  </React.StrictMode>,
);
