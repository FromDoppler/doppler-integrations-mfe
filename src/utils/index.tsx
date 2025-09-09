import { DopplerIntlProvider } from "../components/i18n/DopplerIntlProvider";
import { FormattedNumber } from "react-intl";

const dateRegex: RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;

declare global {
  interface Window {
    displayDopplerNavBar?: (show: boolean) => void;
  }
}

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

export const sanitizeDateStringToIsoFormat = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return dateString;
  }

  if (dateRegex.test(dateString)) {
    return (
      `${date.getUTCFullYear()}` +
      `-${(date.getUTCMonth() + 1).toString().padStart(2, "0")}` +
      `-${date.getUTCDate().toString().padStart(2, "0")}` +
      `T${date.getUTCHours().toString().padStart(2, "0")}` +
      `:${date.getUTCMinutes().toString().padStart(2, "0")}` +
      `:${date.getUTCSeconds().toString().padStart(2, "0")}` +
      `Z`
    );
  }

  return dateString;
};

export const capitalize = (text: string): string =>
  text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
