function convertDateString(date) {
  return date.toLocaleDateString().split(/\.\ */).slice(0, -1).join('-');
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month - 1);
}

function getLastDayOfMonth(year, month) {
  return new Date(year, month, 0);
}

module.exports = {
  convertDateString,
  getFirstDayOfMonth,
  getLastDayOfMonth,
};
