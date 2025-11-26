/**
 * O(1) - Constant Time Complexity Examples
 * 
 * These operations take the same amount of time regardless of input size.
 * They execute in a fixed number of steps.
 */

console.log('=== O(1) - Constant Time Complexity Demo ===\n');

/**
 * Example 1: Array access by index
 * Accessing an element at a specific position is O(1)
 */
function getFirstElement(arr) {
  return arr[0];
}

const smallArray = [1, 2, 3];
const largeArray = [...Array(1000000).keys()];

console.log('Example 1: Array Access by Index');
console.log('  Array with 3 elements, first element:', getFirstElement(smallArray));
console.log('  Array with 1,000,000 elements, first element:', getFirstElement(largeArray));
console.log('  ✓ Both operations take the same time (O(1))\n');

/**
 * Example 2: Getting array length
 * JavaScript arrays store their length, so accessing it is O(1)
 */
function getArrayLength(arr) {
  return arr.length;
}

console.log('Example 2: Getting Array Length');
console.log('  Small array length:', getArrayLength(smallArray));
console.log('  Large array length:', getArrayLength(largeArray));
console.log('  ✓ Length lookup is instant regardless of size (O(1))\n');

/**
 * Example 3: Basic arithmetic operations
 * Math operations are constant time
 */
function calculateSum(a, b) {
  return a + b;
}

function calculateProduct(a, b) {
  return a * b;
}

console.log('Example 3: Arithmetic Operations');
console.log('  Sum of 5 + 10:', calculateSum(5, 10));
console.log('  Product of 123456 * 789012:', calculateProduct(123456, 789012));
console.log('  ✓ All arithmetic operations are O(1)\n');

/**
 * Example 4: Object property access
 * Accessing properties by key is O(1) with hash tables
 */
function getUserName(user) {
  return user.name;
}

const user = { name: 'Alice', age: 30, email: 'alice@example.com' };

console.log('Example 4: Object Property Access');
console.log('  User name:', getUserName(user));
console.log('  ✓ Property access is O(1)\n');

/**
 * Example 5: Stack operations (push and pop)
 * Adding/removing from the end of an array is O(1)
 */
function stackOperations() {
  const stack = [];
  stack.push(1);  // O(1)
  stack.push(2);  // O(1)
  stack.push(3);  // O(1)
  const top = stack.pop();  // O(1)
  return { stack, top };
}

console.log('Example 5: Stack Operations (push/pop)');
const result = stackOperations();
console.log('  Stack after operations:', result.stack);
console.log('  Popped element:', result.top);
console.log('  ✓ Push and pop are both O(1)\n');

/**
 * Example 6: Multiple O(1) operations
 * Even multiple constant operations remain O(1) overall
 */
function multipleConstantOps(arr) {
  const first = arr[0];           // O(1)
  const last = arr[arr.length - 1]; // O(1)
  const length = arr.length;      // O(1)
  const sum = first + last;       // O(1)
  return { first, last, length, sum };
}

console.log('Example 6: Multiple O(1) Operations');
const nums = [10, 20, 30, 40, 50];
const stats = multipleConstantOps(nums);
console.log('  Array:', nums);
console.log('  Statistics:', stats);
console.log('  ✓ Multiple O(1) ops = O(1) total\n');

console.log('=== Key Takeaway ===');
console.log('O(1) algorithms are the most efficient.');
console.log('They scale perfectly - performance stays constant as data grows.');
console.log('Look for O(1) operations: array/object access, push/pop, basic math.\n');
