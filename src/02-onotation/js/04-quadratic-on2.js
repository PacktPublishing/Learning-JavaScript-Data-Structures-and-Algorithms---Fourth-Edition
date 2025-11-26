/**
 * O(n²) - Quadratic Time Complexity Examples
 * 
 * The runtime grows with the square of the input size.
 * If input doubles, runtime quadruples (2² = 4).
 * Often involves nested loops - be cautious with large datasets!
 */

console.log('=== O(n²) - Quadratic Time Complexity Demo ===\n');

/**
 * Example 1: Finding duplicate elements
 * Compares every element with every other element
 */
function hasDuplicates(arr) {
  let comparisons = 0;

  console.log(`  Checking array of ${arr.length} elements for duplicates`);

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      comparisons++;
      if (arr[i] === arr[j]) {
        console.log(`  ✓ Found duplicate: ${arr[i]} at indices ${i} and ${j}`);
        console.log(`  Total comparisons: ${comparisons}\n`);
        return true;
      }
    }
  }

  console.log(`  ✗ No duplicates found`);
  console.log(`  Total comparisons: ${comparisons}`);
  console.log(`  For n=${arr.length}, did ${comparisons} comparisons ≈ n²/2\n`);

  return false;
}

console.log('Example 1: Finding Duplicates (Brute Force)');
hasDuplicates([1, 3, 5, 7, 9, 3, 11]);

/**
 * Example 2: Bubble Sort
 * Classic O(n²) sorting algorithm with nested loops
 */
function bubbleSort(arr) {
  const copy = [...arr];
  let swaps = 0;
  let comparisons = 0;

  console.log('  Starting array:', copy);
  console.log('  Sorting...\n');

  for (let i = 0; i < copy.length - 1; i++) {
    let swappedThisPass = false;

    for (let j = 0; j < copy.length - 1 - i; j++) {
      comparisons++;
      if (copy[j] > copy[j + 1]) {
        // Swap elements
        [copy[j], copy[j + 1]] = [copy[j + 1], copy[j]];
        swaps++;
        swappedThisPass = true;
      }
    }

    if (i < 3 || i === copy.length - 2) {
      console.log(`  Pass ${i + 1}:`, copy);
    } else if (i === 3) {
      console.log('  ...');
    }

    if (!swappedThisPass) break;
  }

  console.log('\n  Sorted array:', copy);
  console.log(`  Array size: ${arr.length}`);
  console.log(`  Comparisons: ${comparisons} (O(n²))`);
  console.log(`  Swaps: ${swaps}\n`);

  return copy;
}

console.log('Example 2: Bubble Sort');
bubbleSort([64, 34, 25, 12, 22, 11, 90]);

/**
 * Example 3: Creating all pairs
 * Generates every possible pair from an array
 */
function createAllPairs(arr) {
  const pairs = [];
  let operations = 0;

  console.log(`  Creating all pairs from array of ${arr.length} elements`);

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      operations++;
      pairs.push([arr[i], arr[j]]);
    }
  }

  console.log(`  Generated ${pairs.length} pairs`);
  console.log(`  First few: [${pairs.slice(0, 5).map(p => `[${p}]`).join(', ')}...]`);
  console.log(`  Operations: ${operations} = ${arr.length} × ${arr.length} = n²\n`);

  return pairs;
}

console.log('Example 3: Creating All Pairs');
createAllPairs(['A', 'B', 'C', 'D']);

/**
 * Example 4: Matrix multiplication (simplified)
 * Demonstrates quadratic growth with 2D arrays
 */
function printMatrix(matrix) {
  const n = matrix.length;
  let operations = 0;

  console.log(`  Printing ${n}×${n} matrix:`);

  for (let i = 0; i < n; i++) {
    let row = '  ';
    for (let j = 0; j < n; j++) {
      operations++;
      row += matrix[i][j].toString().padStart(3) + ' ';
    }
    console.log(row);
  }

  console.log(`  Operations: ${operations} = n² (${n}²)\n`);
}

