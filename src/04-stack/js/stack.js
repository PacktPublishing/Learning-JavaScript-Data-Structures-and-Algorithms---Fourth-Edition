/**
 * Stack Data Structure Implementation
 * 
 * A stack is a Last-In-First-Out (LIFO) data structure where elements
 * are added and removed from the same end (the top).
 * 
 * Real-world analogy: A stack of books or cafeteria trays
 * - You can only add/remove items from the top
 * - The last item added is the first one removed
 */
class Stack {
  constructor() {
    // Private property to store stack elements
    this.#items = [];
  }

  // Private field declaration
  #items = [];

  /**
   * Adds a new element to the top of the stack
   * @param {*} item - The element to add
   */
  push(item) {
    this.#items.push(item);
  }

  /**
   * Removes and returns the top element from the stack
   * @returns {*} The removed element, or undefined if stack is empty
   */
  pop() {
    return this.#items.pop();
  }

  /**
   * Returns the top element without removing it
   * @returns {*} The top element, or undefined if stack is empty
   */
  peek() {
    return this.#items[this.#items.length - 1];
  }

  /**
   * Checks if the stack is empty
   * @returns {boolean} True if stack is empty, false otherwise
   */
  isEmpty() {
    return this.#items.length === 0;
  }

  /**
   * Returns the number of elements in the stack
   * @returns {number} The size of the stack
   */
  get size() {
    return this.#items.length;
  }

  /**
   * Removes all elements from the stack
   */
  clear() {
    this.#items = [];
  }

  /**
   * Alternative clear method using pop (less efficient)
   */
  clear2() {
    while (!this.isEmpty()) {
      this.pop();
    }
  }

  /**
   * Returns a string representation of the stack
   * @returns {string} String representation of stack contents
   */
  toString() {
    if (this.isEmpty()) {
      return '[]';
    }
    
    return this.#items
      .map(item => {
        if (typeof item === 'object' && item !== null) {
          return JSON.stringify(item);
        }
        return item.toString();
      })
      .join(', ');
  }
}

// Export the Stack class for use in other files
module.exports = Stack;