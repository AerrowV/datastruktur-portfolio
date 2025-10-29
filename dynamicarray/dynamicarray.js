import StaticArray from "./staticarray.js";

export default class DynamicArray {
  #array;
  #size;
  #capacity;

  constructor(capacity = 100) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new RangeError("Capacity must be a positive integer");
    }
    this.#array = new StaticArray(capacity);
    this.#size = 0;
    this.#capacity = capacity;
  }

  size() {
    return this.#size;
  }

  capacity() {
    return this.#capacity;
  }

  add(item) {
    if (this.#size == this.#capacity) {
      this.grow();
    }
    this.#array.set(this.#size, item);
    this.#size++;
  }

  get(index) {
    this.#checkIndex(index);
    return this.#array.get(index);
  }

  set(index, item) {
    this.#checkIndex(index);
    this.#array.set(index, item);
  }

  insert(index, item) {
    this.#checkIndexForInsert(index);

    if (this.#size == this.#capacity) {
      this.grow();
    }

    for (let i = this.#size; i > index; i--) {
      this.#array.set(i, this.#array.get(i - 1));
    }

    this.#array.set(index, item);
    this.#size++;
  }

  remove(index) {
    this.#checkIndex(index);

    for (let i = index; i < this.#size - 1; i++) {
      this.#array.set(i, this.#array.get(i + 1));
    }

    this.#array.set(this.#size - 1, undefined);

    this.#size--;
  }

  clear() {
    for (let i = 0; i < this.#size; i++) {
      this.#array.set(i, undefined);
    }
    this.#size = 0;
  }

  grow() {
    const newCapacity = Math.max(1, this.#capacity * 2);
    const newArr = new StaticArray(newCapacity);
    for (let i = 0; i < this.#size; i++) 
        newArr.set(i, this.#array.get(i));
    this.#array = newArr;
    this.#capacity = newCapacity;
  }

  #checkIndex(index) {
    if (!Number.isInteger(index)) {
      throw new RangeError("Index must be an integer");
    }
    if (index < 0 || index >= this.#size) {
      throw new RangeError("Index out of bounds");
    }
  }
  #checkIndexForInsert(index) {
    if (!Number.isInteger(index)) {
      throw new RangeError("Index must be an integer");
    }
    if (index < 0 || index > this.#size) {
      throw new RangeError("Index out of bounds");
    }
  }
}
