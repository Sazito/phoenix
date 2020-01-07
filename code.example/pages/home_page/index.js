import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import Logo from "../../components/logo";
import { pHome } from "./home_page.scss";
import { getPost } from "../../redux/posts/actions";
import { env } from "../../configs";
import Loading from "../../components/loading";
import { withLocale } from "../../../modules/localization";

const mapStateToProps = state => {
  return {
    isFetched: state.posts.isFetched,
    isLoading: state.posts.isLoading,
    post: state.posts.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetPost: () => {
      return dispatch(getPost());
    }
  };
};

const HomePage = ({ onGetPost, isFetched, isLoading, post, locale }) => {
  useEffect(() => {
    !isFetched && onGetPost();
  }, []);

  const { __ } = locale;

  return (
    <>
      <Helmet>
        <title>{env.APP_NAME}</title>
      </Helmet>
      {isLoading && <Loading />}
      <div className={pHome}>
        {!isLoading && post && (
          <div>
            <Logo />
            <div>{__("Hello")}</div>
          </div>
        )}
      </div>
    </>
  );
};

const HomePageWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

export default withLocale(HomePageWrapper);
