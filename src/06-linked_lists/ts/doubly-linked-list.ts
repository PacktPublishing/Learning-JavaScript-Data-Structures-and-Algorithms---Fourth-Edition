/**
 * Doubly Linked List Implementation in TypeScript
 * 
 * A doubly linked list where each node contains data and references to both
 * the next and previous nodes. This TypeScript version includes full type safety,
 * generics, and interface definitions.
 */

/**
 * Interface for a doubly linked list node
 * @template T The type of data stored in the node
 */
export interface IDoublyLinkedListNode<T> {
  data: T;
  next: IDoublyLinkedListNode<T> | null;
  prev: IDoublyLinkedListNode<T> | null;
}

/**
 * Interface for a doubly linked list implementation
 * @template T The type of data stored in the list
 */
export interface IDoublyLinkedList<T> {
  append(data: T): void;
  prepend(data: T): void;
  insert(data: T, position: number): boolean;
  removeAt(position: number): T;
  remove(data: T, compareFunction?: (a: T, b: T) => boolean): T | null;
  indexOf(data: T, compareFunction?: (a: T, b: T) => boolean): number;
  isEmpty(): boolean;
  get size(): number;
  clear(): void;
  toString(): string;
  toArray(): T[];
  removeLast(): T;
  removeFirst(): T;
  toArrayReverse(): T[];
  toStringReverse(): string;
}

/**
 * DoublyLinkedListNode class representing a single node in the doubly linked list
 * @template T The type of data stored in the node
 */
export class DoublyLinkedListNode<T> implements IDoublyLinkedListNode<T> {
  public data: T;
  public next: DoublyLinkedListNode<T> | null;
  public prev: DoublyLinkedListNode<T> | null;

  /**
   * Creates a new doubly linked list node
   * @param data - The data to store in this node
   * @param next - Reference to the next node (optional)
   * @param prev - Reference to the previous node (optional)
   */
  constructor(
    data: T, 
    next: DoublyLinkedListNode<T> | null = null,
    prev: DoublyLinkedListNode<T> | null = null
  ) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

/**
 * Doubly Linked List Data Structure Implementation with TypeScript generics
 * 
 * A linear collection where each element contains references to both the next
 * and previous elements, allowing bidirectional traversal.
 * 
 * @template T The type of data stored in the list
 * 
 * Real-world analogies:
 * - A subway line where you can travel in both directions
 * - Browser history (back and forward buttons)
 * - Music playlist with previous/next navigation
 * - Undo/Redo functionality in applications
 * - Double-sided assembly line
 * 
 * Advantages:
 * - Bidirectional traversal (can go forward and backward)
 * - Efficient insertion/deletion at both ends O(1)
 * - Can remove a node in O(1) if you have a reference to it
 * - More flexible than singly linked lists
 * 
 * Disadvantages:
 * - Uses more memory (extra pointer per node)
 * - More complex implementation
 * - Slightly more overhead for insertions/deletions
 */
export class DoublyLinkedList<T> implements IDoublyLinkedList<T> {
  private head: DoublyLinkedListNode<T> | null = null;
  private tail: DoublyLinkedListNode<T> | null = null;
  private count: number = 0;

  /**
   * Adds a new element to the end of the doubly linked list
   * Time Complexity: O(1) - direct access to tail
   * Space Complexity: O(1) - only creates one new node
   * 
   * @param data - The data to add
   */
  public append(data: T): void {
    const newNode = new DoublyLinkedListNode<T>(data);
    
    if (!this.head) { // Empty list
      this.head = newNode;
      this.tail = newNode;
    } else { // Non-empty list
      newNode.prev = this.tail;
      if (this.tail) {
        this.tail.next = newNode;
      }
      this.tail = newNode;
    }
    this.count++;
  }

