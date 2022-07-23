import CustomException from '../common/custom-exception';
import { STATUS_CODE } from '../constants/status-code.constant';
import { ERROR_MESSAGES } from '../constants/error-message.constant';
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
      throw new CustomException(
        STATUS_CODE.NOT_FOUND,
        ERROR_MESSAGES.PAYMENT_METHOD_NOT_FOUND,
      );
    }
    await paymentMethodModel.update(paymentMethodId, updatePaymentMethodDto);
  },

  async removePaymentMethod(paymentMethodId) {
    const isExist = await paymentMethodModel.findById(paymentMethodId);
    if (!isExist) {
      throw new CustomException(
        STATUS_CODE.NOT_FOUND,
        ERROR_MESSAGES.PAYMENT_METHOD_NOT_FOUND,
      );
    }
    await paymentMethodModel.remove(paymentMethodId);
  },
};

export default paymentMethodService;
