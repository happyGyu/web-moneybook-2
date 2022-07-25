export function calTotalIncomeAndSpent(transactionHistories) {
  const totalSum = transactionHistories.reduce(
    (sum, history) => {
      if (history.isIncome) {
        sum.totalIncome += history.amount;
      } else {
        sum.totalSpent += history.amount;
      }
      return sum;
    },
    { totalIncome: 0, totalSpent: 0 },
  );
  return totalSum;
}
