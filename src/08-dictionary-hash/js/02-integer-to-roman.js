/**
 * Integer to Roman - LeetCode Problem #12
 * https://leetcode.com/problems/integer-to-roman/description/
 * 
 * This example demonstrates using a map/dictionary data structure
 * to convert integer numbers to their Roman numeral representation.
 * 
 * Roman Numeral System:
 * - I = 1, V = 5, X = 10, L = 50, C = 100, D = 500, M = 1000
 * - Special subtraction cases: IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900
 * 
 * The algorithm uses a greedy approach:
 * - Start with the largest Roman numeral value
 * - Subtract it from the number as many times as possible
 * - Move to the next smaller value and repeat
 */

console.log('=== Integer to Roman Conversion Demo ===\n');

/**
 * Converts an integer (1-3999) to its Roman numeral representation
 * Uses a map/dictionary to associate Roman symbols with their values
 * 
 * Time Complexity: O(1) - fixed number of Roman numeral symbols
 * Space Complexity: O(1) - fixed size map and bounded result string
 * 
 * @param {number} num - The integer to convert (1-3999)
 * @returns {string} The Roman numeral representation
 */
function intToRoman(num) {
  // Map of Roman numerals to their integer values
  // Arranged in descending order for the greedy algorithm
  // Includes subtraction cases (IV, IX, XL, XC, CD, CM)
  const romanMap = {
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

// Test cases demonstrating the conversion
console.log('1. Basic conversions:');
const basicTests = [1, 5, 10, 50, 100, 500, 1000];
for (const num of basicTests) {
  console.log(`   ${num} => ${intToRoman(num)}`);
}
console.log();

console.log('2. Subtraction cases (4, 9, 40, 90, 400, 900):');
const subtractionTests = [4, 9, 40, 90, 400, 900];
for (const num of subtractionTests) {
  console.log(`   ${num} => ${intToRoman(num)}`);
}
console.log();

console.log('3. Compound numbers:');
const compoundTests = [
  { num: 3, expected: 'III' },
  { num: 58, expected: 'LVIII' },
  { num: 1994, expected: 'MCMXCIV' },
  { num: 2024, expected: 'MMXXIV' },
  { num: 3888, expected: 'MMMDCCCLXXXVIII' },  // Longest roman numeral
];

for (const { num, expected } of compoundTests) {
  const result = intToRoman(num);
  const status = result === expected ? '✓' : '✗';
  console.log(`   ${status} ${num} => ${result} (expected: ${expected})`);
}
console.log();

console.log('4. Step-by-step breakdown of 1994:');
console.log('   1994 = 1000 + 900 + 90 + 4');
console.log('        = M + CM + XC + IV');
console.log('        = MCMXCIV');
console.log();

/**
 * Alternative implementation using native Map class
 * Demonstrates the Map iteration order guarantee
 */
function intToRomanWithMap(num) {
  const romanMap = new Map([
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

console.log('5. Verification with Map implementation:');
console.log(`   1994 with object: ${intToRoman(1994)}`);
console.log(`   1994 with Map: ${intToRomanWithMap(1994)}`);
console.log();

// Export for use in other modules
export { intToRoman, intToRomanWithMap };
