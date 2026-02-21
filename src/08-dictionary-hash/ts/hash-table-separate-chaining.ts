/**
 * HashTable with Separate Chaining for Collision Handling (TypeScript)
 * 
 * Separate chaining stores colliding elements in linked lists at each bucket.
 * This TypeScript implementation provides full type safety.
 * 
 * @template V The type of values stored in the hash table
 */

import { LinkedList } from '../../06-linked_lists/ts/linked-list.js';

/**
 * Interface for key-value pairs stored in the hash table
 */
interface KeyValuePair<V> {
  key: string;
  value: V;
}

class HashTableSeparateChaining<V> {
  // Private array where each position holds a linked list
  private table: (LinkedList<KeyValuePair<V>> | undefined)[] = [];

  /**
   * The "lose-lose" hash function
   * @private
   */
  private loseLoseHashCode(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  }

  /**
   * The "djb2" hash function - better distribution
   * @private
   */
  private djb2HashCode(key: string): number {
    let hash = 5381;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 33) + key.charCodeAt(i);
    }
    return hash % 1013;
  }

  /**
   * Public hash function wrapper
   */
  hash(key: string): number {
    return this.loseLoseHashCode(key);
  }

  /**
   * Finds the index of a key within a linked list at a given bucket
   * @private
   */
  private findKeyIndex(bucketIndex: number, key: string): number {
    const linkedList = this.table[bucketIndex];
    if (linkedList == null) {
      return -1;
    }
    
    const items = linkedList.toArray();
    for (let i = 0; i < items.length; i++) {
      if (items[i].key === key) {
        return i;
      }
    }
    
    return -1;
  }

  /**
   * Adds or updates a key-value pair in the hash table
   * Time Complexity: O(1) average, O(n) worst case
   */
  put(key: string, value: V): boolean {
    if (key != null && value != null) {
      const index = this.hash(key);
      
      // Create a new linked list at this index if needed
      if (this.table[index] == null) {
        this.table[index] = new LinkedList<KeyValuePair<V>>();
      }
      
      // Check if key already exists and update it
      const existingIndex = this.findKeyIndex(index, key);
      if (existingIndex >= 0) {
        this.table[index]!.removeAt(existingIndex);
      }
      
      // Add the key-value pair to the linked list
      this.table[index]!.append({ key, value });
      return true;
    }
    return false;
  }

  /**
   * Retrieves the value associated with a key
   * Time Complexity: O(1) average, O(n) worst case
   */
  get(key: string): V | undefined {
    const index = this.hash(key);
    const linkedList = this.table[index];
    
    if (linkedList != null) {
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
   */
  remove(key: string): boolean {
    const index = this.hash(key);
    const linkedList = this.table[index];
    
    if (linkedList != null) {
      const keyIndex = this.findKeyIndex(index, key);
      
      if (keyIndex >= 0) {
        linkedList.removeAt(keyIndex);
        
        // Clean up empty linked lists
        if (linkedList.isEmpty()) {
          this.table[index] = undefined;
        }
        
        return true;
      }
    }
    
    return false;
  }

  /**
   * Returns a string representation of the hash table
   */
  toString(): string {
    const keys = Object.keys(this.table);
    
    if (keys.length === 0) {
      return 'Hash table is empty';
    }
    
    let result = '';
    for (const bucketIndex of keys) {
      const linkedList = this.table[parseInt(bucketIndex)];
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
  getStats(): { totalElements: number; bucketsUsed: number; maxChainLength: number; avgChainLength: string } {
    let totalElements = 0;
    let maxChainLength = 0;
    let bucketsUsed = 0;
    
    for (const index in this.table) {
      const linkedList = this.table[index];
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
      avgChainLength: bucketsUsed > 0 ? (totalElements / bucketsUsed).toFixed(2) : '0'
    };
  }
}

// Example usage and demonstration
console.log('=== HashTable with Separate Chaining (TypeScript) Demo ===\n');

// Create hash table with string values
const emailTable = new HashTableSeparateChaining<string>();

console.log('1. Adding contacts with colliding hash values');

const contacts: [string, string][] = [
  ['Ygritte', 'ygritte@email.com'],
  ['Jonathan', 'jonathan@email.com'],
  ['Jamie', 'jamie@email.com'],
  ['Jack', 'jack@email.com'],
  ['Nathan', 'nathan@email.com'],
  ['Sue', 'sue@email.com'],
];

console.log('   Hash values:');
for (const [name] of contacts) {
  console.log(`   hash("${name}") = ${emailTable.hash(name)}`);
}
console.log();

console.log('2. Adding all contacts...');
for (const [name, email] of contacts) {
  emailTable.put(name, email);
}
console.log(emailTable.toString().split('\n').map(line => '   ' + line).join('\n'));
console.log();

console.log('3. Retrieving values with type safety');
const jonathanEmail: string | undefined = emailTable.get('Jonathan');
console.log(`   Jonathan's email: ${jonathanEmail}`);
console.log(`   Sue's email: ${emailTable.get('Sue')}`);
console.log();

console.log('4. Statistics');
const stats = emailTable.getStats();
console.log(`   Total elements: ${stats.totalElements}`);
console.log(`   Buckets used: ${stats.bucketsUsed}`);
console.log(`   Max chain length: ${stats.maxChainLength}`);
console.log(`   Avg chain length: ${stats.avgChainLength}`);

// Export the class
export default HashTableSeparateChaining;
