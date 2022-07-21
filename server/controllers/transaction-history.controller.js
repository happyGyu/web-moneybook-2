import transactionHistoryService from '../services/transaction-history.service';

const transactionHistoryController = {
  async getTranscationHistoriesByMonth(req, res) {
    const { year, month } = req.query;
    const transactionHistories =
      await transactionHistoryService.getTranscationHistoriesByMonth(
        year,
        month,
      );
    res.status(200).json({
      statusCode: 200,
      data: transactionHistories,
    });
  },

  async getTransactionHistoriesByCategory(req, res) {
    const { startDate, endDate, categoryId } = req.query;
    const transactionHistories =
      await transactionHistoryService.getTranscationHistoriesByCategory(
        startDate,
        endDate,
        categoryId,
      );
    res.status(200).json({
      statusCode: 200,
      data: transactionHistories,
    });
  },

  async createTransactionHistory(req, res) {
    const createTransactionHistoryDto = req.body;
    await transactionHistoryService.createTransactionHistory(
      createTransactionHistoryDto,
    );
    res.status(201).json({
      statusCode: 201,
    });
  },

  async updateTransactionHistory(req, res) {
    const { id: transactionHistoryId } = req.params;
    const updateTransactionHistoryDto = req.body;
    await transactionHistoryService.updateTransactionHistory(
      transactionHistoryId,
      updateTransactionHistoryDto,
    );
    res.status(201).json({
      statusCode: 201,
    });
  },

  async removeTransactionHistroy(req, res) {
    const { id: transactionHistoryId } = req.params;
    await transactionHistoryService.removeTransactionHistory(
      transactionHistoryId,
    );
    res.status(201).json({
      statusCode: 201,
    });
  },
};

export default transactionHistoryController;
