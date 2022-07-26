export function calTotalIncomeAndSpent(transactionHistories) {
  const totalSum = transactionHistories.reduce(
    (sum, history) => {
      if (history.isIncome) {
        sum.incomeHistoryCnt++;
        sum.totalIncomeAmount += history.amount;
      } else {
        sum.spentHistoryCnt++;
        sum.totalSpentAmount += history.amount;
      }
      return sum;
    },
    {
      totalIncomeAmount: 0,
      incomeHistoryCnt: 0,
      totalSpentAmount: 0,
      spentHistoryCnt: 0,
    },
  );
  return totalSum;
}
