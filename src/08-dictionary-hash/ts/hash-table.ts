/**
 * HashTable Data Structure Implementation in TypeScript
 * 
 * A hash table (hash map) stores key-value pairs using a hash function
 * to determine storage locations. This TypeScript implementation
 * provides type safety through generics.
 * 
 * Note: This basic implementation does NOT handle collisions.
 * See hash-table-separate-chaining.ts and hash-table-linear-probing.ts
 * for collision-resistant implementations.
 * 
 * @template V The type of values stored in the hash table
 */

class HashTable<V> {
  // Private array to store values
  private table: V[] = [];

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
   * The "lose-lose" hash function
   * Simple but collision-prone - good for demonstration
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
   * The "djb2" hash function - a better alternative
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
   * In TypeScript, the key parameter is typed as string,
   * eliminating the need for type checking inside the function
   */
  hash(key: string): number {
    return this.loseLoseHashCode(key);
    // Use this for better distribution:
    // return this.djb2HashCode(key);
  }

  /**
   * Adds or updates a key-value pair in the hash table
   * Time Complexity: O(1) average case
   * 
   * @param key - The string key to set
   * @param value - The value to store
   * @returns True if successful, false if key or value is invalid
   */
  put(key: string, value: V): boolean {
    if (key == null || value == null) {
      return false;
    }
    
    const index = this.hash(key);
    this.table[index] = value;
    return true;
  }

  /**
   * Retrieves the value associated with a key
   * Time Complexity: O(1) average case
   * 
   * @param key - The string key to look up
   * @returns The value, or undefined if not found
   */
  get(key: string): V | undefined {
    if (key == null) {
      return undefined;
    }
    
    const index = this.hash(key);
    return this.table[index];
  }

  /**
   * Removes the value associated with a key
   * Time Complexity: O(1) average case
   * 
   * @param key - The string key to remove
   * @returns True if found and removed, false otherwise
   */
  remove(key: string): boolean {
    if (key == null) {
      return false;
    }
    
    const index = this.hash(key);
    if (this.table[index] != null) {
      delete this.table[index];
      return true;
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
    
    let objString = '';
    for (const key of keys) {
      const value = this.table[parseInt(key)];
      const valueStr = typeof value === 'string' ? `"${value}"` : String(value);
      objString += `{${key} => ${valueStr}}\n`;
    }
    
    return objString.trim();
  }

  /**
   * Returns a copy of the underlying table for inspection
   */
  getTable(): V[] {
    return [...this.table];
  }
}

// Example usage and demonstration
console.log('=== HashTable (TypeScript) Demo ===\n');

// Create a hash table with string values (email addresses)
const emailTable = new HashTable<string>();

console.log('1. Creating a HashTable<string> for email addresses');
console.log('   Computing hash codes:');
console.log(`   hash("Gandalf") = ${emailTable.hash('Gandalf')}`);
console.log(`   hash("John") = ${emailTable.hash('John')}`);
console.log(`   hash("Tyrion") = ${emailTable.hash('Tyrion')}`);
console.log();

console.log('2. Adding contacts');
emailTable.put('Gandalf', 'gandalf@email.com');
emailTable.put('John', 'johnsnow@email.com');
emailTable.put('Tyrion', 'tyrion@email.com');
console.log(emailTable.toString().split('\n').map(line => '   ' + line).join('\n'));
console.log();

console.log('3. Retrieving values with type safety');
const gandalfEmail: string | undefined = emailTable.get('Gandalf');
console.log(`   Gandalf's email: ${gandalfEmail}`);
console.log(`   Unknown user: ${emailTable.get('Unknown')}`);
console.log();

// Create a hash table with number values
const scoreTable = new HashTable<number>();

console.log('4. Creating a HashTable<number> for scores');
scoreTable.put('Alice', 95);
scoreTable.put('Bob', 87);
scoreTable.put('Charlie', 92);

const aliceScore: number | undefined = scoreTable.get('Alice');
if (aliceScore !== undefined) {
  console.log(`   Alice's score: ${aliceScore}`);
  console.log(`   Is passing (>= 60): ${aliceScore >= 60}`);
}
console.log();

// Create a hash table with object values
interface UserProfile {
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

const userTable = new HashTable<UserProfile>();

console.log('5. Creating a HashTable<UserProfile> with typed objects');
userTable.put('admin', { name: 'Admin User', email: 'admin@example.com', role: 'admin' });
userTable.put('alice', { name: 'Alice Smith', email: 'alice@example.com', role: 'user' });

const adminUser = userTable.get('admin');
if (adminUser) {
  // TypeScript knows adminUser has type UserProfile
  console.log(`   Admin name: ${adminUser.name}`);
  console.log(`   Admin role: ${adminUser.role}`);
  console.log(`   Admin email: ${adminUser.email}`);
}
console.log();

console.log('6. Benefits of TypeScript implementation:');
console.log('   - Type-safe keys (string only)');
console.log('   - Type-safe values (generic type V)');
console.log('   - No runtime type checking needed for key conversion');
console.log('   - Compile-time error detection');

// Export the HashTable class
export default HashTable;
