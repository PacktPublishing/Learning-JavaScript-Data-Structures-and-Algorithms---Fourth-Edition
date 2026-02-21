/**
 * DoublyLinkedListNode Class
 * 
 * Represents a single node in a doubly linked list containing data and references
 * to both the next and previous nodes.
 */
class DoublyLinkedListNode {
  /**
   * Creates a new DoublyLinkedListNode
   * @param {*} data - The data to store in this node
   * @param {DoublyLinkedListNode|null} next - Reference to the next node (default: null)
   * @param {DoublyLinkedListNode|null} previous - Reference to the previous node (default: null)
   */
  constructor(data, next = null, previous = null) {
    this.data = data;
    this.next = next;
    this.previous = previous;
  }
}

/**
 * DoublyLinkedList Data Structure Implementation
 * 
 * A doubly linked list is a linear data structure where each node contains
 * data and two references: one to the next node and one to the previous node.
 * This allows for efficient bidirectional traversal.
 * 
 * Real-world analogies:
 * - A two-way street where you can walk in both directions
 * - Browser history with back and forward buttons
 * - A chain where each link knows about its neighbors on both sides
 * - Music playlist where you can skip to next or previous song
 * 
 * Advantages over Singly Linked List:
 * - Bidirectional traversal (forward and backward)
 * - Efficient deletion when you have reference to the node
 * - Better for implementing data structures like deques
 * - Easier to implement certain algorithms
 * 
 * Disadvantages:
 * - Extra memory overhead for storing previous pointers
 * - More complex insertion/deletion logic
 * - Slightly more cache misses due to additional pointer
 */
class DoublyLinkedList {
  constructor() {
    // Private field to store reference to the first node
    this.#head = null;
    // Private field to store reference to the last node
    this.#tail = null;
    // Private field to track the number of elements
    this.#size = 0;
  }

  // Private field declarations
  #head = null;
  #tail = null;
  #size = 0;

  /**
   * Adds a new element to the end of the doubly linked list
   * Time Complexity: O(1) - direct insertion at tail
   * Space Complexity: O(1) - only creates one new node
   * 
   * @param {*} data - The data to add
   */
  append(data) {
    const newNode = new DoublyLinkedListNode(data);
    
    if (!this.#head) { // Empty list
      this.#head = newNode;
      this.#tail = newNode;
    } else { // Non-empty list
      newNode.previous = this.#tail;
      this.#tail.next = newNode;
      this.#tail = newNode;
    }
    this.#size++;
  }

  /**
   * Adds a new element to the beginning of the doubly linked list
   * Time Complexity: O(1) - direct insertion at head
   * Space Complexity: O(1) - only creates one new node
   * 
   * @param {*} data - The data to add
   */
  prepend(data) {
    const newNode = new DoublyLinkedListNode(data);
    
    if (!this.#head) { // Empty list
      this.#head = newNode;
      this.#tail = newNode;
    } else { // Non-empty list
      newNode.next = this.#head;
      this.#head.previous = newNode;
      this.#head = newNode;
    }
    this.#size++;
  }

  /**
   * Inserts a new element at the specified position
   * Time Complexity: O(n) - may need to traverse to position
   * Space Complexity: O(1) - only creates one new node
   * 
   * @param {*} data - The data to insert
   * @param {number} position - The position to insert at (0-based)
   * @returns {boolean} True if insertion was successful, false otherwise
   */
  insert(data, position) {
    if (this.#isInvalidPosition(position)) {
      return false;
    }
    
    if (position === 0) { // First position
      this.prepend(data);
      return true;
    }
    
    if (position === this.#size) { // Last position
      this.append(data);
      return true;
    }
    
    // Middle position
    return this.#insertInTheMiddle(data, position);
  }

  /**
   * Removes and returns the element at the specified position
   * Time Complexity: O(n) - may need to traverse to position
   * Space Complexity: O(1) - no extra space used
   * 
   * @param {number} position - The position of the element to remove (0-based)
   * @returns {*} The removed element's data
   * @throws {RangeError} If position is invalid or list is empty
   */
  removeAt(position) {
    if (this.#size === 0) {
      throw new RangeError('Cannot remove from an empty list.');
    }
    
    if (this.#isInvalidPosition(position)) {
      throw new RangeError('Invalid position.');
    }
    
    if (position === 0) {
      return this.#removeFromHead();
    }
    
    if (position === this.#size - 1) {
      return this.#removeFromTail();
    }
    
    return this.#removeFromMiddle(position);
  }

  /**
   * Removes the first occurrence of the specified data
   * Time Complexity: O(n) - may need to search entire list
   * Space Complexity: O(1) - no extra space used
   * 
   * @param {*} data - The data to remove
   * @param {Function} compareFunction - Optional custom comparison function
   * @returns {*} The removed element's data, or null if not found
   */
  remove(data, compareFunction = (a, b) => a === b) {
    const index = this.indexOf(data, compareFunction);
    if (index === -1) {
      return null;
    }
    return this.removeAt(index);
  }

