import HomePage from './routes/home_route';
import AboutPage from './routes/about_route';

const routes = [
  {
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '/about',
    component: AboutPage
  }
];

export default routes;