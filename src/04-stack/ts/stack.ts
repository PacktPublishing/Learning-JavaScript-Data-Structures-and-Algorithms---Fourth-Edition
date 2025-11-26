/**
 * Stack Data Structure Implementation in TypeScript
 * 
 * A stack is a Last-In-First-Out (LIFO) data structure where elements
 * are added and removed from the same end (the top).
 * 
 * Real-world analogy: A stack of books or cafeteria trays
 * - You can only add/remove items from the top
 * - The last item added is the first one removed
 * 
 * @template T The type of elements stored in the stack
 */
class Stack<T> {
  // Private property to store stack elements
  private items: T[] = [];

  /**
   * Adds a new element to the top of the stack
   * @param item The element to add
   */
  push(item: T): void {
    this.items.push(item);
  }

  /**
   * Removes and returns the top element from the stack
   * @returns The removed element, or undefined if stack is empty
   */
  pop(): T | undefined {
    return this.items.pop();
  }

  /**
   * Returns the top element without removing it
   * @returns The top element, or undefined if stack is empty
   */
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  /**
   * Checks if the stack is empty
   * @returns True if stack is empty, false otherwise
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Returns the number of elements in the stack
   * @returns The size of the stack
   */
  get size(): number {
    return this.items.length;
  }

  /**
   * Removes all elements from the stack
   */
  clear(): void {
    this.items = [];
  }

  /**
   * Alternative clear method using pop (less efficient)
   */
  clear2(): void {
    while (!this.isEmpty()) {
      this.pop();
    }
  }

  /**
   * Returns a string representation of the stack
   * @returns String representation of stack contents
   */
  toString(): string {
    if (this.isEmpty()) {
      return '[]';
    }
    
    return this.items
      .map(item => {
        if (typeof item === 'object' && item !== null) {
          return JSON.stringify(item);
        }
        return String(item);
      })
      .join(', ');
  }
}

// Export the Stack class for use in other files
export default Stack;