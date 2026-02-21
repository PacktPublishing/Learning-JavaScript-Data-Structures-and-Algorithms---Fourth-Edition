/**
 * WeakMap and WeakSet Examples
 * 
 * WeakMap and WeakSet are specialized collection types that hold
 * "weak" references to their keys (WeakMap) or values (WeakSet).
 * 
 * Key characteristics:
 * - Keys (WeakMap) or values (WeakSet) must be objects
 * - References are "weak" - they don't prevent garbage collection
 * - Not iterable (no forEach, keys(), values(), or size)
 * - Useful for memory-sensitive scenarios
 * 
 * Use cases:
 * - Storing private data associated with objects
 * - Caching computed values for objects
 * - Tracking DOM elements without preventing cleanup
 * - Managing object metadata without memory leaks
 */

console.log('=== WeakMap and WeakSet Examples ===\n');

// ============================================================
// Example 1: Storing Private Data with WeakMap
// ============================================================

console.log('1. WeakMap for Private Data Storage');
console.log('   (Storing sensitive data outside the object itself)');
console.log();

// WeakMap to store private data - the Person object is the key
const privateData = new WeakMap();

class Person {
  constructor(name, age, ssn) {
    this.name = name;
    this.age = age;
    
    // Store sensitive data in the WeakMap instead of the object
    // This keeps it "hidden" from regular property enumeration
    privateData.set(this, {
      ssn: ssn,
      medicalRecords: [],
      bankAccount: null
    });
  }

  /**
   * Get the person's SSN (from private storage)
   */
  getSSN() {
    // Use optional chaining in case the person was garbage collected
    return privateData.get(this)?.ssn;
  }

  /**
   * Add a medical record (to private storage)
   */
  addMedicalRecord(record) {
    const data = privateData.get(this);
    if (data) {
      data.medicalRecords.push(record);
    }
  }

  /**
   * Get medical records count
   */
  getMedicalRecordCount() {
    return privateData.get(this)?.medicalRecords?.length || 0;
  }

  toString() {
    return `Person { name: "${this.name}", age: ${this.age} }`;
  }
}

// Create some people
const alice = new Person('Alice', 30, '123-45-6789');
const bob = new Person('Bob', 25, '987-65-4321');

console.log('   Created Alice and Bob:');
console.log(`   ${alice.toString()}`);
console.log(`   ${bob.toString()}`);
console.log();

console.log('   Accessing private data:');
console.log(`   Alice's SSN: ${alice.getSSN()}`);
console.log(`   Bob's SSN: ${bob.getSSN()}`);
console.log();

console.log('   Adding medical records to Alice:');
alice.addMedicalRecord({ date: '2024-01-15', type: 'Checkup' });
alice.addMedicalRecord({ date: '2024-06-20', type: 'Vaccination' });
console.log(`   Alice's medical record count: ${alice.getMedicalRecordCount()}`);
console.log(`   Bob's medical record count: ${bob.getMedicalRecordCount()}`);
console.log();

console.log('   Notice: SSN is not visible when logging the object:');
console.log(`   ${JSON.stringify(alice)}`);
console.log('   (Only name and age are enumerable properties)');
console.log();

// ============================================================
// Example 2: Object Reference Caching
// ============================================================

console.log('2. WeakMap for Computed Value Caching');
console.log('   (Cache results without preventing garbage collection)');
console.log();

// Cache for expensive computations
const computationCache = new WeakMap();

function expensiveComputation(obj) {
  // Check cache first
  if (computationCache.has(obj)) {
    console.log('   [Cache hit]');
    return computationCache.get(obj);
  }
  
  // Simulate expensive work
  console.log('   [Computing...]');
  const result = {
    processedAt: new Date().toISOString(),
    hash: JSON.stringify(obj).split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  };
  
  // Store in cache
  computationCache.set(obj, result);
  return result;
}

const data1 = { id: 1, values: [1, 2, 3] };
const data2 = { id: 2, values: [4, 5, 6] };

console.log('   First call for data1:');
let result1 = expensiveComputation(data1);
console.log(`   Result: ${JSON.stringify(result1)}`);
console.log();

console.log('   Second call for data1 (should use cache):');
result1 = expensiveComputation(data1);
console.log(`   Result: ${JSON.stringify(result1)}`);
console.log();

console.log('   First call for data2:');
const result2 = expensiveComputation(data2);
console.log(`   Result: ${JSON.stringify(result2)}`);
console.log();

// ============================================================
// Example 3: WeakSet for Object Tracking
// ============================================================

console.log('3. WeakSet for Tracking Visited Objects');
console.log('   (Track which objects have been processed)');
console.log();

// Track objects that have been validated
const validatedObjects = new WeakSet();

function validateUser(user) {
  if (validatedObjects.has(user)) {
    console.log(`   User "${user.name}" already validated - skipping`);
    return true;
  }
  
  // Perform validation
  console.log(`   Validating user "${user.name}"...`);
  const isValid = user.name && user.email && user.email.includes('@');
  
  if (isValid) {
    validatedObjects.add(user);
    console.log(`   ✓ User "${user.name}" validated successfully`);
  } else {
    console.log(`   ✗ User "${user.name}" validation failed`);
  }
  
  return isValid;
}

const user1 = { name: 'Charlie', email: 'charlie@example.com' };
const user2 = { name: 'Diana', email: 'diana@example.com' };
const user3 = { name: 'Eve', email: 'invalid-email' };

console.log('   First validation pass:');
validateUser(user1);
validateUser(user2);
validateUser(user3);
console.log();

console.log('   Second validation pass (should skip already validated):');
validateUser(user1);
validateUser(user2);
validateUser(user3);
console.log();

// ============================================================
// Example 4: Comparison with Map and Set
// ============================================================

console.log('4. Key Differences from Map and Set');
console.log();

console.log('   WeakMap limitations:');
console.log('   - Keys must be objects (not primitives)');
console.log('   - Not iterable (no forEach, keys(), values())');
console.log('   - No size property');
console.log('   - No clear() method');
console.log();

console.log('   Available methods:');
console.log('   - weakMap.set(key, value)');
console.log('   - weakMap.get(key)');
console.log('   - weakMap.has(key)');
console.log('   - weakMap.delete(key)');
console.log();

// Demonstrating that primitives don't work as keys
console.log('   Demonstration: Primitives as keys');
try {
  const wm = new WeakMap();
  wm.set('string-key', 'value'); // This will throw
} catch (e) {
  console.log(`   Error: ${e.message}`);
}
console.log();

console.log('5. Garbage Collection Benefit');
console.log('   When an object used as a WeakMap key is set to null');
console.log('   and no other references exist, the key-value pair');
console.log('   becomes eligible for garbage collection.');
console.log();
console.log('   This prevents memory leaks in long-running applications');
console.log('   where you associate data with temporary objects.');
