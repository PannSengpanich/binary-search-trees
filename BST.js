import BSTNode from "./BSTNode.js";
function BST(arr) {
  arr = [...new Set(arr)].sort((a, b) => a - b);
  let root = buildTree(arr, 0, arr.length - 1);
  function buildTree(array = arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;
    let mid = Math.floor((start + end) / 2);
    let r = BSTNode(array[mid]);

    r.left = buildTree(array, start, mid - 1);
    r.right = buildTree(array, mid + 1, end);
    return r;
  }

  const prettyPrint = (node = root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  function inserting(node) {
    let currentNode = root;
    while (currentNode.left != null && currentNode.right != null) {
      if (node.data < currentNode.data) {
        currentNode = currentNode.left;
      } else if (node.data > currentNode.data) {
        currentNode = currentNode.right;
      }
    }
    if (node.data < currentNode.data) {
      currentNode.left = node;
    } else if (node.data > currentNode.data) {
      currentNode.right = node;
    }
  }
  function deleting(node) {
    let currentNode = root;

    return currentNode;
  }
  return { buildTree, root, prettyPrint, inserting, deleting };
}
let tree = BST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree.prettyPrint());
let a = BSTNode(10);
let b = BSTNode(8.5);
tree.insert(a);
tree.insert(b);
console.log(tree.prettyPrint());
