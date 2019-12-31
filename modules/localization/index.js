import LocaleContext from "./locale_context";
import WithLocale from "./with_locale";
import {
  __,
  detectLocaleFromUrlPath,
  getLocaleConfig,
  numberFormat
} from "./utils";

const createLocale = ({ localeCode, urlPath }) => {
  const code = localeCode || detectLocaleFromUrlPath({ urlPath });
  const config = getLocaleConfig(code);
  const localeNumber = config.number;

  const locale = {
    __: (query, params, givenLocale) => {
      return __(query, params, givenLocale || locale);
    },
    getLocaleCode: () => {
      return code;
    },
    getLanguage: () => {
      return config.language;
    },
    getDirection: () => {
      return config.direction;
    },
    getCurrencies: () => {
      return config.currencies;
    },
    getDefaultCurrency: () => {
      return config.defaultCurrency;
    },
    number(num, { decimals, thousandsSep, pad } = {}) {
      const options = {
        decimalPoint: config.decimalPoint
      };

      if (thousandsSep) {
        options.thousandsSep = config.thousandsSep;
      }

      if (typeof decimals !== "undefined") {
        options.decimals = decimals;
      }

      if (pad) {
        options.pad = pad;
      }

      return localeNumber(numberFormat(num, options));
    },
    currency(num, { decimals, useGlyph, useUnit, currency } = {}) {
      const options = {
        decimalPoint: config.decimalPoint,
        thousandsSep: config.thousandsSep
      };

      const currencyOptions = currency || config.defaultCurrency;

      const { calc, format, currencyGlyph, currencyUnit } = currencyOptions;

      if (typeof decimals !== "undefined") {
        options.decimals = decimals;
      }

      return __(
        format,
        {
          num: localeNumber(numberFormat(calc(num), options)),
          glyph: useGlyph ? currencyGlyph : "",
          unit: useUnit ? currencyUnit : ""
        },
        locale
      );
    }
  };

  return locale;
};
export { createLocale, LocaleContext, WithLocale };
