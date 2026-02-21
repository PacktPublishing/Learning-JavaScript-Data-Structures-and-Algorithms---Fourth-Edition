/**
 * LinkedListNode Class
 * 
 * Represents a single node in a linked list containing data and a reference to the next node.
 * Each node holds the data we want to store and a reference to the next node.
 */
class LinkedListNode {
  /**
   * Creates a new LinkedListNode
   * @param {*} data - The data to store in this node
   * @param {LinkedListNode|null} next - Reference to the next node (default: null)
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

/**
 * LinkedList Data Structure Implementation
 * 
 * A linked list is a linear data structure where elements are stored in nodes.
 * Each node contains data and a reference to the next node in the sequence.
 * Unlike arrays, linked list elements are not stored in contiguous memory locations.
 * 
 * Real-world analogies:
 * - A chain of paperclips linked together
 * - A treasure hunt with clues leading to the next location
 * - Train cars connected to each other
 * 
 * Advantages:
 * - Dynamic size (can grow or shrink at runtime)
 * - Efficient insertion/deletion at the beginning O(1)
 * - No memory waste (allocates exactly what's needed)
 * 
 * Disadvantages:
 * - No random access (must traverse from head)
 * - Extra memory overhead for storing pointers
 * - Not cache-friendly due to non-contiguous memory
 */
class LinkedList {
  constructor() {
    // Private field to store reference to the first node
    this.#head = null;
    // Private field to track the number of elements
    this.#size = 0;
  }

  // Private field declarations
  #head = null;
  #size = 0;

  /**
   * Adds a new element to the end of the linked list
   * Time Complexity: O(n) - must traverse to the end
   * Space Complexity: O(1) - only creates one new node
   * 
   * @param {*} data - The data to add
   */
  append(data) {
    const newNode = new LinkedListNode(data);
    
    // If list is empty, new node becomes the head
    if (!this.#head) {
      this.#head = newNode;
    } else {
      // Traverse to the end of the list
      let current = this.#head;
      while (current.next !== null) {
        current = current.next;
      }
      // Link the new node at the end
      current.next = newNode;
    }
    this.#size++;
  }

  /**
   * Adds a new element to the beginning of the linked list
   * Time Complexity: O(1) - direct insertion at head
   * Space Complexity: O(1) - only creates one new node
   * 
   * @param {*} data - The data to add
   */
  prepend(data) {
    const newNode = new LinkedListNode(data, this.#head);
    this.#head = newNode;
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
    // Validate position
    if (this.#isInvalidPosition(position)) {
      return false;
    }
    
    // If inserting at the beginning, use prepend
    if (position === 0) {
      this.prepend(data);
      return true;
    }
    
    const newNode = new LinkedListNode(data);
    let current = this.#head;
    let previous = null;
    let index = 0;
    
    // Traverse to the insertion position
    while (index++ < position) {
      previous = current;
      current = current.next;
    }
    
    // Insert the new node
    newNode.next = current;
    previous.next = newNode;
    this.#size++;
    return true;
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
      throw new RangeError('Invalid position');
    }
    
    // Handle removal from head
    if (position === 0) {
      return this.#removeFromHead();
    }
    
    // Handle removal from middle or end
    return this.#removeFromMiddleOrEnd(position);
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
   * Checks if the linked list is empty
   * Time Complexity: O(1) - direct property access
   * Space Complexity: O(1) - no extra space used
   * 
   * @returns {boolean} True if the list is empty, false otherwise
   */
  isEmpty() {
    return this.#size === 0;
  }

  /**
   * Returns the number of elements in the linked list
   * Time Complexity: O(1) - direct property access
   * Space Complexity: O(1) - no extra space used
   * 
   * @returns {number} The number of elements
   */
  get size() {
    return this.#size;
  }

  /**
   * Removes all elements from the linked list
   * Time Complexity: O(1) - just resets head and size
   * Space Complexity: O(1) - no extra space used
   */
  clear() {
    this.#head = null;
    this.#size = 0;
  }

  /**
   * Converts the linked list to a string representation
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
        objString += ', ';
      }
    }
    return objString;
  }

  /**
   * Converts the linked list to an array
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
   * Removes the head node
   * @private
   * @returns {*} The removed element's data
   */
  #removeFromHead() {
    const nodeToRemove = this.#head;
    this.#head = this.#head.next;
    this.#size--;
    return nodeToRemove.data;
  }

  /**
   * Removes a node from the middle or end of the list
   * @private
   * @param {number} position - The position to remove from
   * @returns {*} The removed element's data
   */
  #removeFromMiddleOrEnd(position) {
    let nodeToRemove = this.#head;
    let previous;
    
    // Traverse to the position
    for (let index = 0; index < position; index++) {
      previous = nodeToRemove;
      nodeToRemove = nodeToRemove.next;
    }
    
    // Unlink the node to be removed
    previous.next = nodeToRemove.next;
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
  console.log('=== LinkedList Implementation Demo ===\n');

  // Create a new linked list
  const list = new LinkedList();

  console.log('1. Creating an empty linked list');
  console.log(`   Empty: ${list.isEmpty()}`);
  console.log(`   Size: ${list.size}`);
  console.log(`   String representation: "${list.toString()}"\n`);

  console.log('2. Adding elements using append()');
  list.append('First');
  list.append('Second');
  list.append('Third');
  console.log(`   After appending: ${list.toString()}`);
  console.log(`   Size: ${list.size}\n`);

  console.log('3. Adding element at the beginning using prepend()');
  list.prepend('Zero');
  console.log(`   After prepending: ${list.toString()}`);
  console.log(`   Size: ${list.size}\n`);

  console.log('4. Inserting elements at specific positions');
  list.insert('Inserted at 2', 2);
  console.log(`   After inserting at position 2: ${list.toString()}`);
  
  list.insert('New First', 0);
  console.log(`   After inserting at position 0: ${list.toString()}`);
  console.log(`   Size: ${list.size}\n`);

  console.log('5. Searching for elements');
  console.log(`   Index of "Second": ${list.indexOf('Second')}`);
  console.log(`   Index of "NotFound": ${list.indexOf('NotFound')}\n`);

  console.log('6. Removing elements');
  try {
    const removed = list.removeAt(0);
    console.log(`   Removed from position 0: "${removed}"`);
    console.log(`   List after removal: ${list.toString()}`);
    
    const removedByValue = list.remove('Second');
    console.log(`   Removed by value "Second": "${removedByValue}"`);
    console.log(`   List after removal: ${list.toString()}`);
    console.log(`   Size: ${list.size}\n`);
  } catch (error) {
    console.log(`   Error: ${error.message}\n`);
  }

  console.log('7. Converting to array');
  console.log(`   Array representation: [${list.toArray().join(', ')}]\n`);

  console.log('8. Clearing the list');
  list.clear();
  console.log(`   After clearing - Empty: ${list.isEmpty()}, Size: ${list.size}`);
  console.log(`   String representation: "${list.toString()}"\n`);

  console.log('9. Error handling - trying to remove from empty list');
  try {
    list.removeAt(0);
  } catch (error) {
    console.log(`   Expected error: ${error.message}\n`);
  }
}

// Export classes for use in other modules
export { LinkedList, LinkedListNode };