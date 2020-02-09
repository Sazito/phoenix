import { toEnglishNumber } from "../default/utils";

export default {
  IRR: {
    currencyUnit: "IRR",
    currencyGlyph: "﷼",
    format: " {{num}} {{glyph}}",
    calc(num) {
      return toEnglishNumber(num);
    }
  },
  USD: {
    currencyUnit: "USD",
    currencyGlyph: "$",
    format: " {{num}} {{glyph}} {{unit}}",
    calc(num) {
      return toEnglishNumber(num);
    }
  }
};
