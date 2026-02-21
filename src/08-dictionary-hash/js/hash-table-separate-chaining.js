/**
 * HashTable with Separate Chaining for Collision Handling
 * 
 * Separate chaining is a collision resolution technique where each bucket
 * in the hash table holds a linked list of key-value pairs. When multiple
 * keys hash to the same index, they are all stored in that bucket's list.
 * 
 * Advantages:
 * - Handles collisions gracefully - no data loss
 * - Simple to implement and understand
 * - Dynamic sizing - lists grow as needed
 * - Good average performance O(1) when chains are short
 * 
 * Disadvantages:
 * - Extra memory overhead for linked list pointers
 * - Not cache-friendly (nodes scattered in memory)
 * - Worst-case O(n) if many keys hash to same index
 */

// Import the LinkedList class from Chapter 6
// Note: In your setup, adjust the path as needed
import { LinkedList } from '../../06-linked_lists/js/linked-list.js';

class HashTableSeparateChaining {
  // Private array where each position holds a linked list
  #table = [];

  /**
   * Converts any data type to a string representation
   * @private
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
   * Simple but collision-prone - good for demonstrating collision handling
   * @private
   */
  #loseLoseHashCode(key) {
    if (typeof key !== 'string') {
      key = this.#elementToString(key);
    }
    
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    
    return hash % 37;
  }

  /**
   * The "djb2" hash function - a better alternative
   * Produces better distribution and fewer collisions
   * @private
   */
  #djb2HashCode(key) {
    if (typeof key !== 'string') {
      key = this.#elementToString(key);
    }
    
    let hash = 5381; // Magic prime number
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 33) + key.charCodeAt(i);
    }
    
    return hash % 1013; // Another prime number
  }

  /**
   * Public hash function wrapper
   * Switch between loseLoseHashCode and djb2HashCode as needed
   */
  hash(key) {
    return this.#loseLoseHashCode(key);
    // Use this for better distribution:
    // return this.#djb2HashCode(key);
  }

  /**
   * Adds or updates a key-value pair in the hash table
   * Time Complexity: O(1) average, O(n) worst case if chain is long
   * 
   * @param {*} key - The key to set
   * @param {*} value - The value to store
   * @returns {boolean} True if successful
   */
  put(key, value) {
    if (key != null && value != null) {
      const index = this.hash(key);
      
      // Create a new linked list at this index if needed
      if (this.#table[index] == null) {
        this.#table[index] = new LinkedList();
      }
      
      // Check if key already exists and update it
      const existingIndex = this.#findKeyIndex(index, key);
      if (existingIndex >= 0) {
        // Key exists - remove old entry first
        this.#table[index].removeAt(existingIndex);
      }
      
      // Add the key-value pair to the linked list
      this.#table[index].append({ key, value });
      return true;
    }
    return false;
  }

  /**
   * Finds the index of a key within a linked list at a given bucket
   * @private
   */
  #findKeyIndex(bucketIndex, key) {
    const linkedList = this.#table[bucketIndex];
    if (linkedList == null) {
      return -1;
    }
    
    let foundIndex = -1;
    let currentIndex = 0;
    
    // Use toArray to iterate through the linked list
    const items = linkedList.toArray();
    for (let i = 0; i < items.length; i++) {
      if (items[i].key === key) {
        foundIndex = i;
        break;
      }
    }
    
    return foundIndex;
  }

  /**
   * Retrieves the value associated with a key
   * Time Complexity: O(1) average, O(n) worst case
   * 
   * @param {*} key - The key to look up
   * @returns {*} The value, or undefined if not found
   */
  get(key) {
    const index = this.hash(key);
    const linkedList = this.#table[index];
    
    if (linkedList != null) {
      // Search through the linked list for the key
      const items = linkedList.toArray();
      for (const item of items) {
        if (item.key === key) {
          return item.value;
        }
      }
    }
    
    return undefined;
  }

  /**
   * Removes the key-value pair associated with a key
   * Time Complexity: O(1) average, O(n) worst case
   * 
   * @param {*} key - The key to remove
   * @returns {boolean} True if found and removed
   */
  remove(key) {
    const index = this.hash(key);
    const linkedList = this.#table[index];
    
    if (linkedList != null) {
      const keyIndex = this.#findKeyIndex(index, key);
      
      if (keyIndex >= 0) {
        linkedList.removeAt(keyIndex);
        
        // Clean up empty linked lists
        if (linkedList.isEmpty()) {
          this.#table[index] = undefined;
        }
        
        return true;
      }
    }
    
    return false;
  }

  /**
   * Returns a string representation of the hash table
   * Shows buckets and their linked list contents
   */
  toString() {
    const keys = Object.keys(this.#table);
    
    if (keys.length === 0) {
      return 'Hash table is empty';
    }
    
    let result = '';
    for (const bucketIndex of keys) {
      const linkedList = this.#table[bucketIndex];
      if (linkedList != null) {
        const items = linkedList.toArray();
        const itemsStr = items.map(item => `[${item.key}: ${item.value}]`).join(' -> ');
        result += `{Bucket ${bucketIndex}} => ${itemsStr}\n`;
      }
    }
    
    return result.trim();
  }

  /**
   * Returns statistics about the hash table
   */
  getStats() {
    let totalElements = 0;
    let maxChainLength = 0;
    let bucketsUsed = 0;
    
    for (const index in this.#table) {
      const linkedList = this.#table[index];
      if (linkedList != null && !linkedList.isEmpty()) {
        bucketsUsed++;
        const chainLength = linkedList.size;
        totalElements += chainLength;
        maxChainLength = Math.max(maxChainLength, chainLength);
      }
    }
    
    return {
      totalElements,
      bucketsUsed,
      maxChainLength,
      avgChainLength: bucketsUsed > 0 ? (totalElements / bucketsUsed).toFixed(2) : 0
    };
  }
}

