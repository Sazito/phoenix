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
    format: "{{num}} {{glyph}} {{unit}}",
    calc(num) {
      return num;
    }
  }
};
