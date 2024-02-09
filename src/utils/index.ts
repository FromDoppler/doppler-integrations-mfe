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
    ? new Date(date.getFullYear(), date.getMonth(), date.getDate())
    : undefined;
}
