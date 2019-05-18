import React, { useState } from "react";

// generates router from `code/routers/routes` with help of router_helper functions
import RoutersComponent from "./router";

// you can add some global styles in `code/assets/styles/index.scss`
import "../code/assets/styles/index.scss";

import UserContext from "../modules/user_context";

const App = ({ user }) => {
  const [userData, setUserData] = useState(user);
  return (
    <UserContext.Provider
      value={{
        user: userData,
        updateUser: data => setUserData(data)
      }}
    >
      <RoutersComponent />
    </UserContext.Provider>
  );
};

export default App;
