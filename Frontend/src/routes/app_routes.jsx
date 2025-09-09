import { Navigate } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '@components/layout/AppLayout/AppLayout';

import { Login } from '@features/Login/Login';
import { SignIn } from '@features/SignIn/SignIn';
import { Register } from '@features/Register/Register';
import { Register2 } from '@features/Register/Register2';
import { Recovery } from '@features/Recovery/Recovery';

import { Dashboard } from '@features/Dashboard/Dashboard';
import { Home } from '@features/Home/Home';
import { CupidoMusical } from '@features/CupidoMusical/CupidoMusical';
import { CupidoMusicalPlaylistCreate } from '@features/CupidoMusical/components/CupidoMusicalPlaylistCreate/CupidoMusicalPlaylistCreate';
import { Search } from '@features/Search/Search';

import { RecoverySuccess } from '@features/Auth/components/RecoverySuccess/RecoverySuccess';
import { RecoveryMsg } from '@features/Auth/components/RecoveryMsg/RecoveryMsg';
import { LoadingScreen } from '@components/ui/Loaders/LoadingScreen/LoadingScreen';
import { MusicaContextual } from '@features/MusicaContextual/MusicaContextual';
import { Profile } from '@features/Profile/Profile';


export const app_routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
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
        element: <SignIn />,
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
            // TODO - Hacer funcion de busqueda
            path: 'search',
            element: <Search />
          },
          {
            // TODO - Hacer componente de perfil y amigos
            path: 'profile',
            element: <Profile />
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
      },
      // TODO - Revisar
      {
        path: '/musicaContextual',
        element: <MusicaContextual />,
      }
      //TODO - Ruta para manejar rutas no definidas (404)
    ],
  },
]);
