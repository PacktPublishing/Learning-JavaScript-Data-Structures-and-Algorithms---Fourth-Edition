/**
 * Circular Linked List Implementation in TypeScript
 * 
 * A circular linked list where the last node points back to the first node
 * instead of pointing to null, creating a continuous loop.
 * This TypeScript version includes full type safety, generics, and interfaces.
 */

import { LinkedListNode, ILinkedListNode } from './linked-list';

/**
 * Interface for a circular linked list implementation
 * @template T The type of data stored in the list
 */
export interface ICircularLinkedList<T> {
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
  rotate(positions?: number): void;
  getCurrent(): T | undefined;
  traverse(cycles: number, callback: (data: T, index: number) => void): void;
}

/**
 * Circular Linked List Data Structure Implementation with TypeScript generics
 * 
 * A linear collection where the last node points back to the first node,
 * creating a continuous loop with no explicit beginning or end.
 * 
 * @template T The type of data stored in the list
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
export class CircularLinkedList<T> implements ICircularLinkedList<T> {
  private head: LinkedListNode<T> | null = null;
  private count: number = 0;

  /**
   * Adds a new element to the end of the circular linked list
   * Time Complexity: O(n) - must traverse to find the last node
   * Space Complexity: O(1) - only creates one new node
   * 
   * @param data - The data to add
   */
  public append(data: T): void {
    const newNode = new LinkedListNode<T>(data);
    
    if (!this.head) { // Empty list
      this.head = newNode;
      newNode.next = this.head; // Points to itself
    } else { // Non-empty list
      let current = this.head;
      // Find the last node (the one pointing to head)
      while (current.next !== this.head) {
        current = current.next!;
      }
      current.next = newNode;
      newNode.next = this.head; // Maintain circular reference
    }
    this.count++;
  }

  /**
   * Adds a new element to the beginning of the circular linked list
   * Time Complexity: O(n) - must find last node to update its next pointer
   * Space Complexity: O(1) - only creates one new node
   * 
   * @param data - The data to add
   */
  public prepend(data: T): void {
    const newNode = new LinkedListNode<T>(data, this.head);
    
    if (!this.head) {
      this.head = newNode;
      newNode.next = this.head; // Make it circular
    } else {
      // Find the last node to update its next pointer
      let current = this.head;
      while (current.next !== this.head) {
        current = current.next!;
      }
      current.next = newNode;
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
    
    const newNode = new LinkedListNode<T>(data);
    let current = this.head!;
    let previous: LinkedListNode<T> | null = null;
    
    // Traverse to the insertion position
    for (let index = 0; index < position; index++) {
      previous = current;
      current = current.next as LinkedListNode<T>;
    }
    
    // Insert the new node
    newNode.next = current;
    if (previous) {
      previous.next = newNode;
    }
    this.count++;
    return true;
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
      return this.removeFromHead();
    }
    
    return this.removeFromMiddleOrEnd(position);
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
    if (!this.head) {
      return -1;
    }
    
    let current = this.head;
    let index = 0;
    
    do {
      if (compareFunction(current.data, data)) {
        return index;
      }
      index++;
      current = current.next as LinkedListNode<T>;
    } while (current !== this.head && index < this.count);
    
    return -1;
  }

  /**
   * Checks if the circular linked list is empty
   * Time Complexity: O(1) - direct property access
   * Space Complexity: O(1) - no extra space used
   * 
   * @returns True if the list is empty, false otherwise
   */
  public isEmpty(): boolean {
    return this.count === 0;
  }

  /**
   * Returns the number of elements in the circular linked list
   * Time Complexity: O(1) - direct property access
   * Space Complexity: O(1) - no extra space used
   * 
   * @returns The number of elements
   */
  public get size(): number {
    return this.count;
  }

  /**
   * Removes all elements from the circular linked list
   * Time Complexity: O(1) - just resets head and count
   * Space Complexity: O(1) - no extra space used
   */
  public clear(): void {
    this.head = null;
    this.count = 0;
  }

  /**
   * Converts the circular linked list to a string representation
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
    let itemCount = 0;
    
    do {
      objString += this.elementToString(current.data);
      current = current.next as LinkedListNode<T>;
      itemCount++;
      if (itemCount < this.count) {
        objString += ' -> ';
      }
    } while (current !== this.head && itemCount < this.count);
    
    objString += ' -> (circular)';
    return objString;
  }

  /**
   * Converts the circular linked list to an array
   * Time Complexity: O(n) - must traverse entire list
   * Space Complexity: O(n) - creates new array with all elements
   * 
   * @returns Array containing all elements
   */
  public toArray(): T[] {
    const result: T[] = [];
    
    if (!this.head) {
      return result;
    }
    
    let current = this.head;
    let itemCount = 0;
    
    do {
      result.push(current.data);
      current = current.next as LinkedListNode<T>;
      itemCount++;
    } while (current !== this.head && itemCount < this.count);
    
    return result;
  }

  /**
   * Rotates the circular list by moving the head pointer
   * This is a unique operation for circular lists
   * Time Complexity: O(k) where k is the number of positions to rotate
   * Space Complexity: O(1) - no extra space used
   * 
   * @param positions - Number of positions to rotate (positive = forward, negative = backward)
   */
  public rotate(positions: number = 1): void {
    if (this.count === 0 || this.count === 1) {
      return;
    }
    
    // Normalize positions to avoid unnecessary full rotations
    let normalizedPositions = positions % this.count;
    if (normalizedPositions < 0) {
      normalizedPositions += this.count; // Convert negative to positive equivalent
    }
    
    // Move head pointer forward by 'normalizedPositions'
    for (let i = 0; i < normalizedPositions; i++) {
      this.head = this.head!.next as LinkedListNode<T>;
    }
  }

  /**
   * Gets the element at the current head position (useful after rotation)
   * Time Complexity: O(1) - direct access to head
   * Space Complexity: O(1) - no extra space used
   * 
   * @returns The data at the head, or undefined if empty
   */
  public getCurrent(): T | undefined {
    return this.head ? this.head.data : undefined;
  }

  /**
   * Gets the element at the specified position without removing it
   * Time Complexity: O(n) - may need to traverse to position
   * Space Complexity: O(1) - no extra space used
   * 
   * @param position - The position to get the element from (0-based)
   * @returns The element at the specified position, or undefined if invalid position
   */
  public get(position: number): T | undefined {
    if (this.isInvalidPosition(position) || !this.head) {
      return undefined;
    }
    
    let current = this.head;
    for (let index = 0; index < position; index++) {
      current = current.next as LinkedListNode<T>;
    }
    
    return current.data;
  }

  /**
   * Traverses the circular list n times (for demonstration)
   * Time Complexity: O(n * cycles) - traverses the list multiple times
   * Space Complexity: O(1) - no extra space used
   * 
   * @param cycles - Number of complete cycles to traverse
   * @param callback - Function to call for each element
   */
  public traverse(cycles: number = 1, callback: (data: T, index: number) => void = (data, index) => console.log(`Position ${index}: ${data}`)): void {
    if (!this.head) {
      return;
    }
    
    let current = this.head;
    let position = 0;
    
    for (let cycle = 0; cycle < cycles; cycle++) {
      let itemCount = 0;
      do {
        callback(current.data, position);
        current = current.next as LinkedListNode<T>;
        position++;
        itemCount++;
      } while (current !== this.head && itemCount < this.count);
    }
  }

  /**
   * Finds an element using a predicate function
   * Time Complexity: O(n) - may need to search entire list
   * Space Complexity: O(1) - no extra space used
   * 
   * @param predicate - Function that returns true for the desired element
   * @returns The first element that satisfies the predicate, or undefined if not found
   */
  public find(predicate: (data: T) => boolean): T | undefined {
    if (!this.head) {
      return undefined;
    }
    
    let current = this.head;
    let itemCount = 0;
    
    do {
      if (predicate(current.data)) {
        return current.data;
      }
      current = current.next as LinkedListNode<T>;
      itemCount++;
    } while (current !== this.head && itemCount < this.count);
    
    return undefined;
  }

  /**
   * Executes a function for each element in the list
   * Time Complexity: O(n) - must traverse entire list
   * Space Complexity: O(1) - no extra space used
   * 
   * @param callback - Function to execute for each element
   */
  public forEach(callback: (data: T, index: number) => void): void {
    if (!this.head) {
      return;
    }
    
    let current = this.head;
    let index = 0;
    let itemCount = 0;
    
    do {
      callback(current.data, index);
      current = current.next as LinkedListNode<T>;
      index++;
      itemCount++;
    } while (current !== this.head && itemCount < this.count);
  }

  /**
   * Transforms elements using a mapping function
   * Time Complexity: O(n) - must traverse entire list
   * Space Complexity: O(n) - creates new list with transformed elements
   * 
   * @template U The type of the transformed elements
   * @param mapper - Function that transforms each element
   * @returns New CircularLinkedList containing transformed elements
   */
  public map<U>(mapper: (data: T) => U): CircularLinkedList<U> {
    const result = new CircularLinkedList<U>();
    
    if (!this.head) {
      return result;
    }
    
    let current = this.head;
    let itemCount = 0;
    
    do {
      result.append(mapper(current.data));
      current = current.next as LinkedListNode<T>;
      itemCount++;
    } while (current !== this.head && itemCount < this.count);
    
    return result;
  }

  /**
   * Filters elements using a predicate function
   * Time Complexity: O(n) - must traverse entire list
   * Space Complexity: O(k) - where k is number of matching elements
   * 
   * @param predicate - Function that returns true for elements to include
   * @returns New CircularLinkedList containing only elements that satisfy the predicate
   */
  public filter(predicate: (data: T) => boolean): CircularLinkedList<T> {
    const result = new CircularLinkedList<T>();
    
    if (!this.head) {
      return result;
    }
    
    let current = this.head;
    let itemCount = 0;
    
    do {
      if (predicate(current.data)) {
        result.append(current.data);
      }
      current = current.next as LinkedListNode<T>;
      itemCount++;
    } while (current !== this.head && itemCount < this.count);
    
    return result;
  }

  // Private helper methods

  /**
   * Validates if a position is within valid bounds
   * @private
   * @param position - The position to validate
   * @returns True if position is invalid
   */
  private isInvalidPosition(position: number): boolean {
    return position < 0 || position > this.count;
  }

  /**
   * Removes the head node
   * @private
   * @returns The removed element's data
   */
  private removeFromHead(): T {
    const nodeToRemove = this.head!;
    
    if (this.count === 1) {
      this.head = null;
    } else {
      // Find the last node
      let lastNode = this.head!;
      while (lastNode.next !== this.head) {
        lastNode = lastNode.next as LinkedListNode<T>;
      }
      
      this.head = nodeToRemove.next as LinkedListNode<T>; // Move head to next node
      lastNode.next = this.head; // Make it circular
    }
    
    this.count--;
    return nodeToRemove.data;
  }

  /**
   * Removes a node from the middle or end of the list
   * @private
   * @param position - The position to remove from
   * @returns The removed element's data
   */
  private removeFromMiddleOrEnd(position: number): T {
    let nodeToRemove = this.head!;
    let previous: LinkedListNode<T> | null = null;
    
    // Traverse to the position
    for (let index = 0; index < position; index++) {
      previous = nodeToRemove;
      nodeToRemove = nodeToRemove.next as LinkedListNode<T>;
    }
    
    // Skip the node to be removed
    if (previous) {
      previous.next = nodeToRemove.next;
    }
    this.count--;
    return nodeToRemove.data;
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
  console.log('=== TypeScript CircularLinkedList Implementation Demo ===\n');

  // Create a new circular linked list with type safety
  const numberList = new CircularLinkedList<number>();
  const stringList = new CircularLinkedList<string>();

  console.log('1. Creating typed circular linked lists');
  console.log(`   Number list empty: ${numberList.isEmpty()}`);
  console.log(`   String list empty: ${stringList.isEmpty()}\n`);

  console.log('2. Adding elements using append() and prepend()');
  numberList.append(10);
  numberList.append(20);
  numberList.append(30);
  numberList.prepend(5);
  console.log(`   Numbers: ${numberList.toString()}`);
  console.log(`   Size: ${numberList.size}\n`);

  console.log('3. Unique circular operation: Rotation with type safety');
  console.log(`   Current head: ${numberList.getCurrent()}`);
  numberList.rotate(2);
  console.log(`   After rotating 2 positions: ${numberList.getCurrent()}`);
  numberList.rotate(-1);
  console.log(`   After rotating -1 position: ${numberList.getCurrent()}\n`);

  console.log('4. Type-safe transformations');
  const squaredList = numberList.map(x => x * x);
  console.log(`   Original: ${numberList.toString()}`);
  console.log(`   Squared: ${squaredList.toString()}`);
  
  const evenNumbers = numberList.filter(x => x % 2 === 0);
  console.log(`   Even numbers: ${evenNumbers.toString()}\n`);

  console.log('5. Working with complex types');
  interface Player {
    name: string;
    score: number;
    isActive: boolean;
  }
  
  const playerQueue = new CircularLinkedList<Player>();
  playerQueue.append({ name: 'Alice', score: 100, isActive: true });
  playerQueue.append({ name: 'Bob', score: 150, isActive: true });
  playerQueue.append({ name: 'Charlie', score: 75, isActive: false });
  playerQueue.append({ name: 'Diana', score: 200, isActive: true });
  
  console.log('   Players in queue:');
  playerQueue.forEach((player, index) => {
    const status = player.isActive ? 'Active' : 'Inactive';
    console.log(`     ${index}: ${player.name} (Score: ${player.score}, ${status})`);
  });

  // Round-robin active players simulation
  console.log('   Round-robin for active players:');
  const activePlayers = playerQueue.filter(p => p.isActive);
  for (let turn = 0; turn < 6; turn++) {
    const currentPlayer = activePlayers.getCurrent();
    console.log(`     Turn ${turn + 1}: ${currentPlayer?.name} (Score: ${currentPlayer?.score})`);
    activePlayers.rotate(1);
  }
  console.log('');

  console.log('6. Circular traversal with type safety');
  console.log('   Traversing 2 complete cycles:');
  const demoList = new CircularLinkedList<string>();
  ['A', 'B', 'C'].forEach(item => demoList.append(item));
  
  demoList.traverse(2, (data: string, index: number) => {
    if (index < 8) { // Limit output for demo
      console.log(`     Position ${index}: ${data}`);
    }
  });
  console.log('     ... (continues infinitely)\n');

  console.log('7. Type-safe searching and finding');
  const foundNumber = numberList.find(x => x > 15);
  console.log(`   Number > 15: ${foundNumber}`);
  
  const foundPlayer = playerQueue.find(p => p.score > 180);
  console.log(`   Player with score > 180: ${foundPlayer?.name}\n`);

  console.log('8. Converting to array with type safety');
  const numberArray: number[] = numberList.toArray();
  const playerArray: Player[] = playerQueue.toArray();
  console.log(`   Number array: [${numberArray.join(', ')}]`);
  console.log(`   Player names: [${playerArray.map(p => p.name).join(', ')}]\n`);

  console.log('9. Interface compliance demonstration');
  const list: ICircularLinkedList<string> = new CircularLinkedList<string>();
  list.append('TypeScript');
  list.append('Circular');
  list.append('Lists');
  console.log(`   Interface-typed list: ${list.toString()}\n`);

  console.log('10. Error handling with strong typing');
  try {
    const emptyList = new CircularLinkedList<number>();
    emptyList.removeAt(0); // Should throw error
  } catch (error) {
    console.log(`   Error: ${error instanceof Error ? error.message : 'Unknown error'}\n`);
  }
}