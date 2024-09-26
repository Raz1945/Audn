import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../Components/Layout/Layout';
import { Login } from '../Components/Login/Login';
import { Register } from '../Components/Register/Register';
import { Register2 } from '../Components/Register/Register2';
import { SingIn } from '../Components/SingIn/SingIn';
import { RegistroExitoso } from '../Components/RegistroExitoso/RegistroExitoso';

export const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/login', 
        element: <Login />, 
        index: true, // Indica que es la página de inicio
      },
      {
        path: '/google-login',
        index: false,
        element: <h1>Logueado con Google</h1>,
      },
      {
        path: '/apple-login',
        index: false,
        element: <h1>Logueado con Apple</h1>,
      },
      {
        path: '/register',
        index: false,
        element: <Register />,
      },
      {
        // TODO msj de error 
        path: '/register2',
        index: false,
        element: <Register2 />,
      },
      {
        // TODO
        path: '/sing-in',
        index: false,
        element: <SingIn/>,
      },
      {
        // loader de carga
        path: '/exitoso',
        index: false,
        element: <RegistroExitoso/>
      },
      {
        path: '/dashboard',
        index: false,
        element: <h1> Welcome to Audn</h1>,
      },
    ],
  },
]);
