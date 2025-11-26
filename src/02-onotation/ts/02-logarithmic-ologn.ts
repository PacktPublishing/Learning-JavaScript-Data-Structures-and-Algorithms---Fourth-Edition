/**
 * O(log n) - Logarithmic Time Complexity Examples (TypeScript)
 * 
 * These algorithms reduce the problem size by a fraction (usually half) with each step.
 * As input doubles, work increases by only a constant amount.
 * Highly efficient for large datasets.
 */

console.log('=== O(log n) - Logarithmic Time Complexity Demo (TypeScript) ===\n');

/**
 * Example 1: Binary Search
 * The classic O(log n) algorithm - searches a sorted array by repeatedly halving the search space
 */
function binarySearch(arr: number[], target: number): number {
  let left: number = 0;
  let right: number = arr.length - 1;
  let steps: number = 0;

  console.log(`  Searching for ${target} in array of ${arr.length} elements`);

  while (left <= right) {
    steps++;
    const mid: number = Math.floor((left + right) / 2);
    console.log(`  Step ${steps}: Checking index ${mid} (value: ${arr[mid]})`);

    if (arr[mid] === target) {
      console.log(`  ✓ Found ${target} at index ${mid} in ${steps} steps\n`);
      return mid;
    }

    if (arr[mid] < target) {
      left = mid + 1;
      console.log(`    Target is higher, searching right half (${left} to ${right})`);
    } else {
      right = mid - 1;
      console.log(`    Target is lower, searching left half (${left} to ${right})`);
    }
  }

  console.log(`  ✗ ${target} not found after ${steps} steps\n`);
  return -1;
}

console.log('Example 1: Binary Search');
const sortedArray: number[] = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31];
binarySearch(sortedArray, 23);

// Show how it scales
console.log('Scalability demonstration:');
console.log('  For 16 elements: max ~4 steps (log₂ 16 = 4)');
console.log('  For 1,024 elements: max ~10 steps (log₂ 1,024 = 10)');
console.log('  For 1,048,576 elements: max ~20 steps (log₂ 1,048,576 = 20)');
console.log('  ✓ Doubling the data adds only 1 step!\n');

/**
 * Example 2: Generic Binary Search with custom comparator
 * TypeScript generics allow type-safe implementation
 */
interface SearchResult<T> {
  found: boolean;
  index: number;
  steps: number;
  value?: T;
}

function binarySearchGeneric<T>(
  arr: T[],
  target: T,
  compareFn: (a: T, b: T) => number
): SearchResult<T> {
  let left: number = 0;
  let right: number = arr.length - 1;
  let steps: number = 0;

  while (left <= right) {
    steps++;
    const mid: number = Math.floor((left + right) / 2);
    const comparison: number = compareFn(arr[mid], target);

    if (comparison === 0) {
      return { found: true, index: mid, steps, value: arr[mid] };
    }

    if (comparison < 0) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return { found: false, index: -1, steps };
}

console.log('Example 2: Generic Binary Search');
const words: string[] = ['algorithm', 'binary', 'complexity', 'data', 'efficient', 'function'];
const searchResult = binarySearchGeneric(words, 'complexity', (a, b) => a.localeCompare(b));
console.log('  Searching for "complexity" in:', words);
console.log('  Result:', searchResult);
console.log('  ✓ Type-safe generic implementation\n');

/**
 * Example 3: Finding the power of 2
 * How many times can we divide n by 2 until we reach 1?
 */
function findPowerOfTwo(n: number): number {
  let divisions: number = 0;
  let value: number = n;

  console.log(`  Starting with n = ${n}`);

  while (value > 1) {
    divisions++;
    value = Math.floor(value / 2);
    console.log(`  Division ${divisions}: ${value}`);
  }

  console.log(`  ✓ Required ${divisions} divisions (≈ log₂ ${n})\n`);
  return divisions;
}

console.log('Example 3: Counting Divisions by 2');
findPowerOfTwo(32);

/**
 * Example 4: Guess the Number Game with type safety
 */
interface GuessResult {
  guesses: number;
  found: boolean;
  value?: number;
}

function guessTheNumber(min: number, max: number, secret: number): GuessResult {
  let guesses: number = 0;
  let low: number = min;
  let high: number = max;

  console.log(`  Guessing a number between ${min} and ${max}`);
  console.log(`  (Secret number is ${secret})\n`);

  while (low <= high) {
    guesses++;
    const guess: number = Math.floor((low + high) / 2);
    console.log(`  Guess #${guesses}: Is it ${guess}?`);

    if (guess === secret) {
      console.log(`  🎉 Yes! Found ${secret} in ${guesses} guesses\n`);
      return { guesses, found: true, value: secret };
    } else if (guess < secret) {
      console.log(`    Too low! New range: ${guess + 1} to ${high}`);
      low = guess + 1;
    } else {
      console.log(`    Too high! New range: ${low} to ${guess - 1}`);
      high = guess - 1;
    }
  }

  return { guesses, found: false };
}

console.log('Example 4: Guess the Number (1-100)');
guessTheNumber(1, 100, 73);

console.log('Why this is efficient:');
console.log('  Range 1-100: max 7 guesses');
console.log('  Range 1-1,000: max 10 guesses');
console.log('  Range 1-1,000,000: max 20 guesses');
console.log('  ✓ Each guess eliminates half the possibilities\n');

/**
 * Example 5: Binary Search Tree lookup simulation
 * Demonstrates O(log n) for balanced tree structures
 */
interface TreeNode<T> {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}

function searchBST<T>(root: TreeNode<T> | undefined, target: T): boolean {
  let current = root;
  let steps = 0;

  console.log(`  Searching for ${target} in BST`);

  while (current !== undefined) {
    steps++;
    console.log(`  Step ${steps}: Checking node with value ${current.value}`);

    if (current.value === target) {
      console.log(`  ✓ Found ${target} in ${steps} steps\n`);
      return true;
    }

    if (target < current.value) {
      console.log(`    Going left...`);
      current = current.left;
    } else {
      console.log(`    Going right...`);
      current = current.right;
    }
  }

  console.log(`  ✗ ${target} not found after ${steps} steps\n`);
  return false;
}

console.log('Example 5: Binary Search Tree Lookup');
// Create a simple BST: 
//       50
//      /  \
//    30    70
//   /  \   /  \
//  20  40 60  80
const tree: TreeNode<number> = {
  value: 50,
  left: {
    value: 30,
    left: { value: 20 },
    right: { value: 40 }
  },
  right: {
    value: 70,
    left: { value: 60 },
    right: { value: 80 }
  }
};

searchBST(tree, 60);

/**
 * Example 6: Logarithmic growth visualization
 */
interface ScaleMetrics {
  inputSize: number;
  maxSteps: number;
  description: string;
}

function demonstrateScaling(): ScaleMetrics[] {
  const metrics: ScaleMetrics[] = [
    { inputSize: 16, maxSteps: 4, description: 'Small dataset' },
    { inputSize: 256, maxSteps: 8, description: 'Medium dataset' },
    { inputSize: 1024, maxSteps: 10, description: 'Large dataset' },
    { inputSize: 1048576, maxSteps: 20, description: 'Very large dataset' }
  ];

  console.log('  Logarithmic scaling visualization:\n');
  metrics.forEach(m => {
    console.log(`  ${m.description.padEnd(20)} | n = ${m.inputSize.toLocaleString().padStart(10)} | steps = ${m.maxSteps}`);
  });
  console.log('\n  ✓ Notice: 64x more data requires only ~6 more steps!\n');

  return metrics;
}

console.log('Example 6: Scaling Demonstration');
demonstrateScaling();

console.log('=== Key Takeaway ===');
console.log('O(log n) is extremely efficient and scales wonderfully.');
console.log('Works by repeatedly dividing the problem in half.');
console.log('Requires data to be sorted or organized in a specific way.');
console.log('Common in: binary search, balanced trees, divide-and-conquer algorithms.');
console.log('TypeScript generics make these algorithms reusable and type-safe!\n');
