import BSTNode from "./BSTNode.js";
function BST(arr) {
  let root = null;

  function buildTree() {
    arr = [...new Set(arr)].sort((a, b) => a - b);
    for (let value of arr) {
      if (root == null) {
        root = BSTNode(value); //initialize root
      } else {
        let currentNode = root;
        while (currentNode != null) {
          if (value < currentNode.data) {
            if (currentNode.left != null) {
              currentNode = currentNode.left;
            } else {
              currentNode.left = BSTNode(value);
              break;
            }
          } else if (value > currentNode.data) {
            if (currentNode.right != null) {
              currentNode = currentNode.right;
            } else {
              currentNode.right = BSTNode(value);
              break;
            }
          }
        }
      }
    }
    return root;
  }
  root = buildTree();
  return { buildTree };
}
let tree = BST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.buildTree();
