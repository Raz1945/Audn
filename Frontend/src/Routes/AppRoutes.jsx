import { Navigate } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { Login } from '../components/Login/Login';
import { Register } from '../components/Register/Register';
import { Register2 } from '../components/Register/Register2';
import { SingIn } from '../components/SingIn/SingIn';
import { LoadingScreen } from '../components/Loaders/LoadingScreen/LoadingScreen';
import { Recovery } from '../components/Recovery/Recovery';
import { RecoverySuccess } from '../components/Loaders/RecoverySuccess/RecoverySuccess';
import { RecoveryMsg } from '../components/Loaders/RecoveryMsg/RecoveryMsg';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { Home } from '../components/Home/Home';
import { CupidoMusical } from '../Components/CupidoMusical/CupidoMusical';
import { Search } from '../components/Search/Search';
import { CupidoMusicalPlaylistCreate } from '../components/CupidoMusical/CupidoMusicalPlaylistCreate/CupidoMusicalPlaylistCreate';


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
            // TODO - Hacer componente de perfil y amigos
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
      {
        path: '/dashboard/profile/cupidoMusical/pl',
        element: <CupidoMusicalPlaylistCreate />,
      }
      //TODO - Ruta para manejar rutas no definidas (404)
    ],
  },
]);
