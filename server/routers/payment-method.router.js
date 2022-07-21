import { Router as router } from 'express';

const paymentMethodRouter = router();

paymentMethodRouter.get('/', (req, res) => {
  res.status(200).json({
    statusCode: 200,
  });
});

paymentMethodRouter.post('/', (req, res) => {
  const createPaymentMethodDto = req.body;
  res.status(200).json({
    statusCode: 200,
    createPaymentMethodDto,
  });
});

paymentMethodRouter.patch('/:id', (req, res) => {
  const { id: paymentMethodId } = req.params;
  const updatePaymentMethodDto = req.body;

  res.status(201).json({
    statusCode: 201,
    paymentMethodId,
    updatePaymentMethodDto,
  });
});

paymentMethodRouter.delete('/:id', (req, res) => {
  const { id: paymentMethodId } = req.params;

  res.status(201).json({
    statusCode: 201,
    paymentMethodId,
  });
});

export default paymentMethodRouter;
