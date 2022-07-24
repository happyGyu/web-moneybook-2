import store from '@/store';
import { STORE_KEYS } from '@/constants/keys';
import request from '@/utils/api-util';
import dateUtil from '@/utils/date-util';

function changeHeaderMonth(increment) {
  const currDate = store.getData(STORE_KEYS.CURRENT_HEADER_DATE);
  const changedDate = new Date(
    currDate.setMonth(currDate.getMonth() + increment),
  );
  store.setData(STORE_KEYS.CURRENT_HEADER_DATE, changedDate);
}

function changeInputData(dataKey, data) {
  const currInputData = store.getData(STORE_KEYS.INPUT_BAR_DATA);
  const updatedData = { ...currInputData };
  updatedData[dataKey] = data;
  store.setData(STORE_KEYS.INPUT_BAR_DATA, updatedData);
}

async function createNewTransactionHistory(event) {
  event.preventDefault();
  const currInputData = store.getData(STORE_KEYS.INPUT_BAR_DATA);
  const { title, date, category, paymentMethod, isIncome, amount } =
    currInputData;
  const formattedDate = dateUtil.convertDateString(date);
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
}

const controller = {
  decreaseMonth: () => changeHeaderMonth(-1),
  increaseMonth: () => changeHeaderMonth(1),
  changeInputData: (key, data) => changeInputData(key, data),
  createNewTransactionHistory,
};

export default controller;
