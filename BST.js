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
  function deleting(num) {
    root = deleteRec(root, num);
  }
  function deleteRec(root, num) {
    if (root == null) return root;
    if (num < root.data) {
      root.left = deleteRec(root.left, num);
    } else if (num > root.data) {
      root.right = deleteRec(root.right, num);
    } else {
      if (root.left == null) return root.right;
      else if (root.right == null) return root.left;

      root.data = minValue(root.right);
      root.right = deleteRec(root.right, root.data);
    }
    return root;
  }
  function minValue(root) {
    let minv = root.data;
    while (root.left != null) {
      minv = root.left.data;
      root = root.left;
    }
    return minv;
  }
  function find(num) {
    let currentNode = root;
    while (currentNode != null) {
      if (num < currentNode.data) {
        currentNode = currentNode.left;
      } else if (num > currentNode.data) {
        currentNode = currentNode.right;
      } else if (num == currentNode.data) return currentNode;
    }
    return null;
  }
  function levelOrder(root, callback) {
    if (!root) return [];
    const queue = [root];
    const result = [];
    while (queue.length) {
      const level = [];
      const levelSize = queue.length;
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift();
        level.push(node.data);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        if (callback) callback(node); // invoke the callback function with the current node
      }
      result.push(level);
    }
    return result.flat();
  }

  return {
    root,
    buildTree,
    prettyPrint,
    inserting,
    deleting,
    find,
    levelOrder,
  };
}
let tree = BST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree.prettyPrint());
console.log("-------------------------------------------------------");
let a = BSTNode(10);
let b = BSTNode(8.5);
tree.inserting(a);
tree.inserting(b);
console.log(tree.prettyPrint());
tree.deleting(8);
console.log(tree.prettyPrint());
console.log(tree.find(4));
console.log(tree.levelOrder(tree.root));
