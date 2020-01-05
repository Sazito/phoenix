import translations from "./translations";
import currencies from "./currencies";
import calendars from "./calendars";
import dayjs from "dayjs";

export default {
  code: "en-us",
  language: "en",
  direction: "ltr",
  date: {
    DateClass: dayjs
  },
  thousandsSep: ",",
  decimalPoint: ".",
  number: num => num,
  currencies,
  defaultCurrency: currencies.EUR,
  calendars,
  defaultCalendar: calendars.gregory,
  translations
};
