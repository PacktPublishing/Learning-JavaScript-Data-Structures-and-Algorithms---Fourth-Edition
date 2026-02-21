/**
 * Dictionary (Map) Data Structure Implementation
 * 
 * A dictionary stores key-value pairs where each key is unique.
 * Unlike sets which store only values, dictionaries associate
 * a unique key with a corresponding value.
 * 
 * Also known as:
 * - Maps (JavaScript ES6+, Java, C++)
 * - Dictionaries (Python, C#)
 * - Associative arrays (PHP)
 * - Symbol tables (compiler design)
 * 
 * Real-world analogies:
 * - A phone book (name → phone number)
 * - A language dictionary (word → definition)
 * - A translation guide (English word → Spanish word)
 */
class Dictionary {
  // Private property to store key-value pairs
  #items = {};
  
  // Private property to track the number of elements
  #size = 0;

  /**
   * Converts any data type to a string representation
   * This ensures consistent key handling regardless of input type
   * @private
   * @param {*} data - The data to convert
   * @returns {string} String representation of the data
   */
  #elementToString(data) {
    if (data === null) {
      return 'null';
    } else if (data === undefined) {
      return 'undefined';
    } else if (typeof data === 'object') {
      return JSON.stringify(data);
    } else {
      return data.toString();
    }
  }

  /**
   * Checks whether a key exists in the dictionary
   * Time Complexity: O(1) - direct property access
   * 
   * @param {*} key - The key to search for
   * @returns {boolean} True if the key exists, false otherwise
   */
  hasKey(key) {
    return this.#items[this.#elementToString(key)] != null;
  }

  /**
   * Adds or updates a key-value pair in the dictionary
   * Time Complexity: O(1) - direct property assignment
   * 
   * @param {*} key - The key to set
   * @param {*} value - The value to associate with the key
   * @returns {boolean} True if successful, false if key or value is invalid
   */
  set(key, value) {
    if (key != null && value != null) {
      const stringKey = this.#elementToString(key);
      
      // Only increment size if this is a new key
      if (!this.hasKey(key)) {
        this.#size++;
      }
      
      this.#items[stringKey] = value;
      return true;
    }
    return false;
  }

  /**
   * Removes a key-value pair from the dictionary
   * Time Complexity: O(1) - direct property deletion
   * 
   * @param {*} key - The key to remove
   * @returns {boolean} True if the key was found and removed, false otherwise
   */
  remove(key) {
    if (this.hasKey(key)) {
      const stringKey = this.#elementToString(key);
      delete this.#items[stringKey];
      this.#size--;
      return true;
    }
    return false;
  }

  /**
   * Retrieves the value associated with a key
   * Time Complexity: O(1) - direct property access
   * 
   * @param {*} key - The key to look up
   * @returns {*} The value associated with the key, or undefined if not found
   */
  get(key) {
    return this.#items[this.#elementToString(key)];
  }

  /**
   * Removes all key-value pairs from the dictionary
   * Time Complexity: O(1) - creates new empty object
   */
  clear() {
    this.#items = {};
    this.#size = 0;
  }

  /**
   * Returns the number of key-value pairs in the dictionary
   * @returns {number} The number of elements
   */
  get size() {
    return this.#size;
  }

  /**
   * Checks if the dictionary is empty
   * @returns {boolean} True if empty, false otherwise
   */
  isEmpty() {
    return this.#size === 0;
  }

  /**
   * Returns an array of all keys in the dictionary
   * Time Complexity: O(n) - must enumerate all keys
   * 
   * @returns {string[]} Array of all keys
   */
  keys() {
    return Object.keys(this.#items);
  }

  /**
   * Returns an array of all values in the dictionary
   * Time Complexity: O(n) - must enumerate all values
   * 
   * @returns {Array} Array of all values
   */
  values() {
    return Object.values(this.#items);
  }

  /**
   * Iterates over each key-value pair in the dictionary
   * Time Complexity: O(n) - visits each element once
   * 
   * @param {Function} callbackFn - Function to execute for each entry
   *                                 Receives (value, key) as arguments
   */
  forEach(callbackFn) {
    for (const key in this.#items) {
      if (Object.prototype.hasOwnProperty.call(this.#items, key)) {
        callbackFn(this.#items[key], key);
      }
    }
  }

  /**
   * Returns a string representation of the dictionary
   * @returns {string} String representation
   */
  toString() {
    if (this.isEmpty()) {
      return '{}';
    }
    
    const pairs = [];
    this.forEach((value, key) => {
      const valueStr = typeof value === 'string' ? `"${value}"` : value;
      pairs.push(`${key}: ${valueStr}`);
    });
    
    return `{ ${pairs.join(', ')} }`;
  }
}

// Example usage and demonstration
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('=== Dictionary Data Structure Demo ===\n');

  const dict = new Dictionary();

  console.log('1. Creating an empty dictionary');
  console.log(`   Empty: ${dict.isEmpty()}`);
  console.log(`   Size: ${dict.size}\n`);

  console.log('2. Adding key-value pairs');
  dict.set('name', 'Alice');
  dict.set('age', 30);
  dict.set('city', 'New York');
  console.log(`   Dictionary: ${dict.toString()}`);
  console.log(`   Size: ${dict.size}\n`);

  console.log('3. Retrieving values');
  console.log(`   Name: ${dict.get('name')}`);
  console.log(`   Age: ${dict.get('age')}`);
  console.log(`   Country (not set): ${dict.get('country')}\n`);

  console.log('4. Checking if keys exist');
  console.log(`   Has "name": ${dict.hasKey('name')}`);
  console.log(`   Has "country": ${dict.hasKey('country')}\n`);

  console.log('5. Getting all keys and values');
  console.log(`   Keys: [${dict.keys().join(', ')}]`);
  console.log(`   Values: [${dict.values().join(', ')}]\n`);

  console.log('6. Iterating with forEach');
  dict.forEach((value, key) => {
    console.log(`   ${key} => ${value}`);
  });
  console.log();

  console.log('7. Updating an existing key');
  dict.set('age', 31);
  console.log(`   Updated age: ${dict.get('age')}`);
  console.log(`   Size (unchanged): ${dict.size}\n`);

  console.log('8. Removing a key');
  const removed = dict.remove('city');
  console.log(`   Removed "city": ${removed}`);
  console.log(`   Dictionary: ${dict.toString()}`);
  console.log(`   Size: ${dict.size}\n`);

  console.log('9. Clearing the dictionary');
  dict.clear();
  console.log(`   After clear - Empty: ${dict.isEmpty()}, Size: ${dict.size}`);
}

// Export the Dictionary class
export default Dictionary;
