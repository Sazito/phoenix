import translations from "./translations";
import currencies from "./currencies";
import dayjs from "dayjs";
import { convertToPersianNumbers } from "./utils";

export default {
  code: "fa-ir",
  language: "fa",
  direction: "rtl",
  date: {
    DateClass: dayjs
  },
  thousandsSep: "\u066B",
  decimalPoint: "/",
  number(num) {
    return convertToPersianNumbers(num);
  },
  currencies,
  defaultCurrency: currencies.IRR,
  translations
};
