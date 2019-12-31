import translations from "./translations";
import currencies from "./currencies";
import dayjs from "dayjs";

export default {
  code: "fr-fr",
  language: "fr",
  direction: "ltr",
  date: {
    DateClass: dayjs
  },
  thousandsSep: ",",
  decimalPoint: ".",
  number(num) {
    return num;
  },
  currencies,
  defaultCurrency: currencies.EUR,
  translations
};
