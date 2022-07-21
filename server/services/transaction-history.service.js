import CustomException from '../common/custom-exception';
import transactionHistoryModel from '../models/transaction-history.model';
import {
  convertDateString,
  getFirstDayOfMonth,
  getLastDayOfMonth,
} from '../utils/date.util';

const transactionHistoryService = {
  async createTransactionHistory(createTransactionHistoryDto) {
    await transactionHistoryModel.create(createTransactionHistoryDto);
  },

  async updateTransactionHistory(
    transactionHistoryId,
    updateTransactionHistoryDto,
  ) {
    const isExist = await transactionHistoryModel.findById(
      transactionHistoryId,
    );
    if (!isExist) {
      throw new CustomException(404, '수입/지출 내역을 찾을 수 없습니다.');
    }
    await transactionHistoryModel.update(
      transactionHistoryId,
      updateTransactionHistoryDto,
    );
  },

  async removeTransactionHistory(transactionHistoryId) {
    const isExist = await transactionHistoryModel.findById(
      transactionHistoryId,
    );
    if (!isExist) {
      throw new CustomException(404, '결제 방식을 찾을 수 없습니다.');
    }
    await transactionHistoryModel.remove(transactionHistoryId);
  },

  async getTranscationHistoriesByMonth(year, month) {
    const startDate = convertDateString(getFirstDayOfMonth(year, month));
    const endDate = convertDateString(getLastDayOfMonth(year, month));

    const transactionHistories = await transactionHistoryModel.findAllInPeriod(
      startDate,
      endDate,
    );
    return transactionHistories;
  },

  async getTranscationHistoriesByCategory(
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
  },
};

export default transactionHistoryService;
