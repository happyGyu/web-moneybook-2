import Observable from '@/base/observable';
import { MODEL_KEYS } from '@/constants/keys';

export default class Model extends Observable {
  static #instance;

  constructor() {
    if (Model.#instance) {
      return Model.#instance;
    }
    super(MODEL_KEYS);
    Model.#instance = this;
  }

  validateDataKey(key) {
    if (!this.data.has(key)) {
      throw new Error('Data has no key');
    }
  }

  getData(key) {
    this.validateDataKey(key);
    return this.data.get(key);
  }

  setData(key, newData) {
    this.data.set(key, newData);
    this.notify(key);
  }
}
