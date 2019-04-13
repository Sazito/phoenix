import Loadable from "react-loadable";

const HomePage = Loadable({
  loader: () => import('../../pages/home_page' /* webpackChunkName: "home" */),
  loading: () => null
});

HomePage.fetchData = require('../../pages/home_page/prefetch').default;

export default HomePage;