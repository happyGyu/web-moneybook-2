const CustomException = require('../common/custom-exception');
const transactionHistoryModel = require('../models/transaction-history.model');
const {
  convertDateString,
  getFirstDayOfMonth,
  getLastDayOfMonth,
} = require('../utils/date.util');

async function createTransactionHistory(createTransactionHistoryDto) {
  await transactionHistoryModel.create(createTransactionHistoryDto);
}

async function updateTransactionHistory(
  transactionHistoryId,
  updateTransactionHistoryDto,
) {
  const isExist = await transactionHistoryModel.findById(transactionHistoryId);
  if (!isExist) {
    throw new CustomException(404, '수입/지출 내역을 찾을 수 없습니다.');
  }
  await transactionHistoryModel.update(
    transactionHistoryId,
    updateTransactionHistoryDto,
  );
}

async function removeTransactionHistory(transactionHistoryId) {
  const isExist = await transactionHistoryModel.findById(transactionHistoryId);
  if (!isExist) {
    throw new CustomException(404, '결제 방식을 찾을 수 없습니다.');
  }
  await transactionHistoryModel.remove(transactionHistoryId);
}

async function getTranscationHistoriesByMonth(year, month) {
  const startDate = convertDateString(getFirstDayOfMonth(year, month));
  const endDate = convertDateString(getLastDayOfMonth(year, month));

  const transactionHistories = await transactionHistoryModel.findAllInPeriod(
    startDate,
    endDate,
  );
  return transactionHistories;
}

async function getTranscationHistoriesByCategory(
  startDate,
  endDate,
  targetCategoryId,
) {
  const transactionHistories = await transactionHistoryModel.findAllInPeriod(
    startDate,
    endDate,
  );

  return transactionHistories.filter(
    ({ categoryId }) => categoryId === parseInt(targetCategoryId),
  );
}

module.exports = {
  createTransactionHistory,
  updateTransactionHistory,
  removeTransactionHistory,
  getTranscationHistoriesByMonth,
  getTranscationHistoriesByCategory,
};
