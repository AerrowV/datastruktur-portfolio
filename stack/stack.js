class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export default class Stack {
  constructor() {
    this.head = null;
    this._size = 0;
  }

  push(data) {
    const node = new Node(data);
    node.next = this.head;
    this.head = node;
    this._size++;
  }

  pop() {
    if (!this.head) {
      return null;
    }

    const data = this.head.data;
    this.head = this.head.next;
    this._size--;
    return data;
  }

  peek() {
    return this.head ? this.head.data : null;
  }

  size() {
    return this._size;
  }

  get(index) {
    if (index < 0 || index >= this._size) return null;

    let node = this.head;

    for (let i = 0; i < index; i++) {
      node = node.next;
    }

    return node ? node.data : null;
  }
}
