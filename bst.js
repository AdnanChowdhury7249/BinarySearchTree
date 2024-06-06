class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        const sortedArray = [...new Set(array)].sort((a, b) => a - b);

        this.root = this.buildTree(sortedArray);
    }

    buildTree(array) {
        if (array.length === 0) return null;
        const mid = Math.floor(array.length / 2);
        const root = new Node(array[mid]);

        root.left = this.buildTree(array.slice(0, mid));
        root.right = this.buildTree(array.slice(mid + 1));

        return root;

    }
    insert(value, currentNode = this.root) {
        if (currentNode === null) return new Node(value);
        if (currentNode.data === value) return;

        if (currentNode.data < value) {
            currentNode.right = this.insert(value, currentNode.right);
        } else {
            currentNode.left = this.insert(value, currentNode.left);
        }
        return currentNode;
    }

    deleteItem(value, currentNode = this.root) {
        if (currentNode === null) return null;

        if (value < currentNode.data) {
            currentNode.left = this.deleteItem(value, currentNode.left);
        } else if (value > currentNode.data) {
            currentNode.right = this.deleteItem(value, currentNode.right);
        } else {

            if (currentNode.left === null) return currentNode.right;
            if (currentNode.right === null) return currentNode.left;


            currentNode.data = this.minValue(currentNode.right);

            currentNode.right = this.deleteItem(currentNode.data, currentNode.right);
        }

        return currentNode;
    }
    minValue(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    }
    find(value, currentNode = this.root) {
        if (currentNode === null || currentNode.data === value) {
            return currentNode;
        }
        if (value < currentNode.data) {
            return this.find(value, currentNode.left);
        } else {
            return this.find(value, currentNode.right);
        }
    }

    levelOrder(callback) {
        if (this.root === null) return [];

        const queue = [this.root];
        const result = [];
        while (queue.length > 0) {
            const currentNode = queue.shift();
            if (callback) {
                callback(currentNode);
            } else {
                result.push(currentNode.data);
            }
            if (currentNode.left !== null) queue.push(currentNode.left);
            if (currentNode.right !== null) queue.push(currentNode.right);
        }

        return callback ? undefined : result;
    }


    inOrder(callback, currentNode = this.root, result = []) {
        if (currentNode === null) return;

        this.inOrder(callback, currentNode.left, result);

        if (callback) {
            callback(currentNode);
        } else {
            result.push(currentNode.data);
        }

        this.inOrder(callback, currentNode.right, result);

        return callback ? undefined : result;
    }

    preOrder(callback, currentNode = this.root, result = []) {
        if (currentNode === null) return;

        if (callback) {
            callback(currentNode);
        } else {
            result.push(currentNode.data);
        }
        this.preOrder(callback, currentNode.left, result);

        this.preOrder(callback, currentNode.right, result);

        return callback ? undefined : result;
    }

    postOrder(callback, currentNode = this.root, result = []) {
        if (currentNode === null) return;

        this.postOrder(callback, currentNode.left, result);
        this.postOrder(callback, currentNode.right, result);

        if (callback) {
            callback(currentNode);
        } else {
            result.push(currentNode.data);
        }

        return callback ? undefined : result;
    }
    height(node) {

        if (node === null) return -1;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;

    }
    depth(node, current = this.root, depth = 0) {
        if (node === null) return -1;
        if (current === node) return depth;

        let leftdepth = this.depth(node, current.left, depth + 1);
        if (current !== -1) return leftdepth;

        let rightdepth = this.depth(node, current.left, depth + 1);
        return rightdepth;

    }

    isbalanced(node = this.root) {
        if (node === null) return true;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        let heightDifference = Math.abs(leftHeight - rightHeight);

        if (heightDifference > 1) {
            return false;
        }

        return this.isbalanced(node.left) && this.isbalanced(node.right);

    }
}



const prettyPrint = (node, prefix = "", isLeft = true) => {
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


const myTree = new Tree([3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]);
prettyPrint(myTree.root);

// Traversal: Use an in-order traversal to collect all the node values in a sorted array.
// Build Tree: Use the sorted array to rebuild the tree into a balanced binary search tree (BST).
// Steps to Implement the Rebalance Function
// In-order Traversal: Collect the node values in a sorted array.
// Rebuild Tree: Use the sorted array to rebuild a balanced tree using the buildTree function.