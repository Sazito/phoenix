export default {
  IRR: {
    currencyUnit: "IRR",
    currencyGlyph: "﷼",
    format: " {{num}} {{glyph}}",
    calc(num) {
      return num;
    }
  },
  USD: {
    currencyUnit: "USD",
    currencyGlyph: "$",
    format: " {{num}} {{glyph}} {{unit}}",
    calc(num) {
      return num;
    }
  }
};
