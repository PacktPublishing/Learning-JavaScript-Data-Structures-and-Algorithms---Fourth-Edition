/**
 * HashTable with Linear Probing for Collision Handling
 * 
 * Linear probing is a collision resolution technique where all key-value
 * pairs are stored directly in the hash table array. When a collision occurs,
 * we search sequentially for the next available empty slot.
 * 
 * Advantages:
 * - Space efficient - no linked list overhead
 * - Better cache performance than separate chaining
 * - Simple implementation
 * 
 * Disadvantages:
 * - Can lead to clustering (consecutive occupied slots)
 * - Performance degrades as table fills up
 * - Removal is complex (must maintain probe sequence)
 * 
 * This implementation uses "hard deletion with rehashing" - when an element
 * is removed, subsequent elements in the probe sequence are repositioned
 * to maintain the integrity of the hash table.
 */

class HashTableLinearProbing {
  // Private array to store key-value pairs
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
   * Simple but collision-prone - useful for demonstrating linear probing
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
   * @private
   */
  #djb2HashCode(key) {
    if (typeof key !== 'string') {
      key = this.#elementToString(key);
    }
    
    let hash = 5381;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 33) + key.charCodeAt(i);
    }
    
    return hash % 1013;
  }

  /**
   * Public hash function wrapper
   */
  hash(key) {
    return this.#loseLoseHashCode(key);
    // Use this for better distribution:
    // return this.#djb2HashCode(key);
  }

  /**
   * Adds or updates a key-value pair using linear probing
   * Time Complexity: O(1) average, O(n) worst case
   * 
   * @param {*} key - The key to set
   * @param {*} value - The value to store
   * @returns {boolean} True if successful
   */
  put(key, value) {
    if (key != null && value != null) {
      let index = this.hash(key);
      
      // Linear probe until we find an empty slot or the same key
      while (this.#table[index] != null) {
        // If key already exists, update the value
        if (this.#table[index].key === key) {
          this.#table[index].value = value;
          return true;
        }
        // Move to next slot
        index++;
        // Wrap around if we reach the end (circular probing)
        if (this.#table.length > 0) {
          index = index % this.#table.length || index;
        }
      }
      
      // Found an empty slot, store the key-value pair
      this.#table[index] = { key, value };
      return true;
    }
    return false;
  }

  /**
   * Retrieves the value associated with a key using linear probing
   * Time Complexity: O(1) average, O(n) worst case
   * 
   * @param {*} key - The key to look up
   * @returns {*} The value, or undefined if not found
   */
  get(key) {
    let index = this.hash(key);
    
    // Linear probe to find the key
    while (this.#table[index] != null) {
      if (this.#table[index].key === key) {
        return this.#table[index].value;
      }
      index++;
      // Prevent infinite loop
      if (this.#table.length > 0) {
        index = index % this.#table.length || index;
      }
    }
    
    // Key not found (hit an empty slot)
    return undefined;
  }

  /**
   * Removes the key-value pair and rehashes affected elements
   * Time Complexity: O(1) average, O(n) worst case
   * 
   * @param {*} key - The key to remove
   * @returns {boolean} True if found and removed
   */
  remove(key) {
    let index = this.hash(key);
    
    // Linear probe to find the key
    while (this.#table[index] != null) {
      if (this.#table[index].key === key) {
        // Found it - delete and verify side effects
        delete this.#table[index];
        this.#verifyRemoveSideEffect(key, index);
        return true;
      }
      index++;
      if (this.#table.length > 0) {
        index = index % this.#table.length || index;
      }
    }
    
    return false;
  }

  /**
   * Repositions elements that may have been displaced due to collisions
   * This maintains the probe sequence integrity after a removal
   * @private
   * 
   * @param {*} key - The removed key
   * @param {number} removedPosition - The position where the key was removed
   */
  #verifyRemoveSideEffect(key, removedPosition) {
    const size = this.#table.length;
    let index = removedPosition + 1;
    
    // Check all subsequent elements in the probe sequence
    while (this.#table[index] != null) {
      const currentKey = this.#table[index].key;
      const currentHash = this.hash(currentKey);
      
      // If this element's original hash is <= removed position,
      // it may have been displaced by the removed element
      if (currentHash <= removedPosition) {
        // Move this element back to fill the gap
        this.#table[removedPosition] = this.#table[index];
        delete this.#table[index];
        removedPosition = index;
      }
      
      index++;
      if (size > 0 && index >= size) {
        index = 0; // Wrap around
      }
    }
  }

  /**
   * Returns a string representation of the hash table
   */
  toString() {
    const keys = Object.keys(this.#table);
    
    if (keys.length === 0) {
      return 'Hash table is empty';
    }
    
    let result = '';
    for (const index of keys) {
      const item = this.#table[index];
      if (item != null) {
        const valueStr = typeof item.value === 'string' ? `"${item.value}"` : item.value;
        result += `{${index}} => [${item.key}: ${valueStr}]\n`;
      }
    }
    
    return result.trim();
  }

  /**
   * Returns statistics about the hash table
   */
  getStats() {
    let totalElements = 0;
    let clusterCount = 0;
    let maxClusterSize = 0;
    let currentClusterSize = 0;
    let lastIndex = -2;
    
    for (const index in this.#table) {
      if (this.#table[index] != null) {
        totalElements++;
        const numIndex = parseInt(index);
        
        if (numIndex === lastIndex + 1) {
          currentClusterSize++;
        } else {
          if (currentClusterSize > 0) {
            clusterCount++;
            maxClusterSize = Math.max(maxClusterSize, currentClusterSize);
          }
          currentClusterSize = 1;
        }
        lastIndex = numIndex;
      }
    }
    
    // Count the last cluster
    if (currentClusterSize > 0) {
      clusterCount++;
      maxClusterSize = Math.max(maxClusterSize, currentClusterSize);
    }
    
    return {
      totalElements,
      clusterCount,
      maxClusterSize,
      avgClusterSize: clusterCount > 0 ? (totalElements / clusterCount).toFixed(2) : 0
    };
  }
}

