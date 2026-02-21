/**
 * HashTable Data Structure Implementation
 * 
 * A hash table (also called a hash map) stores key-value pairs
 * using a hash function to determine storage locations.
 * 
 * How it works:
 * 1. Hash Function: Takes a key and produces a numerical hash code
 * 2. Storage: Uses an array where each position is called a bucket
 * 3. Insertion: Hash the key, use result as array index, store value
 * 4. Retrieval: Hash the key again, access array at that index
 * 
 * Real-world uses:
 * - Database indexing for fast data retrieval
 * - Caching systems (browser cache, CDN cache)
 * - Symbol tables in compilers
 * - Email address books (name → email)
 * 
 * Note: This basic implementation does NOT handle collisions.
 * See hash-table-separate-chaining.js and hash-table-linear-probing.js
 * for collision-resistant implementations.
 */
class HashTable {
  // Private array to store values
  #table = [];

  /**
   * Converts any data type to a string representation
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
   * The "lose-lose" hash function
   * A simple hash function that sums ASCII values of characters.
   * 
   * Note: This is a basic function prone to collisions.
   * Used here for educational purposes to demonstrate collision handling.
   * 
   * @private
   * @param {*} key - The key to hash
   * @returns {number} The computed hash code
   */
  #loseLoseHashCode(key) {
    if (typeof key !== 'string') {
      key = this.#elementToString(key);
    }
    
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    
    // Use modulo with a prime number to keep values in a reasonable range
    return hash % 37;
  }

  /**
   * Public hash function wrapper
   * Allows easy swapping of hash algorithms without changing other code
   * 
   * @param {*} key - The key to hash
   * @returns {number} The computed hash code
   */
  hash(key) {
    return this.#loseLoseHashCode(key);
  }

  /**
   * Adds or updates a key-value pair in the hash table
   * Time Complexity: O(1) average case
   * 
   * @param {*} key - The key to set
   * @param {*} value - The value to store
   * @returns {boolean} True if successful, false if key or value is invalid
   */
  put(key, value) {
    if (key == null || value == null) {
      return false;
    }
    
    const index = this.hash(key);
    this.#table[index] = value;
    return true;
  }

  /**
   * Retrieves the value associated with a key
   * Time Complexity: O(1) average case
   * 
   * @param {*} key - The key to look up
   * @returns {*} The value, or undefined if not found
   */
  get(key) {
    if (key == null) {
      return undefined;
    }
    
    const index = this.hash(key);
    return this.#table[index];
  }

  /**
   * Removes the value associated with a key
   * Time Complexity: O(1) average case
   * 
   * @param {*} key - The key to remove
   * @returns {boolean} True if found and removed, false otherwise
   */
  remove(key) {
    if (key == null) {
      return false;
    }
    
    const index = this.hash(key);
    if (this.#table[index] != null) {
      delete this.#table[index];
      return true;
    }
    return false;
  }

  /**
   * Returns a string representation of the hash table
   * Shows only occupied positions
   * 
   * @returns {string} String representation
   */
  toString() {
    const keys = Object.keys(this.#table);
    
    if (keys.length === 0) {
      return 'Hash table is empty';
    }
    
    let objString = '';
    for (const key of keys) {
      const value = this.#table[key];
      const valueStr = typeof value === 'string' ? `"${value}"` : value;
      objString += `{${key} => ${valueStr}}\n`;
    }
    
    return objString.trim();
  }

  /**
   * Returns the underlying table for inspection
   * Useful for debugging and understanding internal structure
   * 
   * @returns {Array} The internal table array
   */
  getTable() {
    return [...this.#table];
  }
}

// Example usage and demonstration
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('=== HashTable Data Structure Demo ===\n');

  const hashTable = new HashTable();

  console.log('1. Understanding the hash function');
  console.log('   Computing hash codes for various keys:');
  console.log(`   hash("Gandalf") = ${hashTable.hash('Gandalf')}`);
  console.log(`   hash("John") = ${hashTable.hash('John')}`);
  console.log(`   hash("Tyrion") = ${hashTable.hash('Tyrion')}`);
  console.log();

  console.log('2. Adding contacts to the hash table');
  hashTable.put('Gandalf', 'gandalf@email.com');
  hashTable.put('John', 'johnsnow@email.com');
  hashTable.put('Tyrion', 'tyrion@email.com');
  console.log('   Added: Gandalf, John, Tyrion');
  console.log();
  
  console.log('3. Current hash table contents:');
  console.log(hashTable.toString().split('\n').map(line => '   ' + line).join('\n'));
  console.log();

  console.log('4. Retrieving values');
  console.log(`   Get "Gandalf": ${hashTable.get('Gandalf')}`);
  console.log(`   Get "John": ${hashTable.get('John')}`);
  console.log(`   Get "Loiane" (not added): ${hashTable.get('Loiane')}`);
  console.log();

  console.log('5. Removing a value');
  const removed = hashTable.remove('Gandalf');
  console.log(`   Removed "Gandalf": ${removed}`);
  console.log(`   Get "Gandalf" now: ${hashTable.get('Gandalf')}`);
  console.log();

  console.log('6. Demonstrating collision problem');
  console.log('   The lose-lose hash function can cause collisions...');
  console.log();
  
  const collisionDemo = new HashTable();
  const names = ['Jonathan', 'Jamie', 'Sue', 'Aethelwulf'];
  
  console.log('   Hash values for similar-hash names:');
  for (const name of names) {
    console.log(`   hash("${name}") = ${collisionDemo.hash(name)}`);
  }
  console.log();
  
  console.log('   Adding these names with their emails...');
  for (const name of names) {
    collisionDemo.put(name, `${name.toLowerCase()}@email.com`);
  }
  console.log();
  
  console.log('   Trying to retrieve all of them:');
  for (const name of names) {
    console.log(`   Get "${name}": ${collisionDemo.get(name) || 'LOST!'}`);
  }
  console.log();
  
  console.log('   ⚠️  Notice: Values were overwritten due to collisions!');
  console.log('   See separate chaining and linear probing for solutions.');
}

// Export the HashTable class
export default HashTable;
