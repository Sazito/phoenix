import { env } from "../../code/configs";
import { REGEXP_LOCALE_AND_COUNTRY_CODE, REGEXP_LOCALE_CODE } from "./consts";

export const calculateLocale = req => {
  return req ? calculateLocaleOnServer(req) : calculateLocaleOnClient();
};

export const checkParts = url => {
  let localeCode = "";
  let urlParts;
  if (env.BASEPATH !== "") {
    urlParts = url.split(env.BASEPATH);
    urlParts =
      typeof urlParts === "object" && urlParts.length > 0 && urlParts[0];
    // if length of urlParts is grater than one
    // so we have a locale part
    localeCode = urlParts.replace(/\//g, "").toLowerCase();
  } else if (url) {
    urlParts = url.split("/");
    urlParts = urlParts.filter(record => record !== "");
    let urlFirstPart =
      typeof urlParts === "object" && urlParts.length > 0 && urlParts[0];

    if (urlFirstPart && urlFirstPart.length > 0) {
      urlFirstPart = urlFirstPart.replace(/\//g, "").toLowerCase();
      if ((urlFirstPart.length === 5 && !localeCode) || localeCode === null) {
        localeCode = urlFirstPart.match(REGEXP_LOCALE_AND_COUNTRY_CODE) || "";
      }
      if (urlFirstPart.length === 2 && (!localeCode || localeCode === null)) {
        localeCode = urlFirstPart.match(REGEXP_LOCALE_CODE) || "";
      }
      if (localeCode && typeof localeCode === "object") {
        localeCode = localeCode[0];
      }
    }
  }
  return localeCode;
};

export const calculateLocaleOnClient = () => {
  let localeCode = "";
  if (typeof window === "object" && "location" in window) {
    const url = window.location.pathname;
    localeCode = checkParts(url);
  }
  return localeCode;
};

export const calculateLocaleOnServer = req => {
  let localeCode = "";
  if (req) {
    const url = req.originalUrl;
    localeCode = checkParts(url);
  }
  return localeCode;
};
