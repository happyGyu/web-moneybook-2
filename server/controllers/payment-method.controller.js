import paymentMethodService from '../services/payment-method.service';

const paymentMethodController = {
  async getAllPaymentMethod(req, res) {
    const paymentMethods = await paymentMethodService.getAllPaymentMethods();
    res.status(200).json({
      statusCode: 200,
      data: paymentMethods,
    });
  },

  async createPaymentMethod(req, res) {
    const createPaymentMethodDto = req.body;
    await paymentMethodService.createPaymentMethod(createPaymentMethodDto);
    res.status(200).json({
      statusCode: 200,
    });
  },

  async updatePaymentMethod(req, res) {
    const { id: paymentMethodId } = req.params;
    const updatePaymentMethodDto = req.body;

    await paymentMethodService.updatePaymentMethod(
      paymentMethodId,
      updatePaymentMethodDto,
    );
    res.status(201).json({
      statusCode: 201,
    });
  },

  async removePaymentMethod(req, res) {
    const { id: paymentMethodId } = req.params;
    await paymentMethodService.removePaymentMethod(paymentMethodId);

    res.status(201).json({
      statusCode: 201,
    });
  },
};

export default paymentMethodController;
