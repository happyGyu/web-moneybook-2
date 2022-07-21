import CustomException from '../common/custom-exception';
import paymentMethodModel from '../models/payment-method.model';

const paymentMethodService = {
  async getAllPaymentMethods() {
    const paymentMethods = await paymentMethodModel.findAll();
    return paymentMethods;
  },

  async createPaymentMethod(createPaymentMethodDto) {
    await paymentMethodModel.create(createPaymentMethodDto);
  },

  async updatePaymentMethod(paymentMethodId, updatePaymentMethodDto) {
    const isExist = await paymentMethodModel.findById(paymentMethodId);
    if (!isExist) {
      throw new CustomException(404, '결제 방식을 찾을 수 없습니다.');
    }
    await paymentMethodModel.update(paymentMethodId, updatePaymentMethodDto);
  },

  async removePaymentMethod(paymentMethodId) {
    const isExist = await paymentMethodModel.findById(paymentMethodId);
    if (!isExist) {
      throw new CustomException(404, '결제 방식을 찾을 수 없습니다.');
    }
    await paymentMethodModel.remove(paymentMethodId);
  },
};

export default paymentMethodService;
