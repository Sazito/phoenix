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

  const { __, number, currency, date, getCalendars } = locale;

  return (
    <>
      <Helmet>
        <title>{env.APP_NAME}</title>
      </Helmet>
      <div>{currency(1000, { useGlyph: true, useUnit: true })}</div>
      <div>{number(1000)}</div>
      <div>
        {date(new Date("2018 01 01"), { format: "MMMM, YYYY-MM-DD HH:mm" })}
      </div>
      <div>
        {date(new Date("2018 01 01"), {
          format: "MMMM, YYYY-MM-DD HH:mm",
          calendar: getCalendars().gregory
        })}
      </div>
      <div>
        {date(new Date("2018 01 01"), {
          format: "MMMM, YYYY-MM-DD HH:mm",
          native: false
        })}
      </div>
      <div>
        {date(+new Date("2018 01 01"), {
          format: "MMMM, YYYY-MM-DD HH:mm",
          calendar: getCalendars().gregory,
          native: false
        })}
      </div>
      <div>
        {__("Hello")} {__("YES")} {__("TEST {{time}}", { time: "11:30" })}
      </div>
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
    </>
  );
};

const HomePageWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

export default withLocale(HomePageWrapper);
