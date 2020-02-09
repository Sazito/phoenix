import LocaleContext from "./locale_context";
import withLocale from "./with_locale";
import {
  __,
  detectLocaleFromUrlPath,
  getLocaleConfig,
  numberFormat
} from "./utils";
import getRoutes from "../get_route";
import { env } from "../../code/configs";

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
    date(date, { format, calendar, native = true } = {}) {
      const calendarClass = calendar || config.defaultCalendar;
      const theDate = calendarClass(date);
      const theDateWithLocale = native ? theDate.locale(code) : theDate;
      const output = theDateWithLocale.format(format);
      return native ? localeNumber(output) : output;
    },
    getCalendars: () => {
      return config.calendars;
    },
    getDefaultCalendar: () => {
      return config.defaultCalendar;
    },
    getCurrencies: () => {
      return config.currencies;
    },
    getDefaultCurrency: () => {
      return config.defaultCurrency;
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
      ).trim();
    },
    getRoutes: (key, params) => {
      return getRoutes(
        key,
        params,
        "",
        code === env.DEFAULT_LOCALE ? "/" : code
      );
    }
  };

  return locale;
};
export { createLocale, LocaleContext, withLocale };
