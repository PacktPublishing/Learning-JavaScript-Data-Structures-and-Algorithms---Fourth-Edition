/**
 * Linked List Implementation in TypeScript
 * 
 * A singly linked list where each node contains data and a reference to the next node.
 * This TypeScript version includes full type safety, generics, and interface definitions.
 */

/**
 * Interface for a basic linked list node
 * @template T The type of data stored in the node
 */
export interface ILinkedListNode<T> {
  data: T;
  next: ILinkedListNode<T> | null;
}

/**
 * Interface for a linked list implementation
 * @template T The type of data stored in the list
 */
export interface ILinkedList<T> {
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
}

/**
 * LinkedListNode class representing a single node in the linked list
 * @template T The type of data stored in the node
 */
export class LinkedListNode<T> implements ILinkedListNode<T> {
  public data: T;
  public next: LinkedListNode<T> | null;

  /**
   * Creates a new linked list node
   * @param data - The data to store in this node
   * @param next - Reference to the next node (optional)
   */
  constructor(data: T, next: LinkedListNode<T> | null = null) {
    this.data = data;
    this.next = next;
  }
}

/**
 * Linked List Data Structure Implementation with TypeScript generics
 * 
 * A linear collection of data elements whose order is not given by their
 * physical placement in memory. Instead, each element points to the next.
 * 
 * @template T The type of data stored in the list
 * 
 * Real-world analogies:
 * - A chain where each link connects to the next link
 * - A treasure hunt where each clue leads to the next location
 * - A line of people where each person knows who's next
 * - A train where each car is connected to the next car
 * 
 * Advantages:
 * - Dynamic size - can grow and shrink during runtime
 * - Efficient insertion/deletion at the beginning (O(1))
 * - Memory efficient - only allocates memory when needed
 * - No memory waste - no unused allocated space
 * 
 * Disadvantages:
 * - No random access - must traverse from head to reach an element
 * - Extra memory overhead for storing pointers
 * - Not cache-friendly due to non-contiguous memory allocation
 * - Sequential access only
 */
