/**
 * Circular Linked List Implementation
 * 
 * Uses the same LinkedListNode from the basic linked list implementation.
 * In a circular linked list, the last node points back to the first node
 * instead of pointing to null, creating a continuous loop.
 */

import { LinkedListNode } from './linked-list.js';

/**
 * CircularLinkedList Data Structure Implementation
 * 
 * A circular linked list is a linear data structure where the last node
 * points back to the first node, creating a continuous loop. There is no
 * explicit beginning or end to the list.
 * 
 * Real-world analogies:
 * - Round-robin scheduling in operating systems
 * - Multiplayer games where turns cycle through players
 * - Music playlists that repeat continuously
 * - Circular buffer implementations
 * - Clock faces where 12 comes after 11 and before 1
 * 
 * Advantages:
 * - Natural representation of cyclic data
 * - Can start traversal from any node
 * - Efficient for round-robin algorithms
 * - No null pointer checks needed during traversal
 * 
 * Disadvantages:
 * - Risk of infinite loops if not handled carefully
 * - More complex insertion and deletion logic
 * - Harder to detect the end of traversal
 */
class CircularLinkedList {
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
   * Adds a new element to the end of the circular linked list
   * Time Complexity: O(n) - must traverse to find the last node
   * Space Complexity: O(1) - only creates one new node
   * 
   * @param {*} data - The data to add
   */
  append(data) {
    const newNode = new LinkedListNode(data);
    
    if (!this.#head) { // Empty list
      this.#head = newNode;
      newNode.next = this.#head; // Points to itself
    } else { // Non-empty list
      let current = this.#head;
      // Find the last node (the one pointing to head)
      while (current.next !== this.#head) {
        current = current.next;
      }
      current.next = newNode;
      newNode.next = this.#head; // Maintain circular reference
    }
    this.#size++;
  }

