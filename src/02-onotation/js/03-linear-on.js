/**
 * O(n) - Linear Time Complexity Examples
 * 
 * The runtime grows in direct proportion to the input size.
 * If input doubles, the runtime roughly doubles.
 * Very common and generally considered efficient.
 */

console.log('=== O(n) - Linear Time Complexity Demo ===\n');

/**
 * Example 1: Finding maximum value
 * Must check every element once
 */
function findMax(arr) {
  if (arr.length === 0) return null;

  let max = arr[0];
  let comparisons = 0;

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
const numbers = [3, 7, 2, 9, 1, 5, 8, 4];
findMax(numbers);

/**
 * Example 2: Calculating sum
 * Must visit every element
 */
function calculateSum(arr) {
  let sum = 0;
  let iterations = 0;

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
 * Example 3: Linear search
 * Finding an element in an unsorted array
 */
function linearSearch(arr, target) {
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
linearSearch([4, 2, 7, 1, 9, 5], 9);

/**
 * Example 4: Filtering an array
 * Creating a new array with elements that match a condition
 */
function getOddNumbers(arr) {
  const oddNumbers = [];
  let checks = 0;

  console.log('  Checking each element:');

  for (let i = 0; i < arr.length; i++) {
    checks++;
    if (arr[i] % 2 !== 0) {
      oddNumbers.push(arr[i]);
      console.log(`  ${arr[i]} is odd ✓`);
    } else {
      console.log(`  ${arr[i]} is even ✗`);
    }
  }

  console.log(`  ✓ Checked ${checks} elements (O(n))`);
  console.log(`  Found ${oddNumbers.length} odd numbers: [${oddNumbers.join(', ')}]\n`);

  return oddNumbers;
}

console.log('Example 4: Filtering Odd Numbers');
getOddNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

/**
 * Example 5: String reversal
 * Must process every character
 */
function reverseString(str) {
  let reversed = '';

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
 * Example 6: Copying an array
 * Must copy every element
 */
function copyArray(arr) {
  const copy = [];

  for (let i = 0; i < arr.length; i++) {
    copy.push(arr[i]);
  }

  console.log(`  Original: [${arr.join(', ')}]`);
  console.log(`  Copy: [${copy.join(', ')}]`);
  console.log(`  ✓ Copied ${arr.length} elements (O(n))\n`);

  return copy;
}

console.log('Example 6: Copying an Array');
copyArray([1, 2, 3, 4, 5]);

/**
 * Example 7: Counting occurrences
 * Must check every element
 */
function countOccurrences(arr, target) {
  let count = 0;

  console.log(`  Counting occurrences of ${target}:`);

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      count++;
      console.log(`  Found at index ${i} (total: ${count})`);
    }
  }

  console.log(`  ✓ Found ${count} occurrences after checking ${arr.length} elements (O(n))\n`);

  return count;
}

console.log('Example 7: Counting Occurrences');
countOccurrences([1, 3, 7, 3, 9, 3, 5, 3, 2], 3);

/**
 * Example 8: Multiple O(n) operations
 * When operations are sequential (not nested), we add: O(n) + O(n) = O(n)
 */
function multipleLinearOps(arr) {
  // First pass: calculate sum (O(n))
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  // Second pass: find max (O(n))
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  // Third pass: count even numbers (O(n))
  let evenCount = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      evenCount++;
    }
  }

  console.log(`  Three separate O(n) operations:`);
  console.log(`  1. Calculate sum: ${sum}`);
  console.log(`  2. Find maximum: ${max}`);
  console.log(`  3. Count evens: ${evenCount}`);
  console.log(`  ✓ Total: O(n) + O(n) + O(n) = O(3n) = O(n)`);
  console.log(`  (Constants are dropped in Big O notation)\n`);
}

console.log('Example 8: Multiple Sequential O(n) Operations');
multipleLinearOps([2, 4, 6, 8, 10, 12]);

console.log('=== Performance Comparison ===');
console.log('Input Size  | Operations | Time Ratio');
console.log('------------|------------|------------');
console.log('10          | 10         | 1x');
console.log('100         | 100        | 10x');
console.log('1,000       | 1,000      | 100x');
console.log('10,000      | 10,000     | 1,000x');
console.log('100,000     | 100,000    | 10,000x');
console.log('\n✓ Linear growth: doubling input doubles operations\n');

console.log('=== Key Takeaway ===');
console.log('O(n) is the most common complexity for array operations.');
console.log('Generally considered efficient and acceptable.');
console.log('Look for single loops that process each element once.');
console.log('Multiple sequential O(n) loops still result in O(n) overall.\n');
