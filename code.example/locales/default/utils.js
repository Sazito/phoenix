const arabicNumbers = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"];
const persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];
const englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export const toEnglishNumber = value => {
  if (!value) {
    return;
  }
  value = value.toString();
  for (var i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
    value = value.replace(new RegExp(persianNumbers[i], "g"), englishNumbers[i])
      .replace(new RegExp(arabicNumbers[i], "g"), englishNumbers[i]);
  }
  value = value.replace(/\D/g,'');
  return value;
}
