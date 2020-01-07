import translations from "./translations";
import currencies from "./currencies";
import calendars from "../default/calendars";

export default {
  code: "en-us",
  language: "en",
  direction: "ltr",
  countryCode: "us",
  thousandsSep: ",",
  decimalPoint: ".",
  number: num => num,
  currencies,
  defaultCurrency: currencies.USD,
  calendars,
  defaultCalendar: calendars.gregory,
  translations
};
