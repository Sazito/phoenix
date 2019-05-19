import React, { useState } from "react";

// generates router from `code/routers/routes` with help of router_helper functions
import RoutersComponent from "./router";

// you can add some global styles in `code/assets/styles/index.scss`
import "../code/assets/styles/index.scss";

import UserContext from "../modules/user_context";

const App = ({ user, userActions }) => {
  const [userData, setUserData] = useState(user);
  const [userActionsData, setUserActionsData] = useState(userActions);
  return (
    <UserContext.Provider
      value={{
        userActions: userActionsData,
        user: userData,
        updateUser: (data, actions) => {
          setUserData(data);
          setUserActionsData(actions);
        }
      }}
    >
      <RoutersComponent />
    </UserContext.Provider>
  );
};

export default App;
