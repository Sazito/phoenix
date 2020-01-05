import translations from "./translations";
import currencies from "./currencies";
import calendars from "./calendars";
import { convertToPersianNumbers } from "./utils";

export default {
  code: "fa-ir",
  language: "fa",
  direction: "rtl",
  countryCode: "ir",
  calendars,
  defaultCalendar: calendars.jalali,
  thousandsSep: "\u066B",
  decimalPoint: "/",
  number: num => convertToPersianNumbers(num),
  currencies,
  defaultCurrency: currencies.IRR,
  translations
};