export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null = null;
  private count: number = 0;

  /**
   * Adds a new element to the end of the linked list
   * Time Complexity: O(n) - must traverse to the end
   * Space Complexity: O(1) - only creates one new node
   * 
   * @param data - The data to add
   */
  public append(data: T): void {
    const newNode = new LinkedListNode<T>(data);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.count++;
  }

  /**
   * Adds a new element to the beginning of the linked list
   * Time Complexity: O(1) - direct insertion at head
   * Space Complexity: O(1) - only creates one new node
   * 
   * @param data - The data to add
   */
  public prepend(data: T): void {
    const newNode = new LinkedListNode<T>(data, this.head);
    this.head = newNode;
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
    const previous = this.getNodeAt(position - 1);
    
    if (previous) {
      newNode.next = previous.next;
      previous.next = newNode;
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
    
    if (position === 0 && this.head) {
      const nodeToRemove = this.head;
      this.head = this.head.next;
      this.count--;
      return nodeToRemove.data;
    }
    
    const previous = this.getNodeAt(position - 1);
    if (previous && previous.next) {
      const nodeToRemove = previous.next;
      previous.next = nodeToRemove.next;
      this.count--;
      return nodeToRemove.data;
    }
    
    throw new Error('Unexpected error during removal');
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
   * Checks if the linked list is empty
   * Time Complexity: O(1) - direct property access
   * Space Complexity: O(1) - no extra space used
   * 
   * @returns True if the list is empty, false otherwise
   */
  public isEmpty(): boolean {
    return this.count === 0;
  }

  /**
   * Returns the number of elements in the linked list
   * Time Complexity: O(1) - direct property access
   * Space Complexity: O(1) - no extra space used
   * 
   * @returns The number of elements
   */
  public get size(): number {
    return this.count;
  }

  /**
   * Removes all elements from the linked list
   * Time Complexity: O(1) - just resets head and count
   * Space Complexity: O(1) - no extra space used
   */
  public clear(): void {
    this.head = null;
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
   * Converts the linked list to a string representation
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
        objString += ' -> ';
      }
      current = current.next;
    }
    
    return objString;
  }

  /**
   * Converts the linked list to an array
   * Time Complexity: O(n) - must traverse entire list
   * Space Complexity: O(n) - creates new array with all elements
   * 
   * @returns Array containing all elements
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
   * Finds an element using a predicate function
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
   * Filters elements using a predicate function
   * Time Complexity: O(n) - must traverse entire list
   * Space Complexity: O(k) - where k is number of matching elements
   * 
   * @param predicate - Function that returns true for elements to include
   * @returns New LinkedList containing only elements that satisfy the predicate
   */
  public filter(predicate: (data: T) => boolean): LinkedList<T> {
    const result = new LinkedList<T>();
    let current = this.head;
    
    while (current) {
      if (predicate(current.data)) {
        result.append(current.data);
      }
      current = current.next;
    }
    
    return result;
  }

  /**
   * Transforms elements using a mapping function
   * Time Complexity: O(n) - must traverse entire list
   * Space Complexity: O(n) - creates new list with transformed elements
   * 
   * @template U The type of the transformed elements
   * @param mapper - Function that transforms each element
   * @returns New LinkedList containing transformed elements
   */
  public map<U>(mapper: (data: T) => U): LinkedList<U> {
    const result = new LinkedList<U>();
    let current = this.head;
    
    while (current) {
      result.append(mapper(current.data));
      current = current.next;
    }
    
    return result;
  }

  /**
   * Executes a function for each element in the list
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
   * Reduces the list to a single value using a reducer function
   * Time Complexity: O(n) - must traverse entire list
   * Space Complexity: O(1) - no extra space used (excluding accumulator)
   * 
   * @template U The type of the accumulated value
   * @param reducer - Function that combines elements
   * @param initialValue - Initial value for the accumulator
   * @returns The accumulated result
   */
  public reduce<U>(reducer: (accumulator: U, current: T, index: number) => U, initialValue: U): U {
    let current = this.head;
    let accumulator = initialValue;
    let index = 0;
    
    while (current) {
      accumulator = reducer(accumulator, current.data, index);
      current = current.next;
      index++;
    }
    
    return accumulator;
  }

  // Private helper methods

  /**
   * Gets the node at the specified position
   * @private
   * @param position - The position to get the node from
   * @returns The node at the position, or null if invalid
   */
  private getNodeAt(position: number): LinkedListNode<T> | null {
    if (this.isInvalidPosition(position)) {
      return null;
    }
    
    let current = this.head;
    for (let index = 0; index < position && current; index++) {
      current = current.next;
    }
    
    return current;
  }

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
  console.log('=== TypeScript LinkedList Implementation Demo ===\n');

  // Create a new linked list with type safety
  const numberList = new LinkedList<number>();
  const stringList = new LinkedList<string>();

  console.log('1. Creating typed linked lists');
  console.log(`   Number list empty: ${numberList.isEmpty()}`);
  console.log(`   String list empty: ${stringList.isEmpty()}\n`);

  console.log('2. Adding numbers to number list');
  numberList.append(10);
  numberList.append(20);
  numberList.append(30);
  numberList.prepend(5);
  console.log(`   Number list: ${numberList.toString()}`);
  console.log(`   Size: ${numberList.size}\n`);

  console.log('3. Adding strings to string list');
  stringList.append('World');
  stringList.prepend('Hello');
  stringList.insert('Beautiful', 1);
  console.log(`   String list: ${stringList.toString()}`);
  console.log(`   Size: ${stringList.size}\n`);

  console.log('4. Type-safe operations');
  const firstNumber: number | undefined = numberList.get(0);
  const firstString: string | undefined = stringList.get(0);
  console.log(`   First number: ${firstNumber}`);
  console.log(`   First string: ${firstString}\n`);

  console.log('5. Functional programming methods');
  
  // Map: Transform numbers to their squares
  const squaredList = numberList.map(x => x * x);
  console.log(`   Original numbers: ${numberList.toString()}`);
  console.log(`   Squared numbers: ${squaredList.toString()}`);
  
  // Filter: Get even numbers only
  const evenNumbers = numberList.filter(x => x % 2 === 0);
  console.log(`   Even numbers: ${evenNumbers.toString()}`);
  
  // Reduce: Calculate sum of all numbers
  const sum = numberList.reduce((acc, curr) => acc + curr, 0);
  console.log(`   Sum of numbers: ${sum}\n`);

  console.log('6. Find operations with type safety');
  const foundNumber = numberList.find(x => x > 15);
  const foundString = stringList.find(s => s.includes('ell'));
  console.log(`   Number > 15: ${foundNumber}`);
  console.log(`   String containing 'ell': ${foundString}\n`);

  console.log('7. Converting to arrays (typed)');
  const numberArray: number[] = numberList.toArray();
  const stringArray: string[] = stringList.toArray();
  console.log(`   Number array: [${numberArray.join(', ')}]`);
  console.log(`   String array: [${stringArray.join(', ')}]\n`);

  console.log('8. Custom comparison with complex objects');
  interface Person {
    name: string;
    age: number;
  }
  
  const personList = new LinkedList<Person>();
  personList.append({ name: 'Alice', age: 30 });
  personList.append({ name: 'Bob', age: 25 });
  personList.append({ name: 'Charlie', age: 35 });
  
  console.log(`   Person list: ${personList.toString()}`);
  
  // Find person by name using custom comparison
  const removedPerson = personList.remove(
    { name: 'Bob', age: 0 }, // Age doesn't matter for comparison
    (a, b) => a.name === b.name
  );
  console.log(`   Removed person: ${removedPerson ? removedPerson.name : 'None'}`);
  console.log(`   Updated list: ${personList.toString()}\n`);

  console.log('9. ForEach with type safety');
  console.log('   Iterating through string list:');
  stringList.forEach((str: string, index: number) => {
    console.log(`     Index ${index}: "${str}" (length: ${str.length})`);
  });
  console.log('');

  console.log('10. Error handling with TypeScript types');
  try {
    const item: number = numberList.removeAt(10); // Invalid position
    console.log(`   Removed: ${item}`);
  } catch (error) {
    console.log(`   Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
  console.log('');

  console.log('11. Interface compliance demonstration');
  const list: ILinkedList<string> = new LinkedList<string>();
  list.append('Interface');
  list.append('Compliance');
  console.log(`   Interface-typed list: ${list.toString()}\n`);
}