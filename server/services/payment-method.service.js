const CustomException = require('../common/custom-exception');
const paymentMethodModel = require('../models/payment-method.model');

async function getAllPaymentMethods() {
  const paymentMethods = await paymentMethodModel.findAll();
  return paymentMethods;
}

async function createPaymentMethod(createPaymentMethodDto) {
  await paymentMethodModel.create(createPaymentMethodDto);
}

async function updatePaymentMethod(paymentMethodId, updatePaymentMethodDto) {
  const isExist = await paymentMethodModel.findById(paymentMethodId);
  if (!isExist) {
    throw new CustomException(404, '결제 방식을 찾을 수 없습니다.');
  }
  await paymentMethodModel.update(paymentMethodId, updatePaymentMethodDto);
}

async function removePaymentMethod(paymentMethodId) {
  const isExist = await paymentMethodModel.findById(paymentMethodId);
  if (!isExist) {
    throw new CustomException(404, '결제 방식을 찾을 수 없습니다.');
  }
  await paymentMethodModel.remove(paymentMethodId);
}

module.exports = {
  getAllPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  removePaymentMethod,
};
