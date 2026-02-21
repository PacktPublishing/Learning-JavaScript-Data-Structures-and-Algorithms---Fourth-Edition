/**
 * Dictionary (Map) Data Structure Implementation in TypeScript
 * 
 * A dictionary stores key-value pairs where each key is unique.
 * This TypeScript implementation provides type safety through generics.
 * 
 * @template V The type of values stored in the dictionary
 */

class Dictionary<V> {
  // Private property to store key-value pairs
  private items: { [key: string]: V } = {};
  
  // Private property to track the number of elements
  private _size: number = 0;

  /**
   * Converts any data type to a string representation
   * @private
   */
  private elementToString(data: unknown): string {
    if (data === null) {
      return 'null';
    } else if (data === undefined) {
      return 'undefined';
    } else if (typeof data === 'object') {
      return JSON.stringify(data);
    } else {
      return String(data);
    }
  }

  /**
   * Checks whether a key exists in the dictionary
   * Time Complexity: O(1)
   * 
   * @param key - The key to search for
   * @returns True if the key exists, false otherwise
   */
  hasKey(key: string | number | object): boolean {
    return this.items[this.elementToString(key)] != null;
  }

  /**
   * Adds or updates a key-value pair in the dictionary
   * Time Complexity: O(1)
   * 
   * @param key - The key to set
   * @param value - The value to associate with the key
   * @returns True if successful, false if key or value is invalid
   */
  set(key: string | number | object, value: V): boolean {
    if (key != null && value != null) {
      const stringKey = this.elementToString(key);
      
      // Only increment size if this is a new key
      if (!this.hasKey(key)) {
        this._size++;
      }
      
      this.items[stringKey] = value;
      return true;
    }
    return false;
  }

  /**
   * Removes a key-value pair from the dictionary
   * Time Complexity: O(1)
   * 
   * @param key - The key to remove
   * @returns True if the key was found and removed, false otherwise
   */
  remove(key: string | number | object): boolean {
    if (this.hasKey(key)) {
      const stringKey = this.elementToString(key);
      delete this.items[stringKey];
      this._size--;
      return true;
    }
    return false;
  }

  /**
   * Retrieves the value associated with a key
   * Time Complexity: O(1)
   * 
   * @param key - The key to look up
   * @returns The value associated with the key, or undefined if not found
   */
  get(key: string | number | object): V | undefined {
    return this.items[this.elementToString(key)];
  }

  /**
   * Removes all key-value pairs from the dictionary
   * Time Complexity: O(1)
   */
  clear(): void {
    this.items = {};
    this._size = 0;
  }

  /**
   * Returns the number of key-value pairs in the dictionary
   */
  get size(): number {
    return this._size;
  }

  /**
   * Checks if the dictionary is empty
   */
  isEmpty(): boolean {
    return this._size === 0;
  }

  /**
   * Returns an array of all keys in the dictionary
   * Time Complexity: O(n)
   */
  keys(): string[] {
    return Object.keys(this.items);
  }

  /**
   * Returns an array of all values in the dictionary
   * Time Complexity: O(n)
   */
  values(): V[] {
    return Object.values(this.items);
  }

  /**
   * Iterates over each key-value pair in the dictionary
   * Time Complexity: O(n)
   * 
   * @param callbackFn - Function to execute for each entry
   */
  forEach(callbackFn: (value: V, key: string) => void): void {
    for (const key in this.items) {
      if (Object.prototype.hasOwnProperty.call(this.items, key)) {
        callbackFn(this.items[key], key);
      }
    }
  }

  /**
   * Returns a string representation of the dictionary
   */
  toString(): string {
    if (this.isEmpty()) {
      return '{}';
    }
    
    const pairs: string[] = [];
    this.forEach((value, key) => {
      const valueStr = typeof value === 'string' ? `"${value}"` : String(value);
      pairs.push(`${key}: ${valueStr}`);
    });
    
    return `{ ${pairs.join(', ')} }`;
  }
}

// Example usage and demonstration
console.log('=== Dictionary (TypeScript) Demo ===\n');

// Create a dictionary with string values
const stringDict = new Dictionary<string>();

console.log('1. Creating a Dictionary<string>');
stringDict.set('name', 'Alice');
stringDict.set('city', 'New York');
stringDict.set('country', 'USA');
console.log(`   Dictionary: ${stringDict.toString()}`);
console.log(`   Size: ${stringDict.size}`);
console.log();

// Create a dictionary with number values
const numberDict = new Dictionary<number>();

console.log('2. Creating a Dictionary<number>');
numberDict.set('one', 1);
numberDict.set('two', 2);
numberDict.set('ten', 10);
console.log(`   Dictionary: ${numberDict.toString()}`);
console.log(`   Get "two": ${numberDict.get('two')}`);
console.log();

// Create a dictionary with object values
interface UserInfo {
  email: string;
  age: number;
}

const userDict = new Dictionary<UserInfo>();

console.log('3. Creating a Dictionary<UserInfo>');
userDict.set('alice', { email: 'alice@example.com', age: 30 });
userDict.set('bob', { email: 'bob@example.com', age: 25 });

const alice = userDict.get('alice');
if (alice) {
  console.log(`   Alice's email: ${alice.email}`);
  console.log(`   Alice's age: ${alice.age}`);
}
console.log();

console.log('4. Type-safe operations');
console.log('   TypeScript ensures we can only store the declared type.');
console.log('   Attempting to store wrong type would cause compile error.');
console.log();

console.log('5. Iterating with forEach');
userDict.forEach((value, key) => {
  console.log(`   ${key}: ${value.email} (age: ${value.age})`);
});

// Export the Dictionary class
export default Dictionary;
