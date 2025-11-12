/**
 * @author Asim Kilic>
 * @author Johan Poulsen>
*/

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export default class SinglyLinkedList {
  constructor() {
    this.head = null;
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
        "Next:",
        current.next ? "Node" : "null"
      );
      current = current.next;
      index++;
    }
  }

  add(data) {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
      return;
    }

    let cur = this.head;
    while (cur.next) {
      cur = cur.next;
    }
    cur.next = node;
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

  clear() {
    this.head = null;
  }

  get(index) {
    let node = this.head;
    for (let i = 0; i < index; i++) {
      if (!node) return null;
      node = node.next;
    }
    return node ? node.data : null;
  }

  set(index, data) {
    let node = this.head;
    for (let i = 0; i < index; i++) {
      if (!node) return;
      node = node.next;
    }
    if (node) node.data = data;
  }

  getNode(index) {
    let node = this.head;
    for (let i = 0; i < index; i++) {
      if (!node) return null;
      node = node.next;
    }
    return node;
  }

  getFirst() {
    return this.head ? this.head.data : null;
  }

  getLast() {
    let node = this.head;
    if (!node) return null;
    while (node.next) {
      node = node.next;
    }
    return node.data;
  }

  getFirstNode() {
    return this.head;
  }

  getLastNode() {
    let node = this.head;
    if (!node) return null;
    while (node.next) {
      node = node.next;
    }
    return node;
  }

  getNextNode(node) {
    return node ? node.next : null;
  }

  getPreviousNode(node) {
    if (!this.head || node === this.head) return null;
    let cur = this.head;
    while (cur && cur.next !== node) {
      cur = cur.next;
    }
    return cur && cur.next === node ? cur : null;
  }

  insert(index, data) {
    if (index < 0) return;
    const node = new Node(data);

    if (index === 0) {
      node.next = this.head;
      this.head = node;
      return;
    }

    const prev = this.getNode(index - 1);
    if (!prev) return;

    node.next = prev.next;
    prev.next = node;
  }

  insertBefore(targetNode, data) {
    if (!targetNode || !this.head) return null;

    if (targetNode === this.head) {
      const newNode = new Node(data);
      newNode.next = this.head;
      this.head = newNode;
      return newNode;
    }

    const prev = this.getPreviousNode(targetNode);
    if (!prev) return null;

    const newNode = new Node(data);
    newNode.next = targetNode;
    prev.next = newNode;
    return newNode;
  }

  insertAfter(node, data) {
    if (!node) return null;
    const newNode = new Node(data);
    newNode.next = node.next;
    node.next = newNode;
    return newNode;
  }

  remove(index) {
    if (!this.head || index < 0) return null;

    if (index === 0) {
      const data = this.head.data;
      this.head = this.head.next;
      return data;
    }

    const prev = this.getNode(index - 1);
    if (!prev || !prev.next) return null;

    const removed = prev.next;
    prev.next = removed.next;
    return removed.data;
  }

  removeFirst() {
    if (!this.head) return null;
    const data = this.head.data;
    this.head = this.head.next;
    return data;
  }

  removeLast() {
    if (!this.head) return null;

    if (!this.head.next) {
      const data = this.head.data;
      this.head = null;
      return data;
    }

    let prev = null;
    let cur = this.head;
    while (cur.next) {
      prev = cur;
      cur = cur.next;
    }

    prev.next = null;
    return cur.data;
  }

  removeNode(node) {
    if (!this.head || !node) return null;

    if (node === this.head) {
      const data = node.data;
      this.head = this.head.next;
      return data;
    }

    const prev = this.getPreviousNode(node);
    if (!prev) return null;

    prev.next = node.next;
    return node.data;
  }
}
