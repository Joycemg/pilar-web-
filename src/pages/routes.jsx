import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from './layouts/dashboardLayout';
import NotFound from './layouts/notFound';
import Dashboard from './dashboard/dashboard';
import { Todo } from './todo/todo';
import { FetchList } from './fetchList/fetchList';

const Routes = () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Dashboard /> },
        { path: 'todo', element: <Todo /> },
        { path: 'fetch-list', element: <FetchList /> },
      ],
    },
    { path: '/404', element: <NotFound /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);

export default Routes;