// Example usage and demonstration
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('=== HashTable with Separate Chaining Demo ===\n');

  const hashTable = new HashTableSeparateChaining();

  console.log('1. Demonstrating collision handling');
  console.log('   Adding names with colliding hash values...');
  console.log();
  
  // These names will have colliding hash values with lose-lose
  const contacts = [
    ['Ygritte', 'ygritte@email.com'],
    ['Jonathan', 'jonathan@email.com'],
    ['Jamie', 'jamie@email.com'],
    ['Jack', 'jack@email.com'],
    ['Jasmine', 'jasmine@email.com'],
    ['Jake', 'jake@email.com'],
    ['Nathan', 'nathan@email.com'],
    ['Athelstan', 'athelstan@email.com'],
    ['Sue', 'sue@email.com'],
    ['Aethelwulf', 'aethelwulf@email.com'],
    ['Sargeras', 'sargeras@email.com'],
  ];

  console.log('   Hash values for each name:');
  for (const [name] of contacts) {
    console.log(`   hash("${name}") = ${hashTable.hash(name)}`);
  }
  console.log();

  console.log('2. Adding all contacts...');
  for (const [name, email] of contacts) {
    hashTable.put(name, email);
  }
  console.log('   Done!\n');

  console.log('3. Current hash table structure:');
  console.log(hashTable.toString().split('\n').map(line => '   ' + line).join('\n'));
  console.log();

  console.log('4. Retrieving all values (no data loss!):');
  for (const [name] of contacts) {
    const email = hashTable.get(name);
    console.log(`   "${name}" => ${email}`);
  }
  console.log();

  console.log('5. Hash table statistics:');
  const stats = hashTable.getStats();
  console.log(`   Total elements: ${stats.totalElements}`);
  console.log(`   Buckets used: ${stats.bucketsUsed}`);
  console.log(`   Longest chain: ${stats.maxChainLength}`);
  console.log(`   Average chain length: ${stats.avgChainLength}`);
  console.log();

  console.log('6. Removing a value from a chain');
  console.log(`   Removing "Jamie"...`);
  const removed = hashTable.remove('Jamie');
  console.log(`   Removed: ${removed}`);
  console.log(`   Get "Jamie" now: ${hashTable.get('Jamie')}`);
  console.log();
  
  console.log('   Updated structure:');
  console.log(hashTable.toString().split('\n').map(line => '   ' + line).join('\n'));
  console.log();

  console.log('7. Other values in same bucket still accessible:');
  console.log(`   Get "Jonathan": ${hashTable.get('Jonathan')}`);
  console.log(`   Get "Sue": ${hashTable.get('Sue')}`);
}

// Export the class
export default HashTableSeparateChaining;
