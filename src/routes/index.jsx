import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { useAuth } from '@providers/authProvider';
import { ProtectedRoute } from './ProtectedRoute';

import { Login, Logout } from '@pages/users';
import { GameSessionsInProgress } from '@pages/game-sessions';
import Layout from '@pages/Layout';

export default function Routes({ children }) {
  const { currentUser } = useAuth();

  const routesForPublic = [
    {
      path: "/service",
      element: <div>Service Page</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <div>User Home Page</div>,
        },
        {
          path: "/profile",
          element: <div>User Profile</div>,
        },
        {
          path: "/game-session",
          element: <GameSessionsInProgress />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <div>Home Page</div>,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];

  const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    children: [
      ...routesForPublic,
      ...((currentUser && currentUser.token) ? routesForAuthenticatedOnly : routesForNotAuthenticatedOnly),
    ]
  }]);

  return <RouterProvider router={router} />;
};
