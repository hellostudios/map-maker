import { Navigate, useRoutes } from 'react-router-dom';
import ErrorPage from "../pages/ErrorPage";
import Map from "../pages/Map";
import Home from "../pages/Home";

export default function Router() {
  const routes = [
    { path: '/', element: <Home /> },
    // Map Routes
    { path: '/map/:id', element: <Map /> },
    {
      path: '*',
      children: [
        { path: '404', element: <ErrorPage /> }, // globally error page
        { path: '*', element: <Navigate to="/404" /> },
      ],
    }
  ];

  return useRoutes(routes);
}
