import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../Components/Layout/Layout';
import { Login } from '../Components/Login/Login';
import { Register } from '../Components/Register/Register';
// import { Login } from '../components/Login/Login';

export const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/login', 
        element: <Login />, 
        index: true, // Indica que es la página de inicio
        // children: [
        //   { path: '/login', index: true, element: <h1>Login</h1> },
        //   // { path: 'register', index: false, element: <Register /> },
        // ],
        // para traer los datos de usuario
        // loader: () => fetch('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'), 
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
        path: '/sing-in',
        index: false,
        element: <h1> Iniciar Sesión</h1>,
      },
    ],
  },
]);
