const CustomException = require('../common/custom-exception');
const transactionHistoryModel = require('../models/transaction-history.model');

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

module.exports = {
  createTransactionHistory,
  updateTransactionHistory,
  removeTransactionHistory,
};
