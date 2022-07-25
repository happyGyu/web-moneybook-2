export function getYearAndMonth(dateObj) {
  return { year: dateObj.getFullYear(), month: dateObj.getMonth() + 1 };
}

export function convertDateString(dateObj) {
  return dateObj.toISOString().split('T')[0];
}

export function getFirstDateOfMonth(dateObj) {
  const { year, month } = getYearAndMonth(dateObj);
  return new Date(year, month - 1, 1);
}

export function getLastDateOfMonth(dateObj) {
  const { year, month } = getYearAndMonth(dateObj);
  return new Date(year, month, 0);
}
