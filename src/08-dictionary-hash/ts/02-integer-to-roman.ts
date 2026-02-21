/**
 * Integer to Roman - LeetCode Problem #12 (TypeScript)
 * https://leetcode.com/problems/integer-to-roman/description/
 * 
 * This TypeScript implementation demonstrates using a map/dictionary
 * to convert integers to Roman numerals with full type safety.
 */

console.log('=== Integer to Roman Conversion (TypeScript) Demo ===\n');

/**
 * Type alias for the Roman numeral mapping
 */
type RomanNumeralMap = {
  [key: string]: number;
};

/**
 * Converts an integer (1-3999) to its Roman numeral representation
 * Uses a map/dictionary with typed keys and values
 * 
 * Time Complexity: O(1) - fixed number of Roman numeral symbols
 * Space Complexity: O(1) - fixed size map and bounded result string
 * 
 * @param num - The integer to convert (1-3999)
 * @returns The Roman numeral representation
 */
function intToRoman(num: number): string {
  // Validate input
  if (num < 1 || num > 3999) {
    throw new RangeError('Number must be between 1 and 3999');
  }

  // Map of Roman numerals to their integer values
  // Arranged in descending order for the greedy algorithm
  const romanMap: RomanNumeralMap = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };

  let result = '';

  // Greedy approach: use largest possible values first
  for (const romanNum in romanMap) {
    while (num >= romanMap[romanNum]) {
      result += romanNum;
      num -= romanMap[romanNum];
    }
  }

  return result;
}

/**
 * Alternative implementation using the native Map class
 * Demonstrates Map iteration order guarantee in TypeScript
 */
function intToRomanWithMap(num: number): string {
  if (num < 1 || num > 3999) {
    throw new RangeError('Number must be between 1 and 3999');
  }

  const romanMap = new Map<string, number>([
    ['M', 1000],
    ['CM', 900],
    ['D', 500],
    ['CD', 400],
    ['C', 100],
    ['XC', 90],
    ['L', 50],
    ['XL', 40],
    ['X', 10],
    ['IX', 9],
    ['V', 5],
    ['IV', 4],
    ['I', 1]
  ]);

  let result = '';

  for (const [romanNum, value] of romanMap) {
    while (num >= value) {
      result += romanNum;
      num -= value;
    }
  }

  return result;
}

/**
 * Interface for test cases
 */
interface TestCase {
  input: number;
  expected: string;
}

// Test cases
console.log('1. Basic conversions:');
const basicTests: number[] = [1, 5, 10, 50, 100, 500, 1000];
for (const num of basicTests) {
  console.log(`   ${num} => ${intToRoman(num)}`);
}
console.log();

console.log('2. Subtraction cases:');
const subtractionTests: number[] = [4, 9, 40, 90, 400, 900];
for (const num of subtractionTests) {
  console.log(`   ${num} => ${intToRoman(num)}`);
}
console.log();

console.log('3. Compound numbers with verification:');
const compoundTests: TestCase[] = [
  { input: 3, expected: 'III' },
  { input: 58, expected: 'LVIII' },
  { input: 1994, expected: 'MCMXCIV' },
  { input: 2024, expected: 'MMXXIV' },
  { input: 3888, expected: 'MMMDCCCLXXXVIII' },
];

for (const { input, expected } of compoundTests) {
  const result = intToRoman(input);
  const status = result === expected ? '✓' : '✗';
  console.log(`   ${status} ${input} => ${result} (expected: ${expected})`);
}
console.log();

console.log('4. Type safety demonstration:');
console.log('   TypeScript ensures:');
console.log('   - num parameter is a number');
console.log('   - Return type is string');
console.log('   - Map entries are properly typed');
console.log();

console.log('5. Error handling:');
try {
  intToRoman(0);
} catch (e) {
  if (e instanceof RangeError) {
    console.log(`   intToRoman(0) throws: ${e.message}`);
  }
}

try {
  intToRoman(4000);
} catch (e) {
  if (e instanceof RangeError) {
    console.log(`   intToRoman(4000) throws: ${e.message}`);
  }
}
console.log();

console.log('6. Both implementations produce same results:');
const testNum = 1994;
console.log(`   Object-based: ${intToRoman(testNum)}`);
console.log(`   Map-based: ${intToRomanWithMap(testNum)}`);

// Export functions
export { intToRoman, intToRomanWithMap };
