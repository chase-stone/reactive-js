export class Observable {
  #subscribers;
  constructor() {
    this.#subscribers = [];
  }

  subscribe(fn) {
    const i = this.#subscribers.indexOf(fn);
    if (i < 0) {
      this.#subscribers.push(fn);
    }
  }

  unsubscribe(fn) {
    const i = this.#subscribers.indexOf(fn);
    if (i >= 0) {
      const lastSub = this.#subscribers[this.#subscribers.length - 1];
      this.#subscribers[i] = lastSub;
      this.#subscribers.pop();
    }
  }

  notify(data) {
    for (let i = 0; i < this.#subscribers.length; i++) {
      const sub = this.#subscribers[i];
      sub(data);
    }
  }
}