class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  enqueue(data) {
    const node = new Node(data);

    if (!this.head) {
      this.head = node;
      this.tail = node;

    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }

  dequeue() {
    if (!this.head) { 
        return null;
    }

    const data = this.head.data;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    return data;
  }

  peek() {
    return this.head ? this.head.data : null;
  }

  size() {
    let count = 0;
    let node = this.head;
    while (node) {
      count++;
      node = node.next;
    }
    return count;
  }

  get(index) {
    if (index < 0) return null;
    let node = this.head;
    let i = 0;

    while (node && i < index) {
      node = node.next;
      i++;
    }

    return node ? node.data : null;
  }
}
