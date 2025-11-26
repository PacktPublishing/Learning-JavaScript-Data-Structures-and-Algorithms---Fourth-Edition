/**
 * O(n²) - Quadratic Time Complexity Examples (TypeScript)
 * 
 * The runtime grows with the square of the input size.
 * If input doubles, runtime quadruples (2² = 4).
 * Often involves nested loops - be cautious with large datasets!
 */

console.log('=== O(n²) - Quadratic Time Complexity Demo (TypeScript) ===\n');

/**
 * Example 1: Finding duplicate elements with type safety
 * Compares every element with every other element
 */
function hasDuplicates<T>(arr: T[]): boolean {
  let comparisons: number = 0;

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
hasDuplicates<number>([1, 3, 5, 7, 9, 3, 11]);

/**
 * Example 2: Bubble Sort with type safety
 * Classic O(n²) sorting algorithm with nested loops
 */
interface SortResult<T> {
  sorted: T[];
  comparisons: number;
  swaps: number;
}

function bubbleSort<T>(arr: T[], compareFn: (a: T, b: T) => number = (a: any, b: any) => a - b): SortResult<T> {
  const copy: T[] = [...arr];
  let swaps: number = 0;
  let comparisons: number = 0;

  console.log('  Starting array:', copy);
  console.log('  Sorting...\n');

  for (let i = 0; i < copy.length - 1; i++) {
    let swappedThisPass: boolean = false;

    for (let j = 0; j < copy.length - 1 - i; j++) {
      comparisons++;
      if (compareFn(copy[j], copy[j + 1]) > 0) {
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

  return { sorted: copy, comparisons, swaps };
}

console.log('Example 2: Bubble Sort');
bubbleSort<number>([64, 34, 25, 12, 22, 11, 90]);

/**
 * Example 3: Creating all pairs (Cartesian product)
 * Generates every possible pair from an array
 */
function createAllPairs<T>(arr: T[]): Array<[T, T]> {
  const pairs: Array<[T, T]> = [];
  let operations: number = 0;

  console.log(`  Creating all pairs from array of ${arr.length} elements`);

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      operations++;
      pairs.push([arr[i], arr[j]]);
    }
  }

  console.log(`  Generated ${pairs.length} pairs`);
  console.log(`  First few: ${JSON.stringify(pairs.slice(0, 5))}...`);
  console.log(`  Operations: ${operations} = ${arr.length} × ${arr.length} = n²\n`);

  return pairs;
}

console.log('Example 3: Creating All Pairs');
createAllPairs<string>(['A', 'B', 'C', 'D']);

/**
 * Example 4: Matrix operations with proper typing
 * Demonstrates quadratic growth with 2D arrays
 */
type Matrix = number[][];

interface MatrixInfo {
  dimensions: string;
  operations: number;
  sum: number;
}

function analyzeMatrix(matrix: Matrix): MatrixInfo {
  const n: number = matrix.length;
  let operations: number = 0;
  let sum: number = 0;

  console.log(`  Analyzing ${n}×${n} matrix:`);

  for (let i = 0; i < n; i++) {
    let row: string = '  ';
    for (let j = 0; j < n; j++) {
      operations++;
      sum += matrix[i][j];
      row += matrix[i][j].toString().padStart(3) + ' ';
    }
    console.log(row);
  }

  console.log(`  Sum of all elements: ${sum}`);
  console.log(`  Operations: ${operations} = n² (${n}²)\n`);

  return { dimensions: `${n}×${n}`, operations, sum };
}

console.log('Example 4: Processing a Matrix');
const matrix: Matrix = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
];
analyzeMatrix(matrix);

/**
 * Example 5: Finding common elements with type constraints
 */
function findCommonElements<T>(arr1: T[], arr2: T[]): T[] {
  const common: T[] = [];
  let comparisons: number = 0;

  console.log('  Finding common elements:');
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
  console.log('  (If both arrays same size: O(n²))\n');

  return common;
}

console.log('Example 5: Finding Common Elements (Naive)');
findCommonElements<number>([1, 2, 3, 4, 5], [3, 4, 5, 6, 7]);

/**
 * Example 6: Selection Sort with generics
 * Another classic O(n²) sorting algorithm
 */
function selectionSort<T>(arr: T[], compareFn: (a: T, b: T) => number = (a: any, b: any) => a - b): SortResult<T> {
  const copy: T[] = [...arr];
  let operations: number = 0;
  let swaps: number = 0;

  console.log('  Starting array:', copy);
  console.log('  Sorting...\n');

  for (let i = 0; i < copy.length - 1; i++) {
    let minIndex: number = i;

    for (let j = i + 1; j < copy.length; j++) {
      operations++;
      if (compareFn(copy[j], copy[minIndex]) < 0) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [copy[i], copy[minIndex]] = [copy[minIndex], copy[i]];
      swaps++;
    }

    if (i < 3 || i === copy.length - 2) {
      console.log(`  After step ${i + 1}:`, copy);
    } else if (i === 3) {
      console.log('  ...');
    }
  }

  console.log('\n  Sorted array:', copy);
  console.log(`  Operations: ${operations} (O(n²))\n`);

  return { sorted: copy, comparisons: operations, swaps };
}

console.log('Example 6: Selection Sort');
selectionSort<number>([29, 10, 14, 37, 13]);

/**
 * Example 7: Distance matrix calculation
 * Real-world example of O(n²) complexity
 */
interface Point {
  x: number;
  y: number;
  label: string;
}

function calculateDistanceMatrix(points: Point[]): number[][] {
  const n: number = points.length;
  const distances: number[][] = Array(n).fill(0).map(() => Array(n).fill(0));
  let calculations: number = 0;

  console.log(`  Calculating distance matrix for ${n} points:`);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      calculations++;
      const dx: number = points[i].x - points[j].x;
      const dy: number = points[i].y - points[j].y;
      distances[i][j] = Math.sqrt(dx * dx + dy * dy);
    }
  }

  console.log('  Distance matrix:');
  distances.forEach((row, i) => {
    console.log(`  ${points[i].label}: [${row.map(d => d.toFixed(1)).join(', ')}]`);
  });

  console.log(`  Calculations: ${calculations} = n² (${n}²)\n`);

  return distances;
}

