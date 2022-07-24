function getYearAndMonth(dateObj) {
  return { year: dateObj.getFullYear(), month: dateObj.getMonth() + 1 };
}

export default {
  getYearAndMonth,
};
