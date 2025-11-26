/**
 * Chapter 2 Exercises - Big O Notation Analysis (TypeScript)
 * 
 * Analyze the following functions and determine their time and space complexities.
 * Assume the input array has n elements.
 * 
 * TypeScript version includes type safety and detailed analysis.
 */

console.log('=== Chapter 2: Big O Notation Exercises (TypeScript) ===\n');
console.log('Running each exercise with analysis...\n');

// ============================================================================
// Exercise 1: Determines if an array's size is even
// ============================================================================

console.log('--- Exercise 1: Check if Array Size is Even ---\n');

const isEven = <T>(array: T[]): boolean => array.length % 2 === 0;

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
console.log('  • Generic type <T> allows use with any array type');
console.log('');
console.log('  ✓ Time Complexity: O(1) - Constant time');
console.log('  ✓ Space Complexity: O(1) - Only stores boolean result');
console.log('');

// ============================================================================
// Exercise 2: Calculates the sum of an array of numbers
// ============================================================================

console.log('--- Exercise 2: Calculate Sum of Array ---\n');

function calculateSum(array: number[]): number {
  let sum: number = 0;
  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}

// Test the function
const testArray1: number[] = [1, 2, 3, 4, 5];
console.log(`Testing: calculateSum([${testArray1}]):`, calculateSum(testArray1));

console.log('\nAnalysis:');
console.log('  • Operations performed:');
console.log('    1. Initialize sum variable (O(1))');
console.log('    2. Loop runs n times (n = array.length)');
console.log('    3. Each iteration: access array[i] + addition (O(1))');
console.log('  • Single loop iterating through all elements');
console.log('  • Must visit every element once');
console.log('  • Type safety ensures only numbers are summed');
console.log('');
console.log('  ✓ Time Complexity: O(n) - Linear time');
console.log('    - Loop runs exactly n times');
console.log('    - Work per iteration is constant');
console.log('  ✓ Space Complexity: O(1) - Constant space');
console.log('    - Only stores: sum (number), i (loop counter)');
console.log('    - No additional data structures created');
console.log('');

// ============================================================================
// Exercise 3: Checks if two arrays have any common values
// ============================================================================

console.log('--- Exercise 3: Find Common Elements Between Arrays ---\n');

function hasCommonElements<T>(array1: T[], array2: T[]): boolean {
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
const arr1: number[] = [1, 2, 3];
const arr2: number[] = [4, 5, 6];
const arr3: number[] = [3, 4, 5];

console.log(`Testing: hasCommonElements([${arr1}], [${arr2}]):`, hasCommonElements(arr1, arr2));
console.log(`Testing: hasCommonElements([${arr1}], [${arr3}]):`, hasCommonElements(arr1, arr3));

console.log('\nAnalysis:');
console.log('  • Operations performed:');
console.log('    1. Outer loop runs n times (array1.length)');
console.log('    2. Inner loop runs m times (array2.length) for each outer iteration');
console.log('    3. Comparison in nested loop');
console.log('  • Nested loops create multiplicative complexity');
console.log('  • Worst case: check all combinations');
console.log('  • Generic type <T> ensures both arrays have same type');
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

// Better O(n + m) solution
function hasCommonElementsOptimized<T>(array1: T[], array2: T[]): boolean {
  const set = new Set(array1);
  return array2.some(item => set.has(item));
}

console.log('  💡 Optimized TypeScript Solution:');
console.log('  function hasCommonElementsOptimized<T>(array1: T[], array2: T[]): boolean {');
console.log('    const set = new Set(array1);  // O(n)');
console.log('    return array2.some(item => set.has(item));  // O(m)');
console.log('  }');
console.log('  ✓ Time: O(n + m), Space: O(n)');
console.log(`  Testing optimized: hasCommonElementsOptimized([${arr1}], [${arr3}]):`, hasCommonElementsOptimized(arr1, arr3));
console.log('');

// ============================================================================
// Exercise 4: Creates a new array of only the odd numbers
// ============================================================================

console.log('--- Exercise 4: Filter Odd Numbers ---\n');

function getOddNumbers(array: number[]): number[] {
  const oddNumbers: number[] = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 !== 0) {
      oddNumbers.push(array[i]);
    }
  }
  return oddNumbers;
}

// Generic version with predicate
function filterArray<T>(array: T[], predicate: (item: T) => boolean): T[] {
  const filtered: T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      filtered.push(array[i]);
    }
  }
  return filtered;
}

// Test the function
const testArray2: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(`Testing: getOddNumbers([${testArray2}]):`);
console.log('Result:', getOddNumbers(testArray2));

console.log('\nGeneric version:');
const genericResult = filterArray(testArray2, n => n % 2 !== 0);
console.log('Result:', genericResult);

console.log('\nAnalysis:');
console.log('  • Operations performed:');
console.log('    1. Initialize empty array (O(1))');
console.log('    2. Loop runs n times (array.length)');
console.log('    3. Each iteration:');
console.log('       - Access array[i] (O(1))');
console.log('       - Modulo operation (O(1))');
console.log('       - Conditional push (O(1) amortized)');
console.log('  • Single loop, visits each element once');
console.log('  • TypeScript ensures type safety of filtered array');
console.log('');
console.log('  ✓ Time Complexity: O(n) - Linear time');
console.log('    - Loop iterates n times');
console.log('    - Array push is O(1) amortized');
console.log('    - Total: O(n)');
console.log('  ✓ Space Complexity: O(n) - Linear space');
console.log('    - Creates new array oddNumbers: number[]');
console.log('    - Worst case: all elements are odd → n elements stored');
console.log('    - Best case: no odd elements → empty array');
console.log('    - Average case: ~n/2 elements → still O(n)');
console.log('');

// ============================================================================
// Summary and Comparison
// ============================================================================

console.log('=== Summary of Exercise Complexities ===\n');

interface ComplexityInfo {
  exercise: string;
  timeComplexity: string;
  spaceComplexity: string;
}

const complexities: ComplexityInfo[] = [
  { exercise: '1: isEven', timeComplexity: 'O(1) - Constant', spaceComplexity: 'O(1) - Constant' },
  { exercise: '2: Sum', timeComplexity: 'O(n) - Linear', spaceComplexity: 'O(1) - Constant' },
  { exercise: '3: Common', timeComplexity: 'O(n²) - Quadratic*', spaceComplexity: 'O(1) - Constant' },
  { exercise: '4: Filter', timeComplexity: 'O(n) - Linear', spaceComplexity: 'O(n) - Linear' }
];

console.log('┌────────────┬──────────────────────┬───────────────────────┐');
console.log('│ Exercise   │ Time Complexity      │ Space Complexity      │');
console.log('├────────────┼──────────────────────┼───────────────────────┤');
complexities.forEach(({ exercise, timeComplexity, spaceComplexity }) => {
  console.log(`│ ${exercise.padEnd(10)} │ ${timeComplexity.padEnd(20)} │ ${spaceComplexity.padEnd(21)} │`);
});
console.log('└────────────┴──────────────────────┴───────────────────────┘');
console.log('*O(n × m) more precisely, O(n²) when both arrays same size\n');

console.log('Key Insights:');
console.log('  1. No loops = O(1) time (Exercise 1)');
console.log('  2. Single loop = O(n) time (Exercises 2, 4)');
console.log('  3. Nested loops = O(n²) time (Exercise 3)');
console.log('  4. Creating new data structures = O(n) space (Exercise 4)');
console.log('  5. Only using variables = O(1) space (Exercises 1, 2, 3)');
console.log('  6. TypeScript generics enable reusable, type-safe algorithms\n');

interface PerformanceData {
  n: number;
  ex1: number;
  ex2: number;
  ex3: number;
  ex4: number;
}

const performanceData: PerformanceData[] = [
  { n: 10, ex1: 1, ex2: 10, ex3: 100, ex4: 10 },
  { n: 1000, ex1: 1, ex2: 1000, ex3: 1000000, ex4: 1000 },
  { n: 100000, ex1: 1, ex2: 100000, ex3: 10000000000, ex4: 100000 }
];

console.log('Performance at Different Input Sizes:');
performanceData.forEach(({ n, ex1, ex2, ex3, ex4 }) => {
  console.log(`  n = ${n.toLocaleString()}:`);
  console.log(`    - Exercise 1: ${ex1.toLocaleString()} operation(s)`);
  console.log(`    - Exercise 2: ${ex2.toLocaleString()} operations`);
  console.log(`    - Exercise 3: ${ex3.toLocaleString()} operations ${ex3 >= 1000000 ? '(worst case)' : ''}`);
  console.log(`    - Exercise 4: ${ex4.toLocaleString()} operations\n`);
});

console.log('TypeScript Benefits:');
console.log('  • Type safety prevents runtime errors');
console.log('  • Generics enable reusable algorithms');
console.log('  • Interfaces document data structures');
console.log('  • Better IDE support and autocomplete');
console.log('  • Self-documenting code');
console.log('');

console.log('✓ Exercises complete! Review the analysis above to understand Big O notation.\n');
