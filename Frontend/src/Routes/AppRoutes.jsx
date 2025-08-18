import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../Components/Layout/Layout';
import { Login } from '../Components/Login/Login';
import { Register } from '../Components/Register/Register';
import { Register2 } from '../Components/Register/Register2';
import { SingIn } from '../Components/SingIn/SingIn';
import { LoadingScreen } from '../Components/Loaders/LoadingScreen/LoadingScreen';
import { Recovery } from '../Components/Recovery/Recovery';
import { RecoverySuccess } from '../Components/Loaders/RecoverySuccess/RecoverySuccess';
import { RecoveryMsg } from '../Components/Loaders/RecoveryMsg/RecoveryMsg';
import { Dashboard } from '../Components/Dashboard/Dashboard';
import Home from '../Components/Home/Home';
import { CupidoMusical } from '../Components/CupidoMusical/CupidoMusical';
import { Search } from '../Components/Search/Search';
import { Navigate } from 'react-router-dom';


export const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/google-login',
        element: <h1>Logueado con Google</h1>,
      },
      {
        path: '/apple-login',
        element: <h1>Logueado con Apple</h1>,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/register2',
        element: <Register2 />,
      },
      {
        path: '/sing-in',
        element: <SingIn />,
      },
      {
        path: '/recovery',
        element: <Recovery />
      },
      {
        path: '/recoverySuccess',
        element: <RecoverySuccess />
      },
      {
        path: '/recoveryMsg',
        element: <RecoveryMsg />
      },
      {
        path: '/LoginSuccess',
        element: <LoadingScreen />
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
          {
            path: 'home',
            element: <Home />
          },
          {
            path: 'search',
            element: <Search />
          },
          {
            path: 'profile',
            element: <h1>Perfil</h1>
          },
          {
            path: 'friends',
            element: <h1>Amigos</h1>
          },
        ],
      },
      {
        path: '/cupidoMusical',
        element: <CupidoMusical />,
      },
    ],
  },
]);
