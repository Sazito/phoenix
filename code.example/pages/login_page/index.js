import React, { useEffect } from "react";
import { connect } from "react-redux";
import { pLogin } from "./login_page.scss";
import { getCurrentUser } from "../../redux/users/actions";
import Loading from "../../components/loading";

const mapStateToProps = state => {
  return {
    isFetched: state.users.isFetched,
    isLoading: state.users.isLoading,
    user: state.users.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetUser: () => {
      return dispatch(getCurrentUser());
    }
  };
};

const LoginPage = ({ onGetUser, isFetched, isLoading, user }) => {
  useEffect(() => {
    !isFetched && onGetUser();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <div className={pLogin}>
        {!isLoading && user && (
          <div>
            <div>Welcome {user.username}</div>
          </div>
        )}
      </div>
    </>
  );
};

const LoginPageWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

export default LoginPageWrapper;