console.log('Example 4: Processing a Matrix');
const matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
];
printMatrix(matrix);

/**
 * Example 5: Finding common elements between two arrays (naive approach)
 */
function findCommonElements(arr1, arr2) {
  const common = [];
  let comparisons = 0;

  console.log(`  Finding common elements:`);
  console.log(`  Array 1 (n=${arr1.length}):`, arr1);
  console.log(`  Array 2 (m=${arr2.length}):`, arr2);
  console.log('');

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      comparisons++;
      if (arr1[i] === arr2[j] && !common.includes(arr1[i])) {
        common.push(arr1[i]);
        console.log(`  Found common element: ${arr1[i]}`);
      }
    }
  }

  console.log(`  Common elements: [${common.join(', ')}]`);
  console.log(`  Comparisons: ${comparisons} = ${arr1.length} × ${arr2.length} = n×m`);
  console.log(`  (If both arrays same size: O(n²))\n`);

  return common;
}

console.log('Example 5: Finding Common Elements (Naive)');
findCommonElements([1, 2, 3, 4, 5], [3, 4, 5, 6, 7]);

/**
 * Example 6: Selection Sort
 * Another classic O(n²) sorting algorithm
 */
function selectionSort(arr) {
  const copy = [...arr];
  let operations = 0;

  console.log('  Starting array:', copy);
  console.log('  Sorting...\n');

  for (let i = 0; i < copy.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < copy.length; j++) {
      operations++;
      if (copy[j] < copy[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [copy[i], copy[minIndex]] = [copy[minIndex], copy[i]];
    }

    if (i < 3 || i === copy.length - 2) {
      console.log(`  After step ${i + 1}:`, copy);
    } else if (i === 3) {
      console.log('  ...');
    }
  }

  console.log('\n  Sorted array:', copy);
  console.log(`  Operations: ${operations} (O(n²))\n`);

  return copy;
}

console.log('Example 6: Selection Sort');
selectionSort([29, 10, 14, 37, 13]);

/**
 * Example 7: Performance comparison demonstration
 */
function demonstrateGrowth() {
  console.log('  How O(n²) grows with input size:\n');
  console.log('  Input (n) | Operations (n²) | Growth Factor');
  console.log('  ----------|-----------------|---------------');

  const sizes = [10, 20, 50, 100, 200, 500, 1000];
  let prevOps = sizes[0] * sizes[0];

  sizes.forEach(n => {
    const ops = n * n;
    const factor = (ops / prevOps).toFixed(1);
    console.log(`  ${n.toString().padStart(8)}  | ${ops.toString().padStart(15)} | ${n === 10 ? 'baseline' : factor + 'x'}`);
    prevOps = ops;
  });

  console.log('\n  ✓ Notice: doubling input quadruples operations!\n');
}

console.log('Example 7: Growth Demonstration');
demonstrateGrowth();

/**
 * Example 8: When to worry about O(n²)
 */
console.log('Example 8: Real-World Impact');
console.log('  Processing time estimates (assuming 1 million ops/sec):\n');

const timings = [
  { n: 100, ops: 10000, time: '0.01 seconds' },
  { n: 1000, ops: 1000000, time: '1 second' },
  { n: 10000, ops: 100000000, time: '100 seconds (1.7 min)' },
  { n: 100000, ops: 10000000000, time: '10,000 seconds (2.8 hrs)' },
];

timings.forEach(({ n, ops, time }) => {
  console.log(`  n = ${n.toLocaleString().padStart(7)} → ${ops.toLocaleString().padStart(13)} ops → ${time}`);
});

console.log('\n  ⚠️  O(n²) becomes impractical for large datasets!\n');

console.log('=== Key Takeaway ===');
console.log('O(n²) algorithms have nested loops where both depend on n.');
console.log('Performance degrades quickly as input size grows.');
console.log('Acceptable for small datasets (n < 1000), problematic for large ones.');
console.log('Often worth seeking O(n log n) or O(n) alternatives.');
console.log('Common examples: simple sorting, naive duplicate detection, comparing all pairs.\n');
