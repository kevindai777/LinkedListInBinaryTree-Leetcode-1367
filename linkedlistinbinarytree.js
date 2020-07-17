//Objective is to see whether a given linked list exists in a binary tree, given that the list is a 
//downwards path in the tree

class ListNode {
    constructor(val, next = null) { //if next is not given, assume it is empty
      this.val = val
      this.next = next
    }
}

class LinkedList {
    constructor() {
      this.head = null
    }

    addNodeToBack(data) {
        let current = this.head //initialize to beginning
    
        if (!this.head) { //if the list is empty...
            this.head = new ListNode(data)
        } else {
            while (current.next) {
                current = current.next //move along the list
            }
            current.next = new ListNode(data)
        }
    }
}

let head = new ListNode(1)
head.next = new ListNode(2)
head.next.next = new ListNode(3)

class TreeNode {
    constructor(left, right, val) {
      this.left = left
      this.right = right
      this.val = val
    }
}
  
class Tree {
    constructor(root) {
      this.root = null
    }
  
    createRoot(val) {
      this.root = new TreeNode(null, null, val)
    }
  
    addLeftNode(node, val) {
      node.left = new TreeNode(null, null, val)
    }
  
    addRightNode(node, val) {
      node.right = new TreeNode(null, null, val)
    }
}

let tree = new Tree()
tree.createRoot(1)
tree.addLeftNode(tree.root, 2)
tree.addRightNode(tree.root.left, 3)
tree.addRightNode(tree.root, 4)


//O(n) solution that uses a bfs traversal to put each node in the tree and then a dfs traversal
//to search for the entire linked list

let queue = [tree.root]

while (queue.length > 0) {
    let curr = queue.shift()

    if (dfs(curr, head)) {
        return true
    }

    if (curr.left) {
        queue.push(curr.left)
    }

    if (curr.right) {
        queue.push(curr.right)
    }
}

return false 

function dfs(treeNode, listNode) {
    //Path led to a null node
    if (!treeNode) {
        return false
    }

    if (treeNode.val !== listNode.val) {
        return false
    }

    //We've reached the end of the linked list
    if (!listNode.next) {
        return true
    }

    listNode = listNode.next

    //See if either left or right subtree finish the rest of the linked list
    let left = dfs(treeNode.left, listNode)
    let right = dfs(treeNode.right, listNode)

    return left || right
}