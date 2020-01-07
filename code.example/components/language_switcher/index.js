import React, { useContext } from "react";
import LocaleContext from "../../../modules/localization/locale_context";
import { withLocale } from "../../../modules/localization";

const LanguageSwitcher = ({ locale, className }) => {
  const { changeLocale } = useContext(LocaleContext);
  const getLocaleCode = locale.getLocaleCode();

  const onChangeLocale = (e, code) => {
    e.preventDefault();
    if (getLocaleCode !== code) {
      changeLocale(code);
    }
  };

  return (
    <div className={className}>
      <a href="#" onClick={e => onChangeLocale(e, "fr")}>
        FR
      </a>

      <a href="#" onClick={e => onChangeLocale(e, "fa")}>
        FA
      </a>

      <a href="#" onClick={e => onChangeLocale(e, "en")}>
        EN
      </a>
    </div>
  );
};

export default withLocale(LanguageSwitcher);
