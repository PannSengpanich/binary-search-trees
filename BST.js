import BSTNode from "./BSTNode.js";
function BST(arr) {
  let root = null;

  function buildTree() {
    arr = [...new Set(arr)].sort((a, b) => a - b);
    for (let element of arr) {
      if (root == null) {
        root = BSTNode(element); //initialize root
      } else {
      }
    }
    return console.log(arr);
  }
  return { buildTree };
}
let tree = BST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.buildTree();
