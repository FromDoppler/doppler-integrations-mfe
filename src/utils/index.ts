export const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const addDays = (date: Date, days: number) => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
};

export const getFirstDayOfLastMonth = (date: Date) => {
  date.setDate(0);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);

  return date;
};

export const getFirstDayMonth = (date: Date) => {
  date.setDate(1);
  date.setHours(0, 0, 0, 0);

  return date;
};
