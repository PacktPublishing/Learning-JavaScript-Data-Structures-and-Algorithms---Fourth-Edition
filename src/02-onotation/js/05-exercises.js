/**
 * Chapter 2 Exercises - Big O Notation Analysis
 * 
 * Analyze the following functions and determine their time and space complexities.
 * Assume the input array has n elements.
 */

console.log('=== Chapter 2: Big O Notation Exercises ===\n');
console.log('Running each exercise with analysis...\n');

// ============================================================================
// Exercise 1: Determines if an array's size is even
// ============================================================================

console.log('--- Exercise 1: Check if Array Size is Even ---\n');

const isEven = (array) => array.length % 2 === 0;

// Test the function
console.log('Testing: isEven([1, 2, 3]):', isEven([1, 2, 3]));
console.log('Testing: isEven([1, 2, 3, 4]):', isEven([1, 2, 3, 4]));

console.log('\nAnalysis:');
console.log('  • Operations performed:');
console.log('    1. Access array.length property (O(1))');
console.log('    2. Modulo operation (O(1))');
console.log('    3. Comparison (O(1))');
console.log('  • No loops or iterations');
console.log('  • Operations independent of input size');
console.log('');
console.log('  ✓ Time Complexity: O(1) - Constant time');
console.log('  ✓ Space Complexity: O(1) - Only stores boolean result');
console.log('');

// ============================================================================
// Exercise 2: Calculates the sum of an array of numbers
// ============================================================================

console.log('--- Exercise 2: Calculate Sum of Array ---\n');

function calculateSum(array) {
  let sum = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}

// Test the function
const testArray1 = [1, 2, 3, 4, 5];
console.log(`Testing: calculateSum([${testArray1}]):`, calculateSum(testArray1));

console.log('\nAnalysis:');
console.log('  • Operations performed:');
console.log('    1. Initialize sum variable (O(1))');
console.log('    2. Loop runs n times (n = array.length)');
console.log('    3. Each iteration: access array[i] + addition (O(1))');
console.log('  • Single loop iterating through all elements');
console.log('  • Must visit every element once');
console.log('');
console.log('  ✓ Time Complexity: O(n) - Linear time');
console.log('    - Loop runs exactly n times');
console.log('    - Work per iteration is constant');
console.log('  ✓ Space Complexity: O(1) - Constant space');
console.log('    - Only stores: sum, i (loop counter)');
console.log('    - No additional data structures created');
console.log('');

// ============================================================================
// Exercise 3: Checks if two arrays have any common values
// ============================================================================

console.log('--- Exercise 3: Find Common Elements Between Arrays ---\n');

function hasCommonElements(array1, array2) {
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j]) {
        return true;
      }
    }
  }
  return false;
}

// Test the function
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [3, 4, 5];

console.log(`Testing: hasCommonElements([${arr1}], [${arr2}]):`, hasCommonElements(arr1, arr2));
console.log(`Testing: hasCommonElements([${arr1}], [${arr3}]):`, hasCommonElements(arr1, arr3));

console.log('\nAnalysis:');
console.log('  • Operations performed:');
console.log('    1. Outer loop runs n times (array1.length)');
console.log('    2. Inner loop runs m times (array2.length) for each outer iteration');
console.log('    3. Comparison in nested loop');
console.log('  • Nested loops create multiplicative complexity');
console.log('  • Worst case: check all combinations');
console.log('');
console.log('  ✓ Time Complexity: O(n × m) - where n = array1.length, m = array2.length');
console.log('    - If arrays are same size: O(n²) - Quadratic');
console.log('    - Outer loop: n iterations');
console.log('    - Inner loop: m iterations per outer iteration');
console.log('    - Total: n × m comparisons');
console.log('  ✓ Space Complexity: O(1) - Constant space');
console.log('    - Only stores: i, j (loop counters)');
console.log('    - No additional arrays or data structures');
console.log('');
console.log('  💡 Optimization tip: Use a Set for O(n + m) solution!');
console.log('     const set = new Set(array1);');
console.log('     return array2.some(item => set.has(item));');
console.log('');

// ============================================================================
// Exercise 4: Creates a new array of only the odd numbers
// ============================================================================

console.log('--- Exercise 4: Filter Odd Numbers ---\n');

function getOddNumbers(array) {
  const oddNumbers = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 !== 0) {
      oddNumbers.push(array[i]);
    }
  }
  return oddNumbers;
}

// Test the function
const testArray2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(`Testing: getOddNumbers([${testArray2}]):`);
console.log('Result:', getOddNumbers(testArray2));

console.log('\nAnalysis:');
console.log('  • Operations performed:');
console.log('    1. Initialize empty array (O(1))');
console.log('    2. Loop runs n times (array.length)');
console.log('    3. Each iteration:');
console.log('       - Access array[i] (O(1))');
console.log('       - Modulo operation (O(1))');
console.log('       - Conditional push (O(1) amortized)');
console.log('  • Single loop, visits each element once');
console.log('');
console.log('  ✓ Time Complexity: O(n) - Linear time');
console.log('    - Loop iterates n times');
console.log('    - Array push is O(1) amortized');
console.log('    - Total: O(n)');
console.log('  ✓ Space Complexity: O(n) - Linear space');
console.log('    - Creates new array oddNumbers');
console.log('    - Worst case: all elements are odd → n elements stored');
console.log('    - Best case: no odd elements → empty array');
console.log('    - Average case: ~n/2 elements → still O(n)');
console.log('');

// ============================================================================
// Summary and Comparison
// ============================================================================

console.log('=== Summary of Exercise Complexities ===\n');

console.log('┌────────────┬──────────────────────┬───────────────────────┐');
console.log('│ Exercise   │ Time Complexity      │ Space Complexity      │');
console.log('├────────────┼──────────────────────┼───────────────────────┤');
console.log('│ 1: isEven  │ O(1) - Constant      │ O(1) - Constant       │');
console.log('├────────────┼──────────────────────┼───────────────────────┤');
console.log('│ 2: Sum     │ O(n) - Linear        │ O(1) - Constant       │');
console.log('├────────────┼──────────────────────┼───────────────────────┤');
console.log('│ 3: Common  │ O(n²) - Quadratic*   │ O(1) - Constant       │');
console.log('├────────────┼──────────────────────┼───────────────────────┤');
console.log('│ 4: Filter  │ O(n) - Linear        │ O(n) - Linear         │');
console.log('└────────────┴──────────────────────┴───────────────────────┘');
console.log('*O(n × m) more precisely, O(n²) when both arrays same size\n');

console.log('Key Insights:');
console.log('  1. No loops = O(1) time (Exercise 1)');
console.log('  2. Single loop = O(n) time (Exercises 2, 4)');
console.log('  3. Nested loops = O(n²) time (Exercise 3)');
console.log('  4. Creating new data structures = O(n) space (Exercise 4)');
console.log('  5. Only using variables = O(1) space (Exercises 1, 2, 3)\n');

console.log('Performance at Different Input Sizes:');
console.log('  n = 10:');
console.log('    - Exercise 1: 1 operation');
console.log('    - Exercise 2: 10 operations');
console.log('    - Exercise 3: 100 operations (worst case)');
console.log('    - Exercise 4: 10 operations\n');
console.log('  n = 1,000:');
console.log('    - Exercise 1: 1 operation');
console.log('    - Exercise 2: 1,000 operations');
console.log('    - Exercise 3: 1,000,000 operations (worst case)');
console.log('    - Exercise 4: 1,000 operations\n');
console.log('  n = 100,000:');
console.log('    - Exercise 1: 1 operation');
console.log('    - Exercise 2: 100,000 operations');
console.log('    - Exercise 3: 10,000,000,000 operations (impractical!)');
console.log('    - Exercise 4: 100,000 operations\n');

console.log('✓ Exercises complete! Review the analysis above to understand Big O notation.\n');