  /**
   * Finds the position of the first occurrence of the specified data
   * Time Complexity: O(n) - may need to search entire list
   * Space Complexity: O(1) - no extra space used
   * 
   * @param {*} data - The data to search for
   * @param {Function} compareFunction - Optional custom comparison function
   * @returns {number} The index of the element, or -1 if not found
   */
  indexOf(data, compareFunction = (a, b) => a === b) {
    let current = this.#head;
    let index = 0;
    
    while (current) {
      if (compareFunction(current.data, data)) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }

  /**
   * Finds the position of the last occurrence of the specified data
   * Time Complexity: O(n) - traverses from tail backward
   * Space Complexity: O(1) - no extra space used
   * 
   * @param {*} data - The data to search for
   * @param {Function} compareFunction - Optional custom comparison function
   * @returns {number} The index of the element, or -1 if not found
   */
  lastIndexOf(data, compareFunction = (a, b) => a === b) {
    let current = this.#tail;
    let index = this.#size - 1;
    
    while (current) {
      if (compareFunction(current.data, data)) {
        return index;
      }
      index--;
      current = current.previous;
    }
    return -1;
  }

  /**
   * Checks if the doubly linked list is empty
   * Time Complexity: O(1) - direct property access
   * Space Complexity: O(1) - no extra space used
   * 
   * @returns {boolean} True if the list is empty, false otherwise
   */
  isEmpty() {
    return this.#size === 0;
  }

  /**
   * Returns the number of elements in the doubly linked list
   * Time Complexity: O(1) - direct property access
   * Space Complexity: O(1) - no extra space used
   * 
   * @returns {number} The number of elements
   */
  get size() {
    return this.#size;
  }

  /**
   * Returns the first element without removing it
   * Time Complexity: O(1) - direct access to head
   * Space Complexity: O(1) - no extra space used
   * 
   * @returns {*} The first element's data, or undefined if empty
   */
  getFirst() {
    return this.#head ? this.#head.data : undefined;
  }

  /**
   * Returns the last element without removing it
   * Time Complexity: O(1) - direct access to tail
   * Space Complexity: O(1) - no extra space used
   * 
   * @returns {*} The last element's data, or undefined if empty
   */
  getLast() {
    return this.#tail ? this.#tail.data : undefined;
  }

  /**
   * Removes all elements from the doubly linked list
   * Time Complexity: O(1) - just resets head, tail and size
   * Space Complexity: O(1) - no extra space used
   */
  clear() {
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
  }

  /**
   * Converts the doubly linked list to a string representation (forward)
   * Time Complexity: O(n) - must traverse entire list
   * Space Complexity: O(n) - creates string with all elements
   * 
   * @returns {string} String representation of the list
   */
  toString() {
    let current = this.#head;
    let objString = '';
    
    while (current) {
      objString += this.#elementToString(current.data);
      current = current.next;
      if (current) {
        objString += ' <-> ';
      }
    }
    return objString;
  }

  /**
   * Converts the doubly linked list to a string representation (backward)
   * Time Complexity: O(n) - must traverse entire list
   * Space Complexity: O(n) - creates string with all elements
   * 
   * @returns {string} String representation of the list in reverse
   */
  toStringReverse() {
    let current = this.#tail;
    let objString = '';
    
    while (current) {
      objString += this.#elementToString(current.data);
      current = current.previous;
      if (current) {
        objString += ' <-> ';
      }
    }
    return objString;
  }

  /**
   * Converts the doubly linked list to an array
   * Time Complexity: O(n) - must traverse entire list
   * Space Complexity: O(n) - creates new array with all elements
   * 
   * @returns {Array} Array containing all elements
   */
  toArray() {
    const result = [];
    let current = this.#head;
    
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  /**
   * Converts the doubly linked list to an array (reverse order)
   * Time Complexity: O(n) - must traverse entire list
   * Space Complexity: O(n) - creates new array with all elements
   * 
   * @returns {Array} Array containing all elements in reverse order
   */
  toArrayReverse() {
    const result = [];
    let current = this.#tail;
    
    while (current) {
      result.push(current.data);
      current = current.previous;
    }
    return result;
  }

  // Private helper methods

  /**
   * Validates if a position is within valid bounds
   * @private
   * @param {number} position - The position to validate
   * @returns {boolean} True if position is invalid
   */
  #isInvalidPosition(position) {
    return position < 0 || position > this.#size;
  }

  /**
   * Inserts a node in the middle of the list
   * @private
   * @param {*} data - The data to insert
   * @param {number} position - The position to insert at
   * @returns {boolean} True if insertion was successful
   */
  #insertInTheMiddle(data, position) {
    const newNode = new DoublyLinkedListNode(data);
    let currentNode = this.#head;
    let previousNode;
    
    for (let index = 0; index < position; index++) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }
    
    // Set up the new node's connections
    newNode.next = currentNode;
    newNode.previous = previousNode;
    
    // Update surrounding nodes' connections
    currentNode.previous = newNode;
    previousNode.next = newNode;
    
