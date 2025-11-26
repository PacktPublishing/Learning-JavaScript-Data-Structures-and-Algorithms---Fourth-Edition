/**
 * O(log n) - Logarithmic Time Complexity Examples
 * 
 * These algorithms reduce the problem size by a fraction (usually half) with each step.
 * As input doubles, work increases by only a constant amount.
 * Highly efficient for large datasets.
 */

console.log('=== O(log n) - Logarithmic Time Complexity Demo ===\n');

/**
 * Example 1: Binary Search
 * The classic O(log n) algorithm - searches a sorted array by repeatedly halving the search space
 */
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let steps = 0;

  console.log(`  Searching for ${target} in array of ${arr.length} elements`);

  while (left <= right) {
    steps++;
    const mid = Math.floor((left + right) / 2);
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
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31];
binarySearch(sortedArray, 23);

// Show how it scales
console.log('Scalability demonstration:');
console.log('  For 16 elements: max ~4 steps (log₂ 16 = 4)');
console.log('  For 1,024 elements: max ~10 steps (log₂ 1,024 = 10)');
console.log('  For 1,048,576 elements: max ~20 steps (log₂ 1,048,576 = 20)');
console.log('  ✓ Doubling the data adds only 1 step!\n');

/**
 * Example 2: Finding the power of 2
 * How many times can we divide n by 2 until we reach 1?
 */
function findPowerOfTwo(n) {
  let divisions = 0;
  let value = n;

  console.log(`  Starting with n = ${n}`);

  while (value > 1) {
    divisions++;
    value = Math.floor(value / 2);
    console.log(`  Division ${divisions}: ${value}`);
  }

  console.log(`  ✓ Required ${divisions} divisions (≈ log₂ ${n})\n`);
  return divisions;
}

console.log('Example 2: Counting Divisions by 2');
findPowerOfTwo(32);

/**
 * Example 3: Guess the Number Game
 * Optimal strategy using binary search approach
 */
function guessTheNumber(min, max, secret) {
  let guesses = 0;
  let low = min;
  let high = max;

  console.log(`  Guessing a number between ${min} and ${max}`);
  console.log(`  (Secret number is ${secret})\n`);

  while (low <= high) {
    guesses++;
    const guess = Math.floor((low + high) / 2);
    console.log(`  Guess #${guesses}: Is it ${guess}?`);

    if (guess === secret) {
      console.log(`  🎉 Yes! Found ${secret} in ${guesses} guesses\n`);
      return guesses;
    } else if (guess < secret) {
      console.log(`    Too low! New range: ${guess + 1} to ${high}`);
      low = guess + 1;
    } else {
      console.log(`    Too high! New range: ${low} to ${guess - 1}`);
      high = guess - 1;
    }
  }

  return -1;
}

console.log('Example 3: Guess the Number (1-100)');
guessTheNumber(1, 100, 73);

console.log('Why this is efficient:');
console.log('  Range 1-100: max 7 guesses');
console.log('  Range 1-1,000: max 10 guesses');
console.log('  Range 1-1,000,000: max 20 guesses');
console.log('  ✓ Each guess eliminates half the possibilities\n');

/**
 * Example 4: Finding position in powers of 2
 * Which power of 2 is closest to n?
 */
function findClosestPowerOfTwo(n) {
  let power = 0;
  let value = 1;

  console.log(`  Finding closest power of 2 for ${n}:`);

  while (value * 2 <= n) {
    value *= 2;
    power++;
    console.log(`  2^${power} = ${value}`);
  }

  console.log(`  ✓ Closest: 2^${power} = ${value} (took ${power} steps)\n`);
  return power;
}

console.log('Example 4: Finding Closest Power of 2');
findClosestPowerOfTwo(1000);

/**
 * Example 5: Phone book search analogy
 */
console.log('Example 5: Real-World Analogy - Phone Book');
console.log('  Imagine searching a phone book with 1,000,000 names:');
console.log('  ');
console.log('  Linear search (O(n)): Check each name, up to 1,000,000 checks');
console.log('  Binary search (O(log n)): Open to middle, eliminate half repeatedly');
console.log('  ');
console.log('  With binary search:');
console.log('    Step 1: Open to middle (page 500,000) → eliminate 500,000 names');
console.log('    Step 2: Open to middle of remaining half → eliminate 250,000');
console.log('    Step 3: Continue halving...');
console.log('  ');
console.log('  Result: Find any name in ~20 steps instead of up to 1,000,000!');
console.log('  ✓ That\'s the power of O(log n)\n');

console.log('=== Key Takeaway ===');
console.log('O(log n) is extremely efficient and scales wonderfully.');
console.log('Works by repeatedly dividing the problem in half.');
console.log('Requires data to be sorted or organized in a specific way.');
console.log('Common in: binary search, balanced trees, divide-and-conquer algorithms.\n');
