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
        path: '/register2',
        index: false,
        element: <Register2 />,
      },
      {
        path: '/sing-in',
        index: false,
        element: <SingIn />,
      },
      {
        path: '/recovery',
        index: false,
        element: <Recovery />
      },
      {
        path: '/recoverySuccess',
        index: false,
        element: <RecoverySuccess />
      },
      {
        path: '/recoveryMsg',
        index: false,
        element: <RecoveryMsg />
      },
      {
        // loader de carga
        path: '/LoginSuccess',
        index: false,
        element: <LoadingScreen />
      },
      {
        // TODO corregir css 
        path: '/dashboard',
        index: false,
        element: <Dashboard/>,
        children: [
          {
            path: 'home',
            element: <Home/>
          },
          {
            path: 'search',
            element: <Search/>
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
        index: false,
        element: <CupidoMusical/>,
      },
    ],
  },
]);
