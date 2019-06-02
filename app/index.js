import React, { useState } from "react";
import transformer from "../code/modules/membership/transformer";

// generates router from `code/routers/routes` with help of router_helper functions
import RoutersComponent from "./router";

// you can add some global styles in `code/assets/styles/index.scss`
import "../code/assets/styles/index.scss";

import UserContext from "../modules/user_context";

const App = ({ user, userContext }) => {
  const [userData, setUserData] = useState(transformer(user));
  const [userContextData, setUserContextData] = useState(userContext);
  return (
    <UserContext.Provider
      value={{
        context: userContextData,
        user: userData,
        updateUser: (data, context) => {
          setUserData(data);
          setUserContextData(context);
        }
      }}
    >
      <RoutersComponent />
    </UserContext.Provider>
  );
};

export default App;