console.log('Example 7: Distance Matrix');
const points: Point[] = [
  { x: 0, y: 0, label: 'A' },
  { x: 3, y: 4, label: 'B' },
  { x: 6, y: 8, label: 'C' }
];
calculateDistanceMatrix(points);

/**
 * Example 8: Growth demonstration with metrics
 */
interface GrowthMetric {
  inputSize: number;
  operations: number;
  growthFactor: string;
}

function demonstrateGrowth(): GrowthMetric[] {
  const metrics: GrowthMetric[] = [];
  const sizes: number[] = [10, 20, 50, 100, 200, 500, 1000];
  let prevOps: number = sizes[0] * sizes[0];

  console.log('  How O(n²) grows with input size:\n');
  console.log('  Input (n) | Operations (n²) | Growth Factor');
  console.log('  ----------|-----------------|---------------');

  sizes.forEach(n => {
    const ops: number = n * n;
    const factor: string = n === 10 ? 'baseline' : (ops / prevOps).toFixed(1) + 'x';
    
    metrics.push({ inputSize: n, operations: ops, growthFactor: factor });
    
    console.log(`  ${n.toString().padStart(8)}  | ${ops.toString().padStart(15)} | ${factor.padStart(13)}`);
    prevOps = ops;
  });

  console.log('\n  ✓ Notice: doubling input quadruples operations!\n');

  return metrics;
}

console.log('Example 8: Growth Demonstration');
demonstrateGrowth();

/**
 * Example 9: Real-world impact with timing estimates
 */
interface TimingEstimate {
  n: number;
  operations: number;
  estimatedTime: string;
}

function estimatePerformance(): TimingEstimate[] {
  console.log('  Processing time estimates (assuming 1 million ops/sec):\n');

  const estimates: TimingEstimate[] = [
    { n: 100, operations: 10000, estimatedTime: '0.01 seconds' },
    { n: 1000, operations: 1000000, estimatedTime: '1 second' },
    { n: 10000, operations: 100000000, estimatedTime: '100 seconds (1.7 min)' },
    { n: 100000, operations: 10000000000, estimatedTime: '10,000 seconds (2.8 hrs)' },
  ];

  estimates.forEach(({ n, operations, estimatedTime }) => {
    console.log(`  n = ${n.toLocaleString().padStart(7)} → ${operations.toLocaleString().padStart(13)} ops → ${estimatedTime}`);
  });

  console.log('\n  ⚠️  O(n²) becomes impractical for large datasets!\n');

  return estimates;
}

console.log('Example 9: Real-World Impact');
estimatePerformance();

console.log('=== Key Takeaway ===');
console.log('O(n²) algorithms have nested loops where both depend on n.');
console.log('Performance degrades quickly as input size grows.');
console.log('Acceptable for small datasets (n < 1000), problematic for large ones.');
console.log('Often worth seeking O(n log n) or O(n) alternatives.');
console.log('Common examples: simple sorting, naive duplicate detection, comparing all pairs.');
console.log('TypeScript generics and type constraints help maintain correctness at scale!\n');
