import React, { useContext } from "react";
import LocaleContext from "./locale_context";

const WithLocale = Component => {
  return props => {
    const { locale, changeLocale } = useContext(LocaleContext);
    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <a href="#" onClick={() => changeLocale("fr")}>
            FR
        </a>
          -
        <a href="#" onClick={() => changeLocale("fa")}>
            FA
        </a>
          -
        <a href="#" onClick={() => changeLocale("en")}>
            EN
        </a>
        </div>
        <Component {...props} locale={locale} />
      </>
    );
  };
};

export default WithLocale;
