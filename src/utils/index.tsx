import { DopplerIntlProvider } from "../components/i18n/DopplerIntlProvider";
import { FormattedNumber } from "react-intl";

export const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const addDays = (date: Date, days: number) => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
};

export const getFirstDayOfLastMonth = (date: Date) => {
  date.setUTCDate(0);
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);

  return date;
};

export const getFirstDayMonth = (date: Date) => {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);

  return date;
};

export function getStartOfDate(date: Date) {
  return typeof date.getMonth === "function"
    ? new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    : undefined;
}

export const getFormatedNumber = (
  value: number,
  format: "currency" | "percent" | "unit" | "decimal" | undefined,
  currency: string | undefined,
) => {
  return currency ? (
    <DopplerIntlProvider>
      <FormattedNumber value={value} style={format} currency={currency} />
    </DopplerIntlProvider>
  ) : (
    <DopplerIntlProvider>
      <FormattedNumber value={value} style={format} />
    </DopplerIntlProvider>
  );
};
