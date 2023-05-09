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
    while (currentNode.left !== null || currentNode.right !== null) {
      if (node.data < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = node;

          return;
        }
        currentNode = currentNode.left;
      } else if (node.data > currentNode.data) {
        if (currentNode.right === null) {
          currentNode.right = node;
          return;
        }
        currentNode = currentNode.right;
      }
    }
    if (node.data < currentNode.data) {
      currentNode.left = node;
    } else if (node.data > currentNode.data) {
      currentNode.right = node;
    }
    arr.push(node.data);
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
  function levelOrder(node = root, callback) {
    if (!root) return [];
    const queue = [root];
    const result = [];
    while (queue.length) {
      const level = [];
      const levelSize = queue.length;
      for (let i = 0; i < levelSize; i++) {
        const currentNode = queue.shift();
        level.push(currentNode.data);
        if (currentNode.left) queue.push(currentNode.left);
        if (currentNode.right) queue.push(currentNode.right);
        if (callback) callback(currentNode); // invoke the callback function with the current node
      }
      result.push(level);
    }
    return result.flat();
  }
  function inOrder(node = root, callback) {
    if (!node) return [];

    const result = [];

    function traverse(node) {
      if (node.left) {
        traverse(node.left);
      }

      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }

      if (node.right) {
        traverse(node.right);
      }
    }

    traverse(node);

    return result;
  }
  function preOrder(node = root, callback) {
    if (!node) return;
    const result = [];
    function traverse(node) {
      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
      if (node.left) {
        traverse(node.left);
      }
      if (node.right) {
        traverse(node.right);
      }
    }
    traverse(node);
    return result;
  }
  function postOrder(node = root, callback) {
    if (!node) return;
    const result = [];
    function traverse(node) {
      if (node.left) {
        traverse(node.left);
      }

      if (node.right) {
        traverse(node.right);
      }

      if (callback) {
        callback(node);
      } else {
        result.push(node.data);
      }
    }
    traverse(node);
    return result;
  }
  function height(node = root) {
    if (node == null) return -1;
    let leftHeight = height(node.left);
    let rightHeight = height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  function depth(data) {
    let currentNode = root;
    let depth = 0;

    while (currentNode !== null) {
      if (currentNode.data === data) {
        return depth;
      } else if (currentNode.data > data) {
        currentNode = currentNode.left;
        depth++;
      } else {
        currentNode = currentNode.right;
        depth++;
      }
    }

    return -1; // if the node is not found
  }
  function isBalanced() {
    function getHeight(node) {
      if (!node) return 0;
      const leftHeight = getHeight(node.left);
      if (leftHeight === -1) return -1;
      const rightHeight = getHeight(node.right);
      if (rightHeight === -1) return -1;
      if (Math.abs(leftHeight - rightHeight) > 1) return -1;
      return Math.max(leftHeight, rightHeight) + 1;
    }

    return getHeight(root) !== -1;
  }
  function rebalance() {
    let oldroot = root;
    let newArr = inOrder();
    let newRoot = buildTree(newArr);
    root = newRoot;
  }
  return {
    root,
    buildTree,
    prettyPrint,
    inserting,
    deleting,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}
let tree = BST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree.isBalanced());
tree.inserting(BSTNode(10000));
tree.inserting(BSTNode(20000));
tree.inserting(BSTNode(30000));
console.log(tree.prettyPrint());
console.log(tree.levelOrder());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.prettyPrint());
console.log(tree.isBalanced());
console.log(tree.inOrder());
console.log(tree.preOrder());
console.log(tree.postOrder());
console.log(tree.isBalanced());