// Example usage and demonstration
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('=== HashTable with Linear Probing Demo ===\n');

  const hashTable = new HashTableLinearProbing();

  console.log('1. Understanding linear probing with collisions');
  console.log('   Adding names that will have hash collisions...');
  console.log();
  
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

  console.log('   Original hash values:');
  for (const [name] of contacts) {
    console.log(`   hash("${name}") = ${hashTable.hash(name)}`);
  }
  console.log();

  console.log('2. Adding all contacts with linear probing...');
  for (const [name, email] of contacts) {
    hashTable.put(name, email);
  }
  console.log('   Done!\n');

  console.log('3. Current hash table structure:');
  console.log('   (Notice how collisions are resolved by using next available slots)');
  console.log(hashTable.toString().split('\n').map(line => '   ' + line).join('\n'));
  console.log();

  console.log('4. Retrieving all values (no data loss!):');
  for (const [name] of contacts) {
    const email = hashTable.get(name);
    console.log(`   "${name}" => ${email}`);
  }
  console.log();

  console.log('5. Hash table statistics (showing clustering effect):');
  const stats = hashTable.getStats();
  console.log(`   Total elements: ${stats.totalElements}`);
  console.log(`   Number of clusters: ${stats.clusterCount}`);
  console.log(`   Largest cluster: ${stats.maxClusterSize}`);
  console.log(`   Average cluster size: ${stats.avgClusterSize}`);
  console.log();

  console.log('6. Demonstrating removal with rehashing');
  console.log('   Removing "Jonathan" (causes rehashing of displaced elements)...');
  console.log();
  
  console.log('   Before removal:');
  console.log(`   Get "Jonathan": ${hashTable.get('Jonathan')}`);
  console.log(`   Get "Jamie": ${hashTable.get('Jamie')}`);
  console.log(`   Get "Sue": ${hashTable.get('Sue')}`);
  console.log();
  
  const removed = hashTable.remove('Jonathan');
  console.log(`   Removed "Jonathan": ${removed}`);
  console.log();
  
  console.log('   After removal (elements rehashed to fill gap):');
  console.log(hashTable.toString().split('\n').map(line => '   ' + line).join('\n'));
  console.log();

  console.log('7. Verifying other values still accessible:');
  console.log(`   Get "Jamie": ${hashTable.get('Jamie')}`);
  console.log(`   Get "Sue": ${hashTable.get('Sue')}`);
  console.log(`   Get "Aethelwulf": ${hashTable.get('Aethelwulf')}`);
  console.log(`   Get "Jonathan" (removed): ${hashTable.get('Jonathan')}`);
}

// Export the class
export default HashTableLinearProbing;
