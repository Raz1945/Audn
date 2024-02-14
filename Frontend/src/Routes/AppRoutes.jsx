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
        path: '', // Ruta a la página de inicio
        element: <Login />, // Ruta a la página de inicio
        index: true, // Indica que es la página de inicio
        // children: [
        //   { path: '/login', index: true, element: <h1>Login</h1> },
        //   // { path: 'register', index: false, element: <Register /> },
        // ],
        
        // para traer los datos de usuario
        // loader: () => fetch('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'), 
      },
      {
        path: '/home',
        index: false,
        element: <h1>Home</h1>,
      },
      {
        path: '/register',
        index: false,
        element: <Register />,
      },
      {},
    ],
  },
]);
