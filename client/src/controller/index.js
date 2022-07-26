import store from '@/store';
import { STORE_KEYS } from '@/constants/keys';
import request from '@/utils/api-util';
import { convertDateString } from '@/utils/date-util';

function changeHeaderMonth(increment) {
  const currDate = store.getData(STORE_KEYS.CURRENT_HEADER_DATE);
  const changedDate = new Date(
    currDate.setMonth(currDate.getMonth() + increment),
  );
  store.setData(STORE_KEYS.CURRENT_HEADER_DATE, changedDate);
}

function changeInputData(dataKey, data, options) {
  const currInputData = store.getData(STORE_KEYS.INPUT_BAR_DATA);
  const updatedData = { ...currInputData };
  updatedData[dataKey] = data;
  store.setData(STORE_KEYS.INPUT_BAR_DATA, updatedData, options);
  const isInputBarValid = checkInputBarDataValidity(updatedData);
  store.setData(STORE_KEYS.IS_INPUT_BAR_VALID, isInputBarValid);
}

function checkInputBarDataValidity(inputBarData) {
  return Object.values(inputBarData).every(
    (value) => value !== null && value !== '',
  );
}

async function createNewTransactionHistory(event) {
  event.preventDefault();
  const currInputData = store.getData(STORE_KEYS.INPUT_BAR_DATA);
  const { title, date, category, paymentMethod, isIncome, amount } =
    currInputData;
  const formattedDate = convertDateString(date);
  await request.createTransactionHistory(
    title,
    formattedDate,
    category.id,
    paymentMethod.id,
    isIncome,
    amount,
  );
  clearInputBar();
}

function clearInputBar() {
  const clearedInputBarData = {
    title: null,
    date: new Date(),
    category: null,
    paymentMethod: null,
    isIncome: false,
    amount: null,
  };
  store.setData(STORE_KEYS.INPUT_BAR_DATA, clearedInputBarData);
  store.setData(STORE_KEYS.IS_INPUT_BAR_VALID, false);
}

async function addPaymentMethod(title) {
  await request.createPaymentMethods(title);
  const currPaymentMethods = store.getData(STORE_KEYS.PAYMENT_METHODS);
  const updatedPaymentMethods = [
    ...currPaymentMethods,
    { id: new Date(), title },
  ];
  store.setData(STORE_KEYS.PAYMENT_METHODS, updatedPaymentMethods);
}

async function deletePaymentMethod(targetId) {
  await request.removePaymentMethod(targetId);
  const currPaymentMethods = store.getData(STORE_KEYS.PAYMENT_METHODS);
  const updatedPaymentMethods = currPaymentMethods.filter(
    (paymentMethod) => paymentMethod.id !== parseInt(targetId),
  );
  store.setData(STORE_KEYS.PAYMENT_METHODS, updatedPaymentMethods);
}

const controller = {
  decreaseMonth: () => changeHeaderMonth(-1),
  increaseMonth: () => changeHeaderMonth(1),
  changeInputData: (key, data, options) => changeInputData(key, data, options),
  createNewTransactionHistory,
  addPaymentMethod,
  deletePaymentMethod,
};

export default controller;
