export default class Observable {
  constructor(keys) {
    this.keys = Object.values(keys);
    this.data = new Map();
    this.observerTable = new Map();
    this.keys.forEach((key) => {
      this.observerTable.set(key, []);
    });
  }

  getObservers(key) {
    if (!this.observerTable.has(key)) {
      throw new Error('Observer has no key');
    }
    return this.observerTable.get(key);
  }

  subscribe(key, observer) {
    const observers = this.getObservers(key);
    observers.push(observer);
    observer.callback(this.data.get(key));
  }

  isAlive(node) {
    return document.body.contains(node);
  }

  filterDeadObserver(key) {
    const filteredObservers = this.getObservers(key).filter((observer) =>
      this.isAlive(observer.node),
    );
    this.observerTable.set(key, filteredObservers);
  }

  unsubscribe() {
    this.keys.forEach((key) => this.filterDeadObserver(key));
  }

  notify(key) {
    this.filterDeadObserver(key);
    this.getObservers(key).forEach((observer) => {
      observer.callback(this.data.get(key));
    });
  }
}
