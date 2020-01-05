import React, { useEffect } from "react";
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

  const {
    __,
    number,
    currency
  } = locale;


  return (
    <>
      {isLoading && <Loading />}
      <div className={pHome}>
        {!isLoading && post && (
          <div>
            <Logo />
            <div>Welcome to {env.APP_NAME}</div>
            <div>{post.title}</div>
          </div>
        )}
      </div>
      <div>{currency(1000, { useGlyph: true })}</div>
      <div>{number(1000)}</div>
      <div>
        {__("Hello")} {__("YES")} {__("TEST {{time}}", { time: "11:30" })}
      </div>
    </>
  );
};

const HomePageWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

export default withLocale(HomePageWrapper);
