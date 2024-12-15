import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { useAuth } from '@providers/authProvider';
import { ProtectedRoute } from './ProtectedRoute';

import { Login } from '@pages/users';
import { LocalSession, OnlineSession } from '@pages/game-sessions';
import Layout from '@pages/Layout';
import Home from '@pages/Home';

export default function Routes({ children }) {
  const { currentUser } = useAuth();

  const routesForPublic = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/local-game",
      element: <LocalSession />,
    },
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
          path: "/profile",
          element: <div>User Profile</div>,
        },
        {
          path: "/online-game",
          element: <OnlineSession />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
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
