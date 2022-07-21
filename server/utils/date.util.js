export function convertDateString(date) {
  return date.toLocaleDateString().split(/\.\ */).slice(0, -1).join('-');
}

export function getFirstDayOfMonth(year, month) {
  return new Date(year, month - 1);
}

export function getLastDayOfMonth(year, month) {
  return new Date(year, month, 0);
}
