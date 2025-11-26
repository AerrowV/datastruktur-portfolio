export default class Tree {
  constructor() {
    this.root = null;
  }

  printTree() {
    let stack = [this.root];

    while (stack.length > 0) {
      const node = stack.pop();
      console.log(node.value);
      
      for (let i = node.childNodes.length - 1; i >= 0; i--) {
        stack.push(node.childNodes[i]);
      }
    }
  }

  addValue(value) {
    if (!this.root) {
      this.root = new Node(value, null);
      return this.root;
    }

    const newNode = new Node(value, this.root);
    this.root.appendChild(newNode);
    return newNode;
  }

  findValue(value) {
    if (!this.root) {
      return null;
    }

    let stack = [this.root];

    while (stack.length > 0) {
      const node = stack.pop();

      if (node.value === value) {
        return node;
      }

      for (let i = node.childNodes.length - 1; i >= 0; i--) {
        stack.push(node.childNodes[i]);
      }
    }

    return null;
  }

  removeValue(value) {
    const node = this.findValue(value);

    if (!node) {
      return false;
    }

    if (node === this.root) {
      this.root = null;
      return true;
    }

    if (node.parent) {
      node.parent.removeChild(node);
      return true;
    }

    return false;
  }
}

class Node {
  constructor(value) {
    this.parent = null;
    this.childNodes = [];
    this.value = value;
  }

  firstChild() {
    return this.childNodes.length > 0 ? this.childNodes[0] : null;
  }

  lastChild() {
    return this.childNodes.length > 0
      ? this.childNodes[this.childNodes.length - 1]
      : null;
  }

  hasChildNodes() {
    return this.childNodes.length > 0 ? true : false;
  }

  appendChild(child) {
    if (!child) {
      return;
    }

    child.parent = this;
    this.childNodes.push(child);
  }

  removeChild(child) {
    const index = this.childNodes.indexOf(child);
    if (index === -1) {
      return;
    }

    this.childNodes.splice(index, 1);
    child.parent = null;
    return this.childNodes;
  }

  replaceChild(newChild, oldChild) {
    const index = this.childNodes.indexOf(oldChild);
    if (index === -1 || !newChild) {
      return;
    }

    if (newChild.parent && newChild.parent !== this) {
      newChild.parent.removeChild(newChild);
    }

    newChild.parent = this;
    this.childNodes[index] = newChild;
  }
}
