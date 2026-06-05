import { DATE_FORMAT } from "@utils";
import dayjs from "dayjs";

export const formatDate = (value: number, format?: string) => {
  return dayjs(value * 1000).format(format || DATE_FORMAT);
};
