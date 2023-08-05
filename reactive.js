import { Observable } from "./observable.js";

export class Reactive {
  static #computeFn;
  #value;
  #observable;

  constructor(initialValue) {
    this.#value = initialValue;
    this.#observable = new Observable();
  }

  static computed(fn) {
    const reactive = new Reactive();
    function init() {
      reactive.set(fn());
    }
    
    const prevFn = Reactive.#computeFn;
    Reactive.#computeFn = fn;
    init();
    Reactive.#computeFn = prevFn;

    return reactive;
  }

  get() {
    if (Reactive.#computeFn) {
      this.subscribe(Reactive.#computeFn);
    }
    return this.#value;
  }

  set(newValue) {
    const prev = this.#value;
    const next = newValue;
    this.#value = next;
    const data = { prev, next };
    this.#observable.notify(data);
  }

  update(fn) {
    const newValue = fn(this.#value);
    return this.set(newValue);
  }

  subscribe(fn, immediate) {
    this.#observable.unsubscribe(fn);
    if (immediate) {
      fn(get());
    }
  }

  unsubscribe(fn) {
    this.#observable.unsubscribe(fn);
  }
}