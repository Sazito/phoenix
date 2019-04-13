import Loadable from "react-loadable";

const AboutPage = Loadable({
  loader: () => import('../../pages/about_page' /* webpackChunkName: "about" */),
  loading: () => null
});

export default AboutPage;