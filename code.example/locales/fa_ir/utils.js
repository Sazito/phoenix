const map = "۰۱۲۳۴۵۶۷۸۹".split("");

const arabicNumbersToFarsiMap = {};

export const convertToPersianNumbers = number => {
  var str;
  var arr;

  if (!number && number !== 0) {
    return "";
  }

  str = arabicNumbersToPersian(number.toString());
  arr = str.split("");

  for (let i = 0; i < arr.length; i++) {
    const char = arr[i];
    if (map[char]) {
      arr[i] = map[char];
    } else if (char === ".") {
      arr[i] = "\u066B";
    }
  }

  return arr.join("");
};

export const arabicNumbersToPersian = value => {
  var arr;

  if (!value) {
    return;
  }

  arr = value.toString().split("");

  for (let i = 0, len = arr.length; i < len; i++) {
    const char = arr[i];
    if (arabicNumbersToFarsiMap[char]) {
      arr[i] = arabicNumbersToFarsiMap[char];
    }
  }

  return arr.join("");
};
