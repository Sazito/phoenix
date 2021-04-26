import React, { useState } from "react";
import transformer from "../code/modules/membership/transformer";
import { changeLocale } from "../modules/localization/change_locale";

// generates router from `code/routers/routes` with help of router_helper functions
import RoutersComponent from "./router";

// you can add some global styles in `code/assets/styles/index.scss`
import "../code/assets/styles/index.scss";

import UserContext from "../modules/user_context";
import { createLocale, LocaleContext } from "../modules/localization";
import { withRouter } from "react-router-dom";

const App = ({ user, userContext, history, locale }) => {
  const [userData, setUserData] = useState(transformer(user));
  const [theLocale, setLocale] = useState(locale);
  const [userContextData, setUserContextData] = useState(userContext);
  return (
    <LocaleContext.Provider
      value={{
        locale: theLocale,
        changeLocale: (localeCode) => {
          const newLocale = createLocale({ localeCode });
          changeLocale({ locale: newLocale, history });
          setLocale(newLocale);
        }
      }}
    >
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
    </LocaleContext.Provider>
  );
};

export default withRouter(App);
