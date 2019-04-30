import React, { useEffect } from "react";
import { connect } from "react-redux";
import Logo from "../../components/logo";
import { pHome } from "./home_page.scss";
import { getPost } from "../../redux/posts/actions";
import { env } from "../../configs";
import Loading from "../../components/loading";

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

const HomePage = ({ onGetPost, isFetched, isLoading, post }) => {
  useEffect(() => {
    !isFetched && onGetPost();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <div className={pHome}>
        {!isLoading && post && (
          <div>
            <Logo />
            <img src="/myimage" alt="" />
            <div>Welcome to {env.APP_NAME}</div>
            <div>{post.title}</div>
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

export default HomePageWrapper;
