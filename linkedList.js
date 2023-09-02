class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.nextNode = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  prepend(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.nextNode = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  size() {
    return this.length;
  }

  head() {
    return this.head;
  }

  tail() {
    return this.tail;
  }

  at(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }

    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.nextNode;
    }

    return currentNode;
  }

  pop() {
    if (!this.head) {
      return null;
    }

    if (this.head === this.tail) {
      const removedNode = this.head;
      this.head = null;
      this.tail = null;
      this.length = 0;
      return removedNode;
    }

    let currentNode = this.head;
    while (currentNode.nextNode !== this.tail) {
      currentNode = currentNode.nextNode;
    }

    const removedNode = this.tail;
    currentNode.nextNode = null;
    this.tail = currentNode;
    this.length--;
    return removedNode;
  }

  contains(value) {
    let currentNode = this.head;
    while (currentNode) {
      if (currentNode.value === value) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }

  find(value) {
    let currentNode = this.head;
    let index = 0;
    while (currentNode) {
      if (currentNode.value === value) {
        return index;
      }
      currentNode = currentNode.nextNode;
      index++;
    }
    return null;
  }

  toString() {
    let currentNode = this.head;
    let result = '';
    while (currentNode) {
      result += `(${currentNode.value}) -> `;
      currentNode = currentNode.nextNode;
    }
    result += 'null';
    return result;
  }

  insertAt(value, index) {
    if (index < 0 || index > this.length) {
      return false;
    }

    if (index === 0) {
      this.prepend(value);
      return true;
    }

    if (index === this.length) {
      this.append(value);
      return true;
    }

    const newNode = new Node(value);
    let prevNode = this.at(index - 1);
    newNode.nextNode = prevNode.nextNode;
    prevNode.nextNode = newNode;
    this.length++;
    return true;
  }

  removeAt(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }

    if (index === 0) {
      const removedNode = this.head;
      this.head = this.head.nextNode;
      this.length--;
      return removedNode;
    }

    let prevNode = this.at(index - 1);
    const removedNode = prevNode.nextNode;
    prevNode.nextNode = prevNode.nextNode.nextNode;
    this.length--;
    return removedNode;
  }
}

// Example usage
const linkedList = new LinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.prepend(0);
console.log(linkedList.toString()); // (0) -> (1) -> (2) -> null
console.log(linkedList.size()); // 3
console.log(linkedList.at(1)); // Node with value 1
linkedList.pop();
console.log(linkedList.toString()); // (0) -> (1) -> null
console.log(linkedList.contains(1)); // true
console.log(linkedList.find(1)); // 1
linkedList.insertAt(1.5, 1);
console.log(linkedList.toString()); // (0) -> (1.5) -> (1) -> null
linkedList.removeAt(1);
console.log(linkedList.toString()); // (0) -> (1) -> null
