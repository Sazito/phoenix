import React, { useEffect } from "react";
import { connect } from "react-redux";
import Logo from '../../components/logo';
import { pHome } from "./home.scss";
import {getUser} from "../../redux/user/actions";
import { env } from "../../configs";

const mapStateToProps = state => {
  return {
    isFetched: state.user.isFetched,
    isLoading: state.user.isLoading,
    user: state.user.data
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onGetUser: () => {
      return dispatch(getUser())
    }
  }
};

const HomePage = ({ onGetUser, isFetched, isLoading, user }) => {

  useEffect(() => {
    !isFetched && onGetUser();
  },[]);

  return(
    <div className={pHome}>
      {isLoading && 'Loading ...'}
      {!isLoading && user &&
        <div>
          <Logo />
          <div>Welcome to {env.APP_NAME}</div>
          <div>{user.username}</div>
        </div>
      }
    </div>
  )
};

const HomePageWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);

export default HomePageWrapper;