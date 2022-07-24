function getYearAndMonth(dateObj) {
  return { year: dateObj.getFullYear(), month: dateObj.getMonth() + 1 };
}

function convertDateString(dateObj) {
  return dateObj.toISOString().split('T')[0];
}

function getFirstDateOfMonth(dateObj) {
  const { year, month } = getYearAndMonth(dateObj);
  return new Date(year, month - 1, 1);
}

function getLastDateOfMonth(dateObj) {
  const { year, month } = getYearAndMonth(dateObj);
  return new Date(year, month, 0);
}

export default {
  getYearAndMonth,
  convertDateString,
  getFirstDateOfMonth,
  getLastDateOfMonth,
};
