import { Router as router } from 'express';

const transactionHistoryRouter = router();

transactionHistoryRouter.get('/', (req, res) => {
  const { year, month } = req.query;

  res.status(200).json({
    statusCode: 200,
    year,
    month,
  });
});

transactionHistoryRouter.get('/category', (req, res) => {
  const { startDate, endDate, categoryId } = req.query;
  res.status(200).json({
    statusCode: 200,
    startDate,
    endDate,
    categoryId,
  });
});

transactionHistoryRouter.post('/', (req, res) => {
  const createTransactionHistoryDto = req.body;

  res.status(200).json({
    statusCode: 200,
    createTransactionHistoryDto,
  });
});

transactionHistoryRouter.patch('/:id', (req, res) => {
  const { id: transactionHistoryId } = req.params;
  const updateTransactionHistoryDto = req.body;

  res.status(201).json({
    statusCode: 201,
    transactionHistoryId,
    updateTransactionHistoryDto,
  });
});

transactionHistoryRouter.delete('/:id', (req, res) => {
  const { id: transactionHistoryId } = req.params;

  res.status(201).json({
    statusCode: 201,
    transactionHistoryId,
  });
});

export default transactionHistoryRouter;
