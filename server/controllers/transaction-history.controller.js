import transactionHistoryService from '../services/transaction-history.service';
import { STATUS_CODE } from '../constants/status-code.constant';

const transactionHistoryController = {
  async getTranscationHistoriesByMonth(req, res, next) {
    try {
      const { year, month } = req.query;
      const transactionHistories =
        await transactionHistoryService.getTranscationHistoriesByMonth(
          year,
          month,
        );
      res.status(STATUS_CODE.OK).json({
        statusCode: STATUS_CODE.OK,
        data: transactionHistories,
      });
    } catch (error) {
      next(error);
    }
  },

  async getTransactionHistoriesByCategory(req, res, next) {
    try {
      const { startDate, endDate, categoryId } = req.query;
      const transactionHistories =
        await transactionHistoryService.getTranscationHistoriesByCategory(
          startDate,
          endDate,
          categoryId,
        );
      res.status(STATUS_CODE.OK).json({
        statusCode: STATUS_CODE.OK,
        data: transactionHistories,
      });
    } catch (error) {
      next(error);
    }
  },

  async createTransactionHistory(req, res, next) {
    try {
      const createTransactionHistoryDto = req.body;
      const transactionHistory =
        await transactionHistoryService.createTransactionHistory(
          createTransactionHistoryDto,
        );
      res.status(STATUS_CODE.CREATED).json({
        statusCode: STATUS_CODE.CREATED,
        data: transactionHistory,
      });
    } catch (error) {
      next(error);
    }
  },

  async updateTransactionHistory(req, res, next) {
    try {
      const { id: transactionHistoryId } = req.params;
      const updateTransactionHistoryDto = req.body;
      await transactionHistoryService.updateTransactionHistory(
        transactionHistoryId,
        updateTransactionHistoryDto,
      );
      res.status(STATUS_CODE.OK).json({
        statusCode: STATUS_CODE.OK,
      });
    } catch (error) {
      next(error);
    }
  },

  async removeTransactionHistroy(req, res, next) {
    try {
      const { id: transactionHistoryId } = req.params;
      await transactionHistoryService.removeTransactionHistory(
        transactionHistoryId,
      );
      res.status(STATUS_CODE.OK).json({
        statusCode: STATUS_CODE.OK,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default transactionHistoryController;
