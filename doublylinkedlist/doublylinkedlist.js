/**
 * @author Asim Kilic>
 * @author Johan Poulsen>
 */

class Node {
  constructor(data) {
    this.prev = null;
    this.next = null;
    this.data = data;
  }
}

export default class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  size() {
    return this._size;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  getFirstNode() {
    return this.head;
  }

  getLastNode() {
    return this.tail;
  }

  getNextNode(node) {
    return node ? node.next : null;
  }

  getPreviousNode(node) {
    return node ? node.prev : null;
  }

  remove(index) {
    if (index < 0 || index >= this._size) {
      return;
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    if (current.prev) {
      current.prev.next = current.next;
    } else {
      this.head = current.next;
    }
    if (current.next) {
      current.next.prev = current.prev;
    } else {
      this.tail = current.prev;
    }
    this._size--;
    return current.data;
  }

  removeFirst() {
    if (!this.head) {
      return null;
    }

    const data = this.head.data;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }

    this._size--;
    return data;
  }

  removeLast() {
    if (!this.tail) {
      return null;
    }

    const data = this.tail.data;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    this._size--;
    return data;
  }

  removeNode(node) {
    if (!node || !this.head) {
      return null;
    }

    if (node === this.head) {
      return this.removeFirst();
    }

    if (node === this.tail) {
      return this.removeLast();
    }

    const data = node.data;
    node.prev.next = node.next;
    node.next.prev = node.prev;

    this._size--;
    return data;
  }

  printList() {
    if (!this.head) {
      console.log("List is empty");
      return;
    }
    let current = this.head;
    let index = 0;
    while (current) {
      console.log(
        "Node",
        index,
        "Data:",
        current.data,
        "Prev:",
        current.prev ? "Node" : "null",
        "Next:",
        current.next ? "Node" : "null"
      );
      current = current.next;
      index++;
    }
  }

  addLast(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this._size++;
  }

  addFirst(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this._size++;
  }

  get(index) {
    let node = this.head;
    for (let i = 0; i < index; i++) {
      if (!node) {
        return null;
      }
      node = node.next;
    }
    return node ? node.data : null;
  }

  getFirst() {
    return this.head ? this.head.data : null;
  }

  getLast() {
    return this.tail ? this.tail.data : null;
  }

  set(index, data) {
    let node = this.head;
    for (let i = 0; i < index; i++) {
      if (!node) {
        return;
      }
      node = node.next;
    }
    if (node) {
      node.data = data;
    }
  }

  getNode(index) {
    if (index < 0 || index >= this._size) {
      return null;
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }

  insert(index, data) {
    if (index < 0 || index > this._size) {
      return;
    }

    if (index === 0) {
      this.addFirst(data);
      return;
    }

    if (index === this._size) {
      this.addLast(data);
      return;
    }

    const newNode = new Node(data);
    const current = this.getNode(index);

    const prev = current.prev;
    newNode.prev = prev;
    newNode.next = current;
    prev.next = newNode;
    current.prev = newNode;

    this._size++;
  }

  insertBefore(node, data) {
    if (!node || !this.head) {
      return null;
    }

    if (node === this.head) {
      const newNode = new Node(data);
      newNode.next = this.head;
      this.head = newNode;
      return newNode;
    }

    const prev = this.getPreviousNode(node);
    if (!prev) {
      return null;
    }

    const newNode = new Node(data);
    newNode.next = node;
    prev.next = newNode;
    return newNode;
  }

  insertAfter(node, data) {
    if (!node) {
      return null;
    }

    const newNode = new Node(data);
    const next = node.next;

    newNode.prev = node;
    newNode.next = next;
    node.next = newNode;

    if (next) {
      next.prev = newNode;
    } else {
      this.tail = newNode;
    }

    this._size++;
    return newNode;
  }

  insertBeforeNode(node, data) {
    if (!node) {
      return null;
    }

    if (node === this.head) {
      this.addFirst(data);
      return this.head;
    }

    const newNode = new Node(data);
    const prev = node.prev;

    newNode.prev = prev;
    newNode.next = node;
    prev.next = newNode;
    node.prev = newNode;

    this._size++;
    return newNode;
  }

  insertAfterNode(node, data) {
    if (!node) {
      return null;
    }

    if (node === this.tail) {
      this.addLast(data);
      return this.tail;
    }

    const newNode = new Node(data);
    const next = node.next;

    newNode.prev = node;
    newNode.next = next;
    node.next = newNode;
    next.prev = newNode;

    this._size++;
    return newNode;
  }

  makeLast(node) {
    if (!node || node === this.tail) {
      return;
    }

    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }

    node.next = null;
    node.prev = this.tail;
    if (this.tail) {
      this.tail.next = node;
    }
    this.tail = node;

    if (!this.head) {
      this.head = node;
    }
  }

  makeFirst(node) {
    if (!node || node === this.head) {
      return;
    }

    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }

    node.prev = null;
    node.next = this.head;
    if (this.head) {
      this.head.prev = node;
    }
    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }
  }

  swap(nodeA, nodeB) {
    if (!nodeA || !nodeB || nodeA === nodeB) {
      return;
    }

    if (nodeB.next === nodeA) {
      const temp = nodeA;
      nodeA = nodeB;
      nodeB = temp;
    }

    if (nodeA.next === nodeB) {
      const aPrev = nodeA.prev;
      const bNext = nodeB.next;

      if (aPrev) {
        aPrev.next = nodeB;
      } else {
        this.head = nodeB;
      }

      if (bNext) {
        bNext.prev = nodeA;
      } else {
        this.tail = nodeA;
      }

      nodeB.prev = aPrev;
      nodeB.next = nodeA;
      nodeA.prev = nodeB;
      nodeA.next = bNext;
      return;
    }

    const aPrev = nodeA.prev;
    const aNext = nodeA.next;
    const bPrev = nodeB.prev;
    const bNext = nodeB.next;

    if (aPrev) {
      aPrev.next = nodeB;
    } else {
      this.head = nodeB;
    }

    if (aNext) {
      aNext.prev = nodeB;
    } else {
      this.tail = nodeB;
    }

    if (bPrev) {
      bPrev.next = nodeA;
    } else {
      this.head = nodeA;
    }

    if (bNext) {
      bNext.prev = nodeA;
    } else {
      this.tail = nodeA;
    }

    nodeA.prev = bPrev;
    nodeA.next = bNext;
    nodeB.prev = aPrev;
    nodeB.next = aNext;
  }
}
