import store from '@/store';
import { STORE_KEYS } from '@/constants/keys';
import request from '@/utils/api-util';
import { convertDateString } from '@/utils/date-util';
import { INPUT_BAR_KEYS } from '../constants/keys';

function changeHeaderMonth(increment) {
  const headerDate = store.getData(STORE_KEYS.CURRENT_HEADER_DATE);
  headerDate.setMonth(headerDate.getMonth() + increment);
  store.setData(STORE_KEYS.CURRENT_HEADER_DATE, headerDate);
  setCurrentMonthTransactionHistories(headerDate);
  changeInputData(INPUT_BAR_KEYS.DATE, headerDate);
}

async function setCurrentMonthTransactionHistories(currDate) {
  const newTransactionHistories = await request.getTranscationHistoriesByMonth(
    currDate,
  );
  store.setData(STORE_KEYS.TRANSACTION_HISTORIES, newTransactionHistories);
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

async function updateTransactionHistories(event) {
  event.preventDefault();
  const currInputData = store.getData(STORE_KEYS.INPUT_BAR_DATA);
  const inputBarState = store.getData(STORE_KEYS.INPUT_BAR_STATE);

  const updatedTransactionHistories = inputBarState.isEditing
    ? await editTransactionHistory(currInputData)
    : await addNewTransactionHistory(currInputData);
  store.setData(STORE_KEYS.TRANSACTION_HISTORIES, updatedTransactionHistories);
  clearInputBar();
}

async function addNewTransactionHistory(currInputData) {
  const { title, date, category, paymentMethod, isIncome, amount } =
    currInputData;
  const formattedDate = convertDateString(date);
  const createdData = await request.createTransactionHistory(
    title,
    formattedDate,
    category.id,
    paymentMethod.id,
    isIncome,
    amount,
  );
  const currentTransactionHistories = store.getData(
    STORE_KEYS.TRANSACTION_HISTORIES,
  );
  const updatedTransactionHistories = [
    ...currentTransactionHistories,
    createdData,
  ];
  return updatedTransactionHistories;
}

async function editTransactionHistory(currInputData) {
  const { id, title, date, category, paymentMethod, isIncome, amount } =
    currInputData;
  const formattedDate = convertDateString(date);
  const editedData = await request.updateTransactionHistory(
    id,
    title,
    formattedDate,
    category.id,
    paymentMethod.id,
    isIncome,
    amount,
  );
  // 수정 요청에 성공하면 다시 기본값인 create로 변경
  store.setData(STORE_KEYS.INPUT_BAR_STATE, {
    isEditing: false,
    editingId: null,
  });
  const currentTransactionHistories = store.getData(
    STORE_KEYS.TRANSACTION_HISTORIES,
  );
  const updatedTransactionHistories = currentTransactionHistories.map(
    (history) => {
      return history.id === id ? editedData : history;
    },
  );
  return updatedTransactionHistories;
}

async function deleteTransactionHistory() {
  const targetId = store.getData(STORE_KEYS.INPUT_BAR_STATE).editingId;
  await request.removeTransactionHistory(targetId);
  const currentTransactionHistories = store.getData(
    STORE_KEYS.TRANSACTION_HISTORIES,
  );
  const updatedTransactionHistories = currentTransactionHistories.filter(
    (history) => history.id !== parseInt(targetId),
  );
  unsetInputBarEditMode();
  store.setData(STORE_KEYS.TRANSACTION_HISTORIES, updatedTransactionHistories);
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

function setInputBarEditMode(historyData) {
  const {
    id,
    title,
    date: dateString,
    categoryId,
    categoryTitle,
    paymentMethodId,
    paymentMethodTitle,
    isIncome,
    amount,
  } = historyData;
  const newInputBarData = {
    id,
    title,
    amount,
    isIncome,
    date: new Date(dateString),
    category: { id: categoryId, title: categoryTitle },
    paymentMethod: { id: paymentMethodId, title: paymentMethodTitle },
  };
  store.setData(STORE_KEYS.INPUT_BAR_DATA, newInputBarData);
  store.setData(STORE_KEYS.INPUT_BAR_STATE, { isEditing: true, editingId: id });
}

function unsetInputBarEditMode() {
  store.setData(STORE_KEYS.INPUT_BAR_STATE, {
    isEditing: false,
    editingId: null,
  });
  clearInputBar();
}

function changeFilterOptions(filterOption, isFiltered) {
  const currFilterOptions = store.getData(STORE_KEYS.FILTER_OPTIONS);
  const updatedFilterOptions = {
    ...currFilterOptions,
    [filterOption]: isFiltered,
  };
  store.setData(STORE_KEYS.FILTER_OPTIONS, updatedFilterOptions);
}

const controller = {
  decreaseMonth: () => changeHeaderMonth(-1),
  increaseMonth: () => changeHeaderMonth(1),
  changeInputData: (key, data, options) => changeInputData(key, data, options),
  updateTransactionHistories,
  deleteTransactionHistory,
  addPaymentMethod,
  deletePaymentMethod,
  setInputBarEditMode,
  unsetInputBarEditMode,
  changeFilterOptions,
};

export default controller;
