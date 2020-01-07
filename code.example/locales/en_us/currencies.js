export default {
  EUR: {
    currencyUnit: "EUR",
    currencyGlyph: "€",
    format: "{{num}} {{glyph}} {{unit}}",
    calc(num) {
      return num;
    }
  },
  USD: {
    currencyUnit: "USD",
    currencyGlyph: "$",
    format: "{{glyph}} {{num}} {{unit}}",
    calc(num) {
      return num;
    }
  }
};
