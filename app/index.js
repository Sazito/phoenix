import React, { useState } from "react";
import transformer from "../code/modules/membership/transformer";

// generates router from `code/routers/routes` with help of router_helper functions
import RoutersComponent from "./router";

// you can add some global styles in `code/assets/styles/index.scss`
import "../code/assets/styles/index.scss";

import UserContext from "../modules/user_context";
import { createLocale, LocaleContext } from "../modules/localization";

const App = ({ user, userContext, locale }) => {
  const [userData, setUserData] = useState(transformer(user));
  const [theLocale, setLocale] = useState(locale);
  const [userContextData, setUserContextData] = useState(userContext);
  return (
    <LocaleContext.Provider
      value={{
        locale: theLocale,
        changeLocale: localeCode => {
          const newLocale = createLocale({ localeCode });
          /* */
          if (typeof window === "object" && "document" in window) {
            const dir = newLocale.getDirection();
            const lang = newLocale.getLanguage();
            const html = document.getElementsByTagName("html")[0];
            const links = document.getElementsByTagName("link");
            html.dir = dir;
            html.lang = lang;
            (links || []).forEach(link => {
              link.href = link.href.replace(/-rtl|-ltr/g, `-${dir}`);
            });
          }
          /* */
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

export default App;