  /**
   * Adds a new element to the beginning of the circular linked list
   * Time Complexity: O(n) - must find last node to update its next pointer
   * Space Complexity: O(1) - only creates one new node
   * 
   * @param {*} data - The data to add
   */
  prepend(data) {
    const newNode = new LinkedListNode(data, this.#head);
    
    if (!this.#head) {
      this.#head = newNode;
      newNode.next = this.#head; // Make it circular
    } else {
      // Find the last node to update its next pointer
      let current = this.#head;
      while (current.next !== this.#head) {
        current = current.next;
      }
      current.next = newNode;
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
    
    if (position === 0) {
      this.prepend(data);
      return true;
    }
    
    const newNode = new LinkedListNode(data);
    let current = this.#head;
    let previous = null;
    
    // Traverse to the insertion position
    for (let index = 0; index < position; index++) {
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
    
    if (position === 0) {
      return this.#removeFromHead();
    }
    
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
    if (!this.#head) {
      return -1;
    }
    
    let current = this.#head;
    let index = 0;
    
    do {
      if (compareFunction(current.data, data)) {
        return index;
      }
      index++;
      current = current.next;
    } while (current !== this.#head && index < this.#size);
    
    return -1;
  }

  /**
   * Checks if the circular linked list is empty
   * Time Complexity: O(1) - direct property access
   * Space Complexity: O(1) - no extra space used
   * 
   * @returns {boolean} True if the list is empty, false otherwise
   */
  isEmpty() {
    return this.#size === 0;
  }

  /**
   * Returns the number of elements in the circular linked list
   * Time Complexity: O(1) - direct property access
   * Space Complexity: O(1) - no extra space used
   * 
   * @returns {number} The number of elements
   */
  get size() {
    return this.#size;
  }

  /**
   * Removes all elements from the circular linked list
   * Time Complexity: O(1) - just resets head and size
   * Space Complexity: O(1) - no extra space used
   */
  clear() {
    this.#head = null;
    this.#size = 0;
  }

  /**
   * Converts the circular linked list to a string representation
   * Time Complexity: O(n) - must traverse entire list
   * Space Complexity: O(n) - creates string with all elements
   * 
   * @returns {string} String representation of the list
   */
  toString() {
    if (!this.#head) {
      return '';
    }
    
    let current = this.#head;
    let objString = '';
    let count = 0;
    
    do {
      objString += this.#elementToString(current.data);
      current = current.next;
      count++;
      if (count < this.#size) {
        objString += ' -> ';
      }
    } while (current !== this.#head && count < this.#size);
    
    objString += ' -> (circular)';
    return objString;
  }

  /**
   * Converts the circular linked list to an array
   * Time Complexity: O(n) - must traverse entire list
   * Space Complexity: O(n) - creates new array with all elements
   * 
   * @returns {Array} Array containing all elements
   */
  toArray() {
    const result = [];
    
    if (!this.#head) {
      return result;
    }
    
    let current = this.#head;
    let count = 0;
    
    do {
      result.push(current.data);
      current = current.next;
      count++;
    } while (current !== this.#head && count < this.#size);
    
    return result;
  }

  /**
   * Rotates the circular list by moving the head pointer
   * This is a unique operation for circular lists
   * Time Complexity: O(1) - just moves the head pointer
   * Space Complexity: O(1) - no extra space used
   * 
   * @param {number} positions - Number of positions to rotate (positive = forward)
   */
  rotate(positions = 1) {
    if (this.#size === 0 || this.#size === 1) {
      return;
    }
    
    // Normalize positions to avoid unnecessary full rotations
    positions = positions % this.#size;
    if (positions < 0) {
      positions += this.#size; // Convert negative to positive equivalent
    }
    
    // Move head pointer forward by 'positions'
    for (let i = 0; i < positions; i++) {
      this.#head = this.#head.next;
    }
  }

  /**
   * Gets the element at the current head position (useful after rotation)
   * Time Complexity: O(1) - direct access to head
   * Space Complexity: O(1) - no extra space used
   * 
   * @returns {*} The data at the head, or undefined if empty
   */
  getCurrent() {
    return this.#head ? this.#head.data : undefined;
  }

  /**
   * Traverses the circular list n times (for demonstration)
   * Time Complexity: O(n * cycles) - traverses the list multiple times
   * Space Complexity: O(1) - no extra space used
   * 
   * @param {number} cycles - Number of complete cycles to traverse
   * @param {Function} callback - Function to call for each element
   */
  traverse(cycles = 1, callback = (data, index) => console.log(`Position ${index}: ${data}`)) {
    if (!this.#head) {
      return;
    }
    
    let current = this.#head;
    let position = 0;
    
    for (let cycle = 0; cycle < cycles; cycle++) {
      let count = 0;
      do {
        callback(current.data, position);
        current = current.next;
        position++;
        count++;
      } while (current !== this.#head && count < this.#size);
    }
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
    
    if (this.#size === 1) {
      this.#head = null;
    } else {
      // Find the last node
      let lastNode = this.#head;
      while (lastNode.next !== this.#head) {
        lastNode = lastNode.next;
      }
      
      this.#head = nodeToRemove.next; // Move head to next node
      lastNode.next = this.#head; // Make it circular
    }
    
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
    let previous = null;
    
    // Traverse to the position
    for (let index = 0; index < position; index++) {
      previous = nodeToRemove;
      nodeToRemove = nodeToRemove.next;
    }
    
    // Skip the node to be removed
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
  console.log('=== CircularLinkedList Implementation Demo ===\n');

  // Create a new circular linked list
  const list = new CircularLinkedList();

  console.log('1. Creating an empty circular linked list');
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
  console.log(`   Size: ${list.size}`);
  console.log(`   Current head: ${list.getCurrent()}\n`);

  console.log('4. Inserting elements at specific positions');
  list.insert('Inserted at 2', 2);
  console.log(`   After inserting at position 2: ${list.toString()}`);
  console.log(`   Size: ${list.size}\n`);

  console.log('5. Unique circular list operation: Rotation');
  console.log(`   Before rotation: ${list.getCurrent()}`);
  list.rotate(2);
  console.log(`   After rotating 2 positions: ${list.getCurrent()}`);
  console.log(`   List representation: ${list.toString()}`);
  
  list.rotate(-1); // Rotate backward
  console.log(`   After rotating -1 position: ${list.getCurrent()}`);
  console.log(`   List representation: ${list.toString()}\n`);

  console.log('6. Searching for elements');
  console.log(`   Index of "Second": ${list.indexOf('Second')}`);
  console.log(`   Index of "NotFound": ${list.indexOf('NotFound')}\n`);

  console.log('7. Demonstrating circular traversal (2 complete cycles)');
  console.log('   Traversing 2 cycles:');
  list.traverse(2, (data, index) => {
    if (index < 10) { // Limit output for demo
      console.log(`     Position ${index}: ${data}`);
    }
  });
  console.log('     ... (continues infinitely)\n');

  console.log('8. Removing elements');
  try {
    const removed = list.removeAt(0);
    console.log(`   Removed from position 0: "${removed}"`);
    console.log(`   List after removal: ${list.toString()}`);
    console.log(`   Current head: ${list.getCurrent()}`);
    
    const removedByValue = list.remove('Second');
    console.log(`   Removed by value "Second": "${removedByValue}"`);
    console.log(`   List after removal: ${list.toString()}`);
    console.log(`   Size: ${list.size}\n`);
  } catch (error) {
    console.log(`   Error: ${error.message}\n`);
  }

  console.log('9. Converting to array');
  console.log(`   Array representation: [${list.toArray().join(', ')}]\n`);

  console.log('10. Round-robin simulation');
  console.log('    Simulating round-robin scheduling:');
  const processes = ['Process A', 'Process B', 'Process C'];
  const scheduler = new CircularLinkedList();
  processes.forEach(p => scheduler.append(p));
  
  for (let i = 0; i < 8; i++) {
    console.log(`      Time slot ${i + 1}: ${scheduler.getCurrent()}`);
    scheduler.rotate(1); // Move to next process
  }
  console.log('');

  console.log('11. Clearing the list');
  list.clear();
  console.log(`   After clearing - Empty: ${list.isEmpty()}, Size: ${list.size}`);
  console.log(`   String representation: "${list.toString()}"\n`);
}

// Export class for use in other modules
export { CircularLinkedList };