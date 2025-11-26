import Tree from "./tree.js";

const tree = new Tree();

const values = ["root", "A", "B", "C"];

for (let i = 0; i < values.length; i++) {
  tree.addValue(values[i]);
}

console.log("printTree");
tree.printTree();