  /**
   * Adds a new element to the beginning of the doubly linked list
   * Time Complexity: O(1) - direct access to head
   * Space Complexity: O(1) - only creates one new node
   * 
   * @param data - The data to add
   */
  public prepend(data: T): void {
    const newNode = new DoublyLinkedListNode<T>(data);
    
    if (!this.head) { // Empty list
      this.head = newNode;
      this.tail = newNode;
    } else { // Non-empty list
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.count++;
  }

  /**
   * Inserts a new element at the specified position
   * Time Complexity: O(n) - may need to traverse to position
   * Space Complexity: O(1) - only creates one new node
   * 
   * @param data - The data to insert
   * @param position - The position to insert at (0-based)
   * @returns True if insertion was successful, false otherwise
   */
  public insert(data: T, position: number): boolean {
    if (this.isInvalidPosition(position)) {
      return false;
    }
    
    if (position === 0) {
      this.prepend(data);
      return true;
    }
    
    if (position === this.count) {
      this.append(data);
      return true;
    }
    
    const newNode = new DoublyLinkedListNode<T>(data);
    const nodeAtPosition = this.getNodeAt(position);
    
    if (nodeAtPosition && nodeAtPosition.prev) {
      // Insert between nodeAtPosition.prev and nodeAtPosition
      newNode.next = nodeAtPosition;
      newNode.prev = nodeAtPosition.prev;
      nodeAtPosition.prev.next = newNode;
      nodeAtPosition.prev = newNode;
      this.count++;
      return true;
    }
    
    return false;
  }

  /**
   * Removes and returns the element at the specified position
   * Time Complexity: O(n) - may need to traverse to position
   * Space Complexity: O(1) - no extra space used
   * 
   * @param position - The position of the element to remove (0-based)
   * @returns The removed element's data
   * @throws RangeError if position is invalid or list is empty
   */
  public removeAt(position: number): T {
    if (this.count === 0) {
      throw new RangeError('Cannot remove from an empty list.');
    }
    
    if (this.isInvalidPosition(position)) {
      throw new RangeError('Invalid position');
    }
    
    if (position === 0) {
      return this.removeFirst();
    }
    
    if (position === this.count - 1) {
      return this.removeLast();
    }
    
    const nodeToRemove = this.getNodeAt(position);
    if (!nodeToRemove) {
      throw new Error('Node not found at position');
    }
    
    // Update links to skip the node being removed
    if (nodeToRemove.prev) {
      nodeToRemove.prev.next = nodeToRemove.next;
    }
    if (nodeToRemove.next) {
      nodeToRemove.next.prev = nodeToRemove.prev;
    }
    
    this.count--;
    return nodeToRemove.data;
  }

  /**
   * Removes and returns the first element
   * Time Complexity: O(1) - direct access to head
   * Space Complexity: O(1) - no extra space used
   * 
   * @returns The removed element's data
   * @throws RangeError if list is empty
   */
  public removeFirst(): T {
    if (!this.head) {
      throw new RangeError('Cannot remove from an empty list.');
    }
    
    const nodeToRemove = this.head;
    
    if (this.count === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = nodeToRemove.next;
      if (this.head) {
        this.head.prev = null;
      }
    }
    
    this.count--;
    return nodeToRemove.data;
  }

  /**
   * Removes and returns the last element
   * Time Complexity: O(1) - direct access to tail
   * Space Complexity: O(1) - no extra space used
   * 
   * @returns The removed element's data
   * @throws RangeError if list is empty
   */
  public removeLast(): T {
    if (!this.tail) {
      throw new RangeError('Cannot remove from an empty list.');
    }
    
    const nodeToRemove = this.tail;
    
    if (this.count === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = nodeToRemove.prev;
      if (this.tail) {
        this.tail.next = null;
      }
    }
    
    this.count--;
    return nodeToRemove.data;
  }

  /**
   * Removes the first occurrence of the specified data
   * Time Complexity: O(n) - may need to search entire list
   * Space Complexity: O(1) - no extra space used
   * 
   * @param data - The data to remove
   * @param compareFunction - Optional custom comparison function
   * @returns The removed element's data, or null if not found
   */
  public remove(data: T, compareFunction: (a: T, b: T) => boolean = (a, b) => a === b): T | null {
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
   * @param data - The data to search for
   * @param compareFunction - Optional custom comparison function
   * @returns The index of the element, or -1 if not found
   */
  public indexOf(data: T, compareFunction: (a: T, b: T) => boolean = (a, b) => a === b): number {
    let current = this.head;
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
   * Checks if the doubly linked list is empty
   * Time Complexity: O(1) - direct property access
   * Space Complexity: O(1) - no extra space used
   * 
   * @returns True if the list is empty, false otherwise
   */
  public isEmpty(): boolean {
    return this.count === 0;
  }

  /**
   * Returns the number of elements in the doubly linked list
   * Time Complexity: O(1) - direct property access
   * Space Complexity: O(1) - no extra space used
   * 
   * @returns The number of elements
   */
  public get size(): number {
    return this.count;
  }

  /**
   * Removes all elements from the doubly linked list
   * Time Complexity: O(1) - just resets head, tail and count
   * Space Complexity: O(1) - no extra space used
   */
  public clear(): void {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  /**
   * Returns the element at the specified position without removing it
   * Time Complexity: O(n) - may need to traverse to position
   * Space Complexity: O(1) - no extra space used
   * 
   * @param position - The position to get the element from (0-based)
   * @returns The element at the specified position, or undefined if invalid position
   */
  public get(position: number): T | undefined {
    const node = this.getNodeAt(position);
    return node ? node.data : undefined;
  }

  /**
   * Returns the first element without removing it
   * Time Complexity: O(1) - direct access to head
   * Space Complexity: O(1) - no extra space used
   * 
   * @returns The first element, or undefined if list is empty
   */
  public getFirst(): T | undefined {
    return this.head ? this.head.data : undefined;
  }

  /**
   * Returns the last element without removing it
   * Time Complexity: O(1) - direct access to tail
   * Space Complexity: O(1) - no extra space used
   * 
   * @returns The last element, or undefined if list is empty
   */
  public getLast(): T | undefined {
    return this.tail ? this.tail.data : undefined;
  }

  /**
   * Converts the doubly linked list to a string representation (forward)
   * Time Complexity: O(n) - must traverse entire list
   * Space Complexity: O(n) - creates string with all elements
   * 
   * @returns String representation of the list
   */
  public toString(): string {
    if (!this.head) {
      return '';
    }
    
    let current = this.head;
    let objString = '';
    
    while (current) {
      objString += this.elementToString(current.data);
      if (current.next) {
        objString += ' <-> ';
      }
      current = current.next;
    }
    
    return objString;
  }

  /**
   * Converts the doubly linked list to a string representation (reverse)
   * Time Complexity: O(n) - must traverse entire list backward
   * Space Complexity: O(n) - creates string with all elements
   * 
   * @returns String representation of the list in reverse order
   */
  public toStringReverse(): string {
    if (!this.tail) {
      return '';
    }
    
    let current = this.tail;
    let objString = '';
    
    while (current) {
      objString += this.elementToString(current.data);
      if (current.prev) {
        objString += ' <-> ';
      }
      current = current.prev;
    }
    
    return objString;
  }

  /**
   * Converts the doubly linked list to an array (forward)
   * Time Complexity: O(n) - must traverse entire list
   * Space Complexity: O(n) - creates new array with all elements
   * 
   * @returns Array containing all elements in forward order
   */
  public toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    
    return result;
  }

  /**
   * Converts the doubly linked list to an array (reverse)
   * Time Complexity: O(n) - must traverse entire list backward
   * Space Complexity: O(n) - creates new array with all elements
   * 
   * @returns Array containing all elements in reverse order
   */
  public toArrayReverse(): T[] {
    const result: T[] = [];
    let current = this.tail;
    
    while (current) {
      result.push(current.data);
      current = current.prev;
    }
    
    return result;
  }

  /**
   * Finds an element using a predicate function (forward search)
   * Time Complexity: O(n) - may need to search entire list
   * Space Complexity: O(1) - no extra space used
   * 
   * @param predicate - Function that returns true for the desired element
   * @returns The first element that satisfies the predicate, or undefined if not found
   */
  public find(predicate: (data: T) => boolean): T | undefined {
    let current = this.head;
    
    while (current) {
      if (predicate(current.data)) {
        return current.data;
      }
      current = current.next;
    }
    
    return undefined;
  }

  /**
   * Finds an element using a predicate function (reverse search)
   * Time Complexity: O(n) - may need to search entire list
   * Space Complexity: O(1) - no extra space used
   * 
   * @param predicate - Function that returns true for the desired element
   * @returns The first element that satisfies the predicate (searching backward), or undefined if not found
   */
  public findReverse(predicate: (data: T) => boolean): T | undefined {
    let current = this.tail;
    
    while (current) {
      if (predicate(current.data)) {
        return current.data;
      }
      current = current.prev;
    }
    
    return undefined;
  }

  /**
   * Executes a function for each element in the list (forward)
   * Time Complexity: O(n) - must traverse entire list
   * Space Complexity: O(1) - no extra space used
   * 
   * @param callback - Function to execute for each element
   */
  public forEach(callback: (data: T, index: number) => void): void {
    let current = this.head;
    let index = 0;
    
    while (current) {
      callback(current.data, index);
      current = current.next;
      index++;
    }
  }

  /**
   * Executes a function for each element in the list (reverse)
   * Time Complexity: O(n) - must traverse entire list
   * Space Complexity: O(1) - no extra space used
   * 
   * @param callback - Function to execute for each element
   */
  public forEachReverse(callback: (data: T, index: number) => void): void {
    let current = this.tail;
    let index = this.count - 1;
    
    while (current) {
      callback(current.data, index);
      current = current.prev;
      index--;
    }
  }

  /**
   * Transforms elements using a mapping function
   * Time Complexity: O(n) - must traverse entire list
   * Space Complexity: O(n) - creates new list with transformed elements
   * 
   * @template U The type of the transformed elements
   * @param mapper - Function that transforms each element
   * @returns New DoublyLinkedList containing transformed elements
   */
  public map<U>(mapper: (data: T) => U): DoublyLinkedList<U> {
    const result = new DoublyLinkedList<U>();
    let current = this.head;
    
    while (current) {
      result.append(mapper(current.data));
      current = current.next;
    }
    
    return result;
  }

  /**
   * Filters elements using a predicate function
   * Time Complexity: O(n) - must traverse entire list
   * Space Complexity: O(k) - where k is number of matching elements
   * 
   * @param predicate - Function that returns true for elements to include
   * @returns New DoublyLinkedList containing only elements that satisfy the predicate
   */
  public filter(predicate: (data: T) => boolean): DoublyLinkedList<T> {
    const result = new DoublyLinkedList<T>();
    let current = this.head;
    
    while (current) {
      if (predicate(current.data)) {
        result.append(current.data);
      }
      current = current.next;
    }
    
    return result;
  }

  // Private helper methods

  /**
   * Gets the node at the specified position (optimized for doubly linked list)
   * @private
   * @param position - The position to get the node from
   * @returns The node at the position, or null if invalid
   */
  private getNodeAt(position: number): DoublyLinkedListNode<T> | null {
    if (this.isInvalidPosition(position)) {
      return null;
    }
    
    // Optimization: traverse from head or tail depending on position
    if (position < this.count / 2) {
      // Traverse from head (forward)
      let current = this.head;
      for (let index = 0; index < position && current; index++) {
        current = current.next;
      }
      return current;
    } else {
      // Traverse from tail (backward)
      let current = this.tail;
      for (let index = this.count - 1; index > position && current; index--) {
        current = current.prev;
      }
      return current;
    }
  }

  /**
   * Validates if a position is within valid bounds
   * @private
   * @param position - The position to validate
   * @returns True if position is invalid
   */
  private isInvalidPosition(position: number): boolean {
    return position < 0 || position >= this.count;
  }

  /**
   * Converts an element to its string representation
   * @private
   * @param element - The element to convert
   * @returns String representation of the element
   */
  private elementToString(element: T): string {
    if (element === null) {
      return 'null';
    } else if (element === undefined) {
      return 'undefined';
    } else if (typeof element === 'string') {
      return `"${element}"`;
    } else {
      return String(element);
    }
  }
}

// Example usage and demonstration
if (require.main === module) {
  console.log('=== TypeScript DoublyLinkedList Implementation Demo ===\n');

  // Create a new doubly linked list with type safety
  const numberList = new DoublyLinkedList<number>();
  const stringList = new DoublyLinkedList<string>();

  console.log('1. Creating typed doubly linked lists');
  console.log(`   Number list empty: ${numberList.isEmpty()}`);
  console.log(`   String list empty: ${stringList.isEmpty()}\n`);

  console.log('2. Adding numbers to both ends');
  numberList.append(20);
  numberList.append(30);
  numberList.prepend(10);
  numberList.prepend(5);
  console.log(`   Forward: ${numberList.toString()}`);
  console.log(`   Reverse: ${numberList.toStringReverse()}`);
  console.log(`   Size: ${numberList.size}\n`);

  console.log('3. Accessing first and last elements');
  console.log(`   First: ${numberList.getFirst()}`);
  console.log(`   Last: ${numberList.getLast()}\n`);

  console.log('4. Inserting in the middle');
  numberList.insert(15, 2);
  console.log(`   After inserting 15 at position 2: ${numberList.toString()}`);
  console.log(`   Size: ${numberList.size}\n`);

  console.log('5. Bidirectional traversal with forEach');
  console.log('   Forward traversal:');
  numberList.forEach((num, index) => {
    console.log(`     Index ${index}: ${num}`);
  });
  
  console.log('   Reverse traversal:');
  numberList.forEachReverse((num, index) => {
    console.log(`     Index ${index}: ${num}`);
  });
  console.log('');

  console.log('6. Type-safe transformations');
  const squaredList = numberList.map(x => x * x);
  console.log(`   Original: ${numberList.toString()}`);
  console.log(`   Squared: ${squaredList.toString()}`);
  
  const evenNumbers = numberList.filter(x => x % 2 === 0);
  console.log(`   Even numbers: ${evenNumbers.toString()}\n`);

  console.log('7. Bidirectional searching');
  const foundForward = numberList.find(x => x > 15);
  const foundReverse = numberList.findReverse(x => x > 15);
  console.log(`   Forward search (> 15): ${foundForward}`);
  console.log(`   Reverse search (> 15): ${foundReverse}\n`);

  console.log('8. Working with complex objects');
  interface Task {
    id: number;
    title: string;
    priority: 'low' | 'medium' | 'high';
    completed: boolean;
  }
  
  const taskList = new DoublyLinkedList<Task>();
  taskList.append({ id: 1, title: 'Review code', priority: 'high', completed: false });
  taskList.append({ id: 2, title: 'Update docs', priority: 'medium', completed: false });
  taskList.append({ id: 3, title: 'Fix typo', priority: 'low', completed: true });
  
  console.log('   Task list:');
  taskList.forEach((task, index) => {
    const status = task.completed ? '✓' : '○';
    console.log(`     ${status} ${task.title} (${task.priority} priority)`);
  });
  
  // Filter completed tasks
  const completedTasks = taskList.filter(task => task.completed);
  console.log(`   Completed tasks: ${completedTasks.size}\n`);

  console.log('9. Removing elements efficiently');
  console.log(`   Before removal: ${numberList.toString()}`);
  
  const removedFirst = numberList.removeFirst();
  console.log(`   Removed first: ${removedFirst}`);
  
  const removedLast = numberList.removeLast();
  console.log(`   Removed last: ${removedLast}`);
  
  console.log(`   After removals: ${numberList.toString()}`);
  console.log(`   Size: ${numberList.size}\n`);

  console.log('10. Converting to arrays');
  const forwardArray = numberList.toArray();
  const reverseArray = numberList.toArrayReverse();
  console.log(`   Forward array: [${forwardArray.join(', ')}]`);
  console.log(`   Reverse array: [${reverseArray.join(', ')}]\n`);

  console.log('11. Interface compliance demonstration');
  const list: IDoublyLinkedList<string> = new DoublyLinkedList<string>();
  list.append('TypeScript');
  list.prepend('Doubly');
  list.append('Lists');
  console.log(`   Interface-typed list: ${list.toString()}\n`);

  console.log('12. Error handling with strong typing');
  try {
    const emptyList = new DoublyLinkedList<number>();
    emptyList.removeFirst(); // Should throw error
  } catch (error) {
    console.log(`   Error: ${error instanceof Error ? error.message : 'Unknown error'}\n`);
  }
}