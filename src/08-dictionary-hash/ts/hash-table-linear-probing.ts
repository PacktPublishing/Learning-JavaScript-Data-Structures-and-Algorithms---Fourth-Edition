/**
 * HashTable with Linear Probing for Collision Handling (TypeScript)
 * 
 * Linear probing stores all key-value pairs directly in the array.
 * When a collision occurs, it searches for the next available slot.
 * 
 * @template V The type of values stored in the hash table
 */

/**
 * Interface for key-value pairs stored in the hash table
 */
interface KeyValuePair<V> {
  key: string;
  value: V;
}

class HashTableLinearProbing<V> {
  // Private array to store key-value pairs
  private table: (KeyValuePair<V> | undefined)[] = [];

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
   * The "djb2" hash function
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
   * Adds or updates a key-value pair using linear probing
   * Time Complexity: O(1) average, O(n) worst case
   */
  put(key: string, value: V): boolean {
    if (key != null && value != null) {
      let index = this.hash(key);
      
      // Linear probe until we find an empty slot or the same key
      while (this.table[index] != null) {
        // If key already exists, update the value
        if (this.table[index]!.key === key) {
          this.table[index]!.value = value;
          return true;
        }
        // Move to next slot
        index++;
        if (this.table.length > 0) {
          index = index % this.table.length || index;
        }
      }
      
      // Found an empty slot
      this.table[index] = { key, value };
      return true;
    }
    return false;
  }

  /**
   * Retrieves the value associated with a key using linear probing
   * Time Complexity: O(1) average, O(n) worst case
   */
  get(key: string): V | undefined {
    let index = this.hash(key);
    
    while (this.table[index] != null) {
      if (this.table[index]!.key === key) {
        return this.table[index]!.value;
      }
      index++;
      if (this.table.length > 0) {
        index = index % this.table.length || index;
      }
    }
    
    return undefined;
  }

  /**
   * Removes the key-value pair and rehashes affected elements
   * Time Complexity: O(1) average, O(n) worst case
   */
  remove(key: string): boolean {
    let index = this.hash(key);
    
    while (this.table[index] != null) {
      if (this.table[index]!.key === key) {
        delete this.table[index];
        this.verifyRemoveSideEffect(key, index);
        return true;
      }
      index++;
      if (this.table.length > 0) {
        index = index % this.table.length || index;
      }
    }
    
    return false;
  }

  /**
   * Repositions elements that may have been displaced due to collisions
   * @private
   */
  private verifyRemoveSideEffect(key: string, removedPosition: number): void {
    const size = this.table.length;
    let index = removedPosition + 1;
    
    while (this.table[index] != null) {
      const currentKey = this.table[index]!.key;
      const currentHash = this.hash(currentKey);
      
      if (currentHash <= removedPosition) {
        this.table[removedPosition] = this.table[index];
        delete this.table[index];
        removedPosition = index;
      }
      
      index++;
      if (size > 0 && index >= size) {
        index = 0;
      }
    }
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
    for (const index of keys) {
      const item = this.table[parseInt(index)];
      if (item != null) {
        const valueStr = typeof item.value === 'string' ? `"${item.value}"` : String(item.value);
        result += `{${index}} => [${item.key}: ${valueStr}]\n`;
      }
    }
    
    return result.trim();
  }

  /**
   * Returns statistics about the hash table
   */
  getStats(): { totalElements: number; clusterCount: number; maxClusterSize: number } {
    let totalElements = 0;
    let clusterCount = 0;
    let maxClusterSize = 0;
    let currentClusterSize = 0;
    let lastIndex = -2;
    
    for (const index in this.table) {
      if (this.table[index] != null) {
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
    
    if (currentClusterSize > 0) {
      clusterCount++;
      maxClusterSize = Math.max(maxClusterSize, currentClusterSize);
    }
    
    return { totalElements, clusterCount, maxClusterSize };
  }
}

// Example usage and demonstration
console.log('=== HashTable with Linear Probing (TypeScript) Demo ===\n');

// Create hash table with typed values
const emailTable = new HashTableLinearProbing<string>();

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

console.log('2. Adding contacts...');
for (const [name, email] of contacts) {
  emailTable.put(name, email);
}
console.log(emailTable.toString().split('\n').map(line => '   ' + line).join('\n'));
console.log();

console.log('3. Retrieving values');
const jonathanEmail: string | undefined = emailTable.get('Jonathan');
console.log(`   Jonathan's email: ${jonathanEmail}`);
console.log(`   Sue's email: ${emailTable.get('Sue')}`);
console.log();

console.log('4. Removing and rehashing');
console.log('   Removing Jonathan...');
emailTable.remove('Jonathan');
console.log(emailTable.toString().split('\n').map(line => '   ' + line).join('\n'));
console.log();

console.log('5. Verifying other values still accessible');
console.log(`   Jamie's email: ${emailTable.get('Jamie')}`);
console.log(`   Sue's email: ${emailTable.get('Sue')}`);

// Export the class
export default HashTableLinearProbing;