    this.#size++;
    return true;
  }

  /**
   * Removes the head node
   * @private
   * @returns {*} The removed element's data
   */
  #removeFromHead() {
    const nodeToRemove = this.#head;
    this.#head = nodeToRemove.next;
    
    if (this.#head) {
      this.#head.previous = null;
    } else {
      this.#tail = null; // List becomes empty
    }
    
    this.#size--;
    nodeToRemove.next = null;
    return nodeToRemove.data;
  }

  /**
   * Removes the tail node
   * @private
   * @returns {*} The removed element's data
   */
  #removeFromTail() {
    const nodeToRemove = this.#tail;
    this.#tail = nodeToRemove.previous;
    
    if (this.#tail) {
      this.#tail.next = null;
    } else {
      this.#head = null; // List becomes empty
    }
    
    this.#size--;
    nodeToRemove.previous = null;
    return nodeToRemove.data;
  }

  /**
   * Removes a node from the middle of the list
   * @private
   * @param {number} position - The position to remove from
   * @returns {*} The removed element's data
   */
  #removeFromMiddle(position) {
    let nodeToRemove = this.#head;
    let previousNode;
    
    for (let index = 0; index < position; index++) {
      previousNode = nodeToRemove;
      nodeToRemove = nodeToRemove.next;
    }
    
    // Update surrounding nodes' connections
    previousNode.next = nodeToRemove.next;
    nodeToRemove.next.previous = previousNode;
    
    // Clean up removed node's references
    nodeToRemove.next = null;
    nodeToRemove.previous = null;
    
    this.#size--;
    return nodeToRemove.data;
  }

  /**
   * Converts an element to its string representation
   * @private
   * @param {*} element - The element to convert
   * @returns {string} String representation of the element
   */
  #elementToString(element) {
    if (element === null) {
      return 'null';
    } else if (element === undefined) {
      return 'undefined';
    } else if (typeof element === 'string') {
      return `"${element}"`;
    } else {
      return element.toString();
    }
  }
}

// Example usage and demonstration
if (require.main === module) {
  console.log('=== DoublyLinkedList Implementation Demo ===\n');

  // Create a new doubly linked list
  const list = new DoublyLinkedList();

  console.log('1. Creating an empty doubly linked list');
  console.log(`   Empty: ${list.isEmpty()}`);
  console.log(`   Size: ${list.size}`);
  console.log(`   String representation: "${list.toString()}"\n`);

  console.log('2. Adding elements using append()');
  list.append('First');
  list.append('Second');
  list.append('Third');
  console.log(`   After appending: ${list.toString()}`);
  console.log(`   Size: ${list.size}`);
  console.log(`   First element: ${list.getFirst()}`);
  console.log(`   Last element: ${list.getLast()}\n`);

  console.log('3. Adding element at the beginning using prepend()');
  list.prepend('Zero');
  console.log(`   After prepending: ${list.toString()}`);
  console.log(`   Size: ${list.size}\n`);

  console.log('4. Bidirectional traversal');
  console.log(`   Forward:  ${list.toString()}`);
  console.log(`   Backward: ${list.toStringReverse()}\n`);

  console.log('5. Inserting elements at specific positions');
  list.insert('Inserted at 2', 2);
  console.log(`   After inserting at position 2: ${list.toString()}`);
  
  list.insert('New Last', list.size);
  console.log(`   After inserting at end: ${list.toString()}`);
  console.log(`   Size: ${list.size}\n`);

  console.log('6. Searching for elements');
  console.log(`   Index of "Second": ${list.indexOf('Second')}`);
  console.log(`   Last index of "Second": ${list.lastIndexOf('Second')}`);
  
  // Add duplicate to test lastIndexOf
  list.append('Second');
  console.log(`   After adding duplicate "Second": ${list.toString()}`);
  console.log(`   Index of "Second": ${list.indexOf('Second')}`);
  console.log(`   Last index of "Second": ${list.lastIndexOf('Second')}\n`);

  console.log('7. Removing elements');
  try {
    const removed = list.removeAt(0);
    console.log(`   Removed from position 0: "${removed}"`);
    console.log(`   List after removal: ${list.toString()}`);
    
    const removedFromEnd = list.removeAt(list.size - 1);
    console.log(`   Removed from end: "${removedFromEnd}"`);
    console.log(`   List after removal: ${list.toString()}`);
    
    const removedByValue = list.remove('Inserted at 2');
    console.log(`   Removed by value: "${removedByValue}"`);
    console.log(`   List after removal: ${list.toString()}`);
    console.log(`   Size: ${list.size}\n`);
  } catch (error) {
    console.log(`   Error: ${error.message}\n`);
  }

  console.log('8. Converting to arrays');
  console.log(`   Forward array: [${list.toArray().join(', ')}]`);
  console.log(`   Reverse array: [${list.toArrayReverse().join(', ')}]\n`);

  console.log('9. Performance comparison with forward/backward traversal');
  console.log('   (In a real scenario, backward traversal from tail can be more efficient for certain operations)\n');

  console.log('10. Clearing the list');
  list.clear();
  console.log(`   After clearing - Empty: ${list.isEmpty()}, Size: ${list.size}`);
  console.log(`   String representation: "${list.toString()}"\n`);
}

// Export classes for use in other modules
export { DoublyLinkedList, DoublyLinkedListNode };