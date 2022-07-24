import store from '@/store';
import { MODEL_KEYS } from '@/constants/keys';

function changeHeaderMonth(increment) {
  const currDate = store.getData(MODEL_KEYS.CURRENT_HEADER_DATE);
  const changedDate = new Date(
    currDate.setMonth(currDate.getMonth() + increment),
  );
  store.setData(MODEL_KEYS.CURRENT_HEADER_DATE, changedDate);
}

const controller = {
  decreaseMonth: () => changeHeaderMonth(-1),
  increaseMonth: () => changeHeaderMonth(1),
};

export default controller;
