import { env } from "../../code/configs";
import common from "../../code/locales/default";
import localeMaps from "../../code/locales/locale_maps";
const variableRegex = /([{]+[{])\w+([}]+[}])/g;

export const detectLocaleFromUrlPath = ({ urlPath }) => {
  let locale = env.DEFAULT_LOCALE;
  if (urlPath) {
    locale = urlPath.split("/")[1];
  }
  return locale;
};

export const getLocaleConfig = (code) => {
  return {
    ...common,
    ...localeMaps[code]
  };
};

export const __ = (query, param, locale) => {
  const code = locale.getLocaleCode();
  const config = getLocaleConfig(code);
  const LocaleLang = config.translations;

  let sentences = LocaleLang[query] === undefined ? query : LocaleLang[query];

  let variables;
  try {
    variables = query.match(variableRegex);
  } catch (err) {
    variables = undefined;
  }
  variables &&
    variables.map((e) => {
      const varName = e.replace(/{{|}}/g, "");
      sentences = sentences.replace(e, param[varName]);
      return true;
    });
  return sentences;
};

export const numberFormat = (
  num,
  { decimals, decimalPoint, thousandsSep, pad }
) => {
  let res = typeof num === "undefined" ? "" : num;

  if (typeof decimals !== "undefined" && typeof num === "number") {
    res = num.toFixed(decimals);
  }

  res = res.toString();
  if (typeof thousandsSep !== "undefined") {
    res = res.split(".");
    res[0] = res[0].replace(/(.)(?=(\d{3})+$)/g, `$1${thousandsSep}`);
    res = res.join(decimalPoint);
  }

  if (pad && res.length < pad) {
    let l = pad - res.length;
    for (let i = 0; i < l; i += 1) {
      res = "0" + res;
    }
  }

  return res.replace(/\./g, decimalPoint || ".");
};
