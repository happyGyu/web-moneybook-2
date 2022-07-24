import store from '@/store';
import { STORE_KEYS } from '@/constants/keys';

function changeHeaderMonth(increment) {
  const currDate = store.getData(STORE_KEYS.CURRENT_HEADER_DATE);
  const changedDate = new Date(
    currDate.setMonth(currDate.getMonth() + increment),
  );
  store.setData(STORE_KEYS.CURRENT_HEADER_DATE, changedDate);
}

const controller = {
  decreaseMonth: () => changeHeaderMonth(-1),
  increaseMonth: () => changeHeaderMonth(1),
};

export default controller;
