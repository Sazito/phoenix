import React, { useContext } from "react";
import LocaleContext from "./locale_context";

const withLocale = (Component) => {
  return (props) => {
    const { locale } = useContext(LocaleContext);
    return <Component {...props} locale={locale} />;
  };
};

export default withLocale;
