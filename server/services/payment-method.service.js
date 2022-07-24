import CustomException from '../common/custom-exception';
import paymentMethodModel from '../models/payment-method.model';
import { STATUS_CODE } from '../constants/status-code.constant';
import { ERROR_MESSAGES } from '../constants/error-message.constant';

const paymentMethodService = {
  async findByIdOrFail(paymentMethodId) {
    const paymentMethod = await paymentMethodModel.findById(paymentMethodId);
    if (!paymentMethod) {
      throw new CustomException(
        STATUS_CODE.NOT_FOUND,
        ERROR_MESSAGES.PAYMENT_METHOD_NOT_FOUND,
      );
    }
    return paymentMethod;
  },

  async getAllPaymentMethods() {
    const paymentMethods = await paymentMethodModel.findAll();
    return paymentMethods;
  },

  async createPaymentMethod(createPaymentMethodDto) {
    await paymentMethodModel.create(createPaymentMethodDto);
  },

  async updatePaymentMethod(paymentMethodId, updatePaymentMethodDto) {
    const paymentMethod = await this.findByIdOrFail(paymentMethodId);
    await paymentMethodModel.update(paymentMethodId, {
      ...paymentMethod,
      ...updatePaymentMethodDto,
    });
  },

  async removePaymentMethod(paymentMethodId) {
    await this.findByIdOrFail(paymentMethodId);
    await paymentMethodModel.remove(paymentMethodId);
  },
};

export default paymentMethodService;
