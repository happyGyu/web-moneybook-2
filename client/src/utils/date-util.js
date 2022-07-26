import { DAY_NAMES } from '../constants/data';

export function getYearAndMonthAndDate(dateObj) {
  return {
    year: dateObj.getFullYear(),
    month: dateObj.getMonth() + 1,
    date: dateObj.getDate(),
  };
}

export function getDayName(dateObj) {
  return DAY_NAMES[dateObj.getDay()];
}

export function convertDateString(dateObj) {
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString();
  const day = dateObj.getDate().toString();
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

export function getFirstDateOfMonth(dateObj) {
  const { year, month } = getYearAndMonthAndDate(dateObj);
  return new Date(year, month - 1, 1);
}

export function getLastDateOfMonth(dateObj) {
  const { year, month } = getYearAndMonthAndDate(dateObj);
  return new Date(year, month, 0);
}
