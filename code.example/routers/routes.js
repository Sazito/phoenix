import HomeRoute from './routes/home_route';
import DashboardSettingsRoute from './routes/dashboard_settings_route';
import DashboardProfileRoute from './routes/dashboard_profile_route';
import LoginRoute from './routes/login_route';

import CleanLayout from '../layouts/clean_layout';
import DashboardLayout from '../layouts/dashboard_layout';

const routes = [
  {
    path: '/',
    exact: true,
    component: HomeRoute
  },
  {
    path: '/login',
    component: LoginRoute,
    layout: CleanLayout
  },
  {
    path: '',
    layout: CleanLayout,
    routes: [
      {
        path: '/dashboard',
        layout: DashboardLayout,
        routes: [
          {
            path: "/settings",
            component: DashboardSettingsRoute
          },
          {
            path: "/profile",
            component: DashboardProfileRoute
          }
        ]
      }
    ]
  }
];

export default routes;