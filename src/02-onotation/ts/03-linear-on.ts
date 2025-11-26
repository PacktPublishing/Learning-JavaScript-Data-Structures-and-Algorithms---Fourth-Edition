/**
 * O(n) - Linear Time Complexity Examples (TypeScript)
 * 
 * The runtime grows in direct proportion to the input size.
 * If input doubles, the runtime roughly doubles.
 * Very common and generally considered efficient.
 */

console.log('=== O(n) - Linear Time Complexity Demo (TypeScript) ===\n');

/**
 * Example 1: Finding maximum value with type safety
 * Must check every element once
 */
function findMax(arr: number[]): number | null {
  if (arr.length === 0) return null;

  let max: number = arr[0];
  let comparisons: number = 0;

  console.log('  Starting with first element:', max);

  for (let i = 1; i < arr.length; i++) {
    comparisons++;
    if (arr[i] > max) {
      console.log(`  Found new max: ${arr[i]} (was ${max})`);
      max = arr[i];
    }
  }

  console.log(`  ✓ Found maximum ${max} after ${comparisons} comparisons`);
  console.log(`  Array size: ${arr.length}, Comparisons: ${comparisons}`);
  console.log(`  Ratio: ${(comparisons / arr.length).toFixed(2)} (approaches 1 for large n)\n`);

  return max;
}

console.log('Example 1: Finding Maximum Value');
const numbers: number[] = [3, 7, 2, 9, 1, 5, 8, 4];
findMax(numbers);

/**
 * Example 2: Generic sum calculation
 * Works with any numeric type
 */
function calculateSum(arr: number[]): number {
  let sum: number = 0;
  let iterations: number = 0;

  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    iterations++;
  }

  console.log(`  Sum: ${sum}`);
  console.log(`  Iterations: ${iterations} for array of ${arr.length} elements`);
  console.log(`  ✓ Had to visit every element (O(n))\n`);

  return sum;
}

console.log('Example 2: Calculating Sum');
calculateSum([10, 20, 30, 40, 50]);

/**
 * Example 3: Linear search with generic types
 * Finding an element in an unsorted array
 */
function linearSearch<T>(arr: T[], target: T): number {
  console.log(`  Searching for ${target} in array of ${arr.length} elements`);

  for (let i = 0; i < arr.length; i++) {
    console.log(`  Checking index ${i}: ${arr[i]}`);
    if (arr[i] === target) {
      console.log(`  ✓ Found ${target} at index ${i}\n`);
      return i;
    }
  }

  console.log(`  ✗ ${target} not found after checking all ${arr.length} elements\n`);
  return -1;
}

console.log('Example 3: Linear Search (Unsorted Array)');
linearSearch<number>([4, 2, 7, 1, 9, 5], 9);

/**
 * Example 4: Filtering with predicate function
 * Type-safe filtering operation
 */
function filterArray<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  const filtered: T[] = [];
  let checks: number = 0;

  console.log('  Checking each element:');

  for (let i = 0; i < arr.length; i++) {
    checks++;
    if (predicate(arr[i])) {
      filtered.push(arr[i]);
      console.log(`  ${arr[i]} matches ✓`);
    } else {
      console.log(`  ${arr[i]} doesn't match ✗`);
    }
  }

  console.log(`  ✓ Checked ${checks} elements (O(n))`);
  console.log(`  Found ${filtered.length} matching items: [${filtered.join(', ')}]\n`);

  return filtered;
}

console.log('Example 4: Filtering Odd Numbers');
filterArray<number>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], (n) => n % 2 !== 0);

/**
 * Example 5: String reversal with proper typing
 * Must process every character
 */
function reverseString(str: string): string {
  let reversed: string = '';

  console.log(`  Original: "${str}" (length: ${str.length})`);
  console.log('  Processing:');

  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
    if (i % 5 === 0 || i === str.length - 1) {
      console.log(`    At index ${i}: "${reversed}"`);
    }
  }

  console.log(`  Reversed: "${reversed}"`);
  console.log(`  ✓ Processed ${str.length} characters (O(n))\n`);

  return reversed;
}

console.log('Example 5: String Reversal');
reverseString('Algorithm');

/**
 * Example 6: Mapping transformation
 * TypeScript ensures type safety in transformations
 */
interface Person {
  name: string;
  age: number;
}

interface PersonSummary {
  name: string;
  isAdult: boolean;
}

function mapPersons(persons: Person[]): PersonSummary[] {
  const summaries: PersonSummary[] = [];

  console.log('  Transforming persons:');

  for (let i = 0; i < persons.length; i++) {
    const summary: PersonSummary = {
      name: persons[i].name,
      isAdult: persons[i].age >= 18
    };
    summaries.push(summary);
    console.log(`  ${persons[i].name} (${persons[i].age}) → Adult: ${summary.isAdult}`);
  }

  console.log(`  ✓ Transformed ${persons.length} records (O(n))\n`);

  return summaries;
}

console.log('Example 6: Mapping Transformations');
mapPersons([
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 17 },
  { name: 'Charlie', age: 30 }
]);

/**
 * Example 7: Counting occurrences with Map
 * Demonstrates O(n) with efficient data structure
 */
function countOccurrences<T>(arr: T[]): Map<T, number> {
  const counts = new Map<T, number>();

  console.log('  Counting occurrences:');

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const currentCount = counts.get(item) || 0;
    counts.set(item, currentCount + 1);
  }

  console.log('  Results:');
  counts.forEach((count, item) => {
    console.log(`    ${item}: ${count} time(s)`);
  });

  console.log(`  ✓ Processed ${arr.length} elements (O(n))\n`);

  return counts;
}

console.log('Example 7: Counting Occurrences');
countOccurrences<string>(['apple', 'banana', 'apple', 'orange', 'banana', 'apple']);

/**
 * Example 8: Multiple O(n) operations with type safety
 */
interface ArrayStatistics {
  sum: number;
  max: number;
  min: number;
  evenCount: number;
  oddCount: number;
}

function analyzeArray(arr: number[]): ArrayStatistics {
  if (arr.length === 0) {
    throw new Error('Array cannot be empty');
  }

  // First pass: calculate sum (O(n))
  let sum: number = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  // Second pass: find max and min (O(n))
  let max: number = arr[0];
  let min: number = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
    if (arr[i] < min) min = arr[i];
  }

  // Third pass: count even and odd (O(n))
  let evenCount: number = 0;
  let oddCount: number = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      evenCount++;
    } else {
      oddCount++;
    }
  }

  const stats: ArrayStatistics = { sum, max, min, evenCount, oddCount };

  console.log('  Three separate O(n) operations:');
  console.log(`  1. Calculate sum: ${sum}`);
  console.log(`  2. Find max/min: ${max} / ${min}`);
  console.log(`  3. Count even/odd: ${evenCount} / ${oddCount}`);
  console.log('  ✓ Total: O(n) + O(n) + O(n) = O(3n) = O(n)');
  console.log('  (Constants are dropped in Big O notation)\n');

  return stats;
}

console.log('Example 8: Multiple Sequential O(n) Operations');
analyzeArray([2, 4, 6, 8, 10, 12]);

/**
 * Example 9: Performance metrics
 */
interface PerformanceMetric {
  inputSize: number;
  operations: number;
  timeRatio: string;
}

function demonstrateGrowth(): PerformanceMetric[] {
  const metrics: PerformanceMetric[] = [
    { inputSize: 10, operations: 10, timeRatio: '1x' },
    { inputSize: 100, operations: 100, timeRatio: '10x' },
    { inputSize: 1000, operations: 1000, timeRatio: '100x' },
    { inputSize: 10000, operations: 10000, timeRatio: '1,000x' },
    { inputSize: 100000, operations: 100000, timeRatio: '10,000x' }
  ];

  console.log('  Performance Comparison:');
  console.log('  Input Size  | Operations | Time Ratio');
  console.log('  ------------|------------|------------');

  metrics.forEach(m => {
    console.log(`  ${m.inputSize.toLocaleString().padStart(10)}  | ${m.operations.toLocaleString().padStart(10)} | ${m.timeRatio.padStart(10)}`);
  });

  console.log('\n  ✓ Linear growth: doubling input doubles operations\n');

  return metrics;
}

console.log('Example 9: Growth Demonstration');
demonstrateGrowth();

console.log('=== Key Takeaway ===');
console.log('O(n) is the most common complexity for array operations.');
console.log('Generally considered efficient and acceptable.');
console.log('Look for single loops that process each element once.');
console.log('Multiple sequential O(n) loops still result in O(n) overall.');
console.log('TypeScript generics make these operations reusable and type-safe!\n');
