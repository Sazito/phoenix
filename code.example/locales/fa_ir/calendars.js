import dayjs from "dayjs";
import jalaliday from "jalaliday";
dayjs.extend(jalaliday);

export default {
  jalali: date => dayjs(date).calendar("jalali"),
  gregory: date => dayjs(date).calendar("gregory")
};
