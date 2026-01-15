/**
 * Decimal to Any Base Converter using Stack
 * 
 * This example extends the binary converter to handle conversion
 * to any base (2-36). It demonstrates how the same stack-based
 * algorithm works for different number systems.
 */

import Stack from './stack.js';

/**
 * Converts a decimal number to any base (2-36)
 * @param {number} decimalNumber - The decimal number to convert
 * @param {number} base - The target base (2-36)
 * @returns {string} The number in the specified base
 */
function decimalToBase(decimalNumber, base) {
  // Validate input
  if (base < 2 || base > 36) {
    throw new Error('Base must be between 2 and 36');
  }
  
  if (decimalNumber === 0) {
    return '0';
  }

  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const remainderStack = new Stack();
  let number = Math.abs(decimalNumber);
  let result = '';

  console.log(`Converting ${decimalNumber} to base ${base}:`);
  console.log(`Step-by-step division by ${base}:`);

  // Division method for any base
  while (number > 0) {
    const remainder = number % base;
    const digit = digits[remainder];
    console.log(`${number} ÷ ${base} = ${Math.floor(number / base)} remainder ${remainder} (digit: ${digit})`);
    remainderStack.push(remainder);
    number = Math.floor(number / base);
  }

  console.log('\nRemainders in stack:', remainderStack.toString());
  console.log('Popping remainders to build result:');

  // Pop remainders and convert to appropriate digits
  while (!remainderStack.isEmpty()) {
    const remainder = remainderStack.pop();
    const digit = digits[remainder];
    result += digit;
    console.log(`Popped: ${remainder} → digit: ${digit}, Result so far: ${result}`);
  }

  // Handle negative numbers
  if (decimalNumber < 0) {
    result = '-' + result;
  }

  return result;
}

/**
 * Batch conversion function for quick testing
 */
function quickConvert(decimalNumber, base) {
  if (base < 2 || base > 36 || decimalNumber === 0) {
    return decimalNumber === 0 ? '0' : 'Invalid base';
  }

  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const stack = new Stack();
  let number = Math.abs(decimalNumber);

  while (number > 0) {
    stack.push(number % base);
    number = Math.floor(number / base);
  }

  let result = '';
  while (!stack.isEmpty()) {
    result += digits[stack.pop()];
  }

  return decimalNumber < 0 ? '-' + result : result;
}

/**
 * Demonstrates conversions to various bases
 */
function demonstrateBaseConversions() {
  console.log('=== Decimal to Any Base Converter Demo ===\n');

  // Detailed example
  console.log('Detailed Example:');
  const detailedResult = decimalToBase(255, 16);
  console.log(`Final result: 255 (decimal) = ${detailedResult} (hexadecimal)`);
  console.log('-'.repeat(60));

  // Common bases demonstration
  const number = 42;
  const bases = [
    { base: 2, name: 'Binary' },
    { base: 8, name: 'Octal' },
    { base: 16, name: 'Hexadecimal' },
    { base: 3, name: 'Ternary' },
    { base: 7, name: 'Septenary' },
    { base: 12, name: 'Duodecimal' },
    { base: 36, name: 'Base-36' }
  ];

  console.log(`\nConverting ${number} to different bases:`);
  bases.forEach(({ base, name }) => {
    const result = quickConvert(number, base);
    console.log(`${name.padEnd(12)} (base ${base.toString().padStart(2)}): ${result}`);
  });
}

/**
 * Shows interesting number patterns in different bases
 */
function showNumberPatterns() {
  console.log('\n=== Interesting Number Patterns ===');
  
  const patterns = [
    { number: 15, bases: [2, 4, 8, 16], description: 'Powers of 2 relationship' },
    { number: 100, bases: [2, 8, 10, 16], description: 'Nice round number' },
    { number: 365, bases: [7, 12, 16], description: 'Days in a year' },
    { number: 1024, bases: [2, 8, 16], description: 'Computer memory unit' }
  ];

  patterns.forEach(({ number, bases, description }) => {
    console.log(`\n${number} (${description}):`);
    bases.forEach(base => {
      const result = quickConvert(number, base);
      const baseName = getBaseName(base);
      console.log(`  Base ${base.toString().padStart(2)} (${baseName.padEnd(11)}): ${result}`);
    });
  });
}

/**
 * Helper function to get common base names
 */
function getBaseName(base) {
  const names = {
    2: 'Binary',
    3: 'Ternary', 
    8: 'Octal',
    10: 'Decimal',
    12: 'Duodecimal',
    16: 'Hexadecimal',
    36: 'Base-36'
  };
  return names[base] || `Base-${base}`;
}

/**
 * Explains why stacks work for any base conversion
 */
function explainAlgorithm() {
  console.log('\n=== Why This Algorithm Works for Any Base ===');
  console.log('The principle is the same regardless of base:');
  console.log('1. Repeatedly divide by the target base');
  console.log('2. The remainders give us digits from RIGHT to LEFT');
  console.log('3. Stack reverses this order automatically');
  console.log('4. For bases > 10, we use letters (A=10, B=11, etc.)');
  console.log();
  console.log('Examples of remainder-to-digit mapping:');
  console.log('• Base 16: 10→A, 11→B, 12→C, 13→D, 14→E, 15→F');
  console.log('• Base 36: Uses 0-9 and A-Z (35 different digits)');
  console.log();
  console.log('Time Complexity: O(log_base(n)) where n is the input number');
  console.log('Space Complexity: O(log_base(n)) for the stack storage');
}

/**
 * Interactive conversion function
 */
function convertWithVerification(number, base) {
  console.log(`\n=== Converting ${number} to base ${base} ===`);
  const result = quickConvert(number, base);
  console.log(`Result: ${number} (base 10) = ${result} (base ${base})`);
  
  // Verify by converting back
  const verification = parseInt(result, base);
  const isCorrect = verification === number;
  console.log(`Verification: ${result} (base ${base}) = ${verification} (base 10) ${isCorrect ? '✓' : '✗'}`);
  
  return result;
}

// Run all demonstrations
demonstrateBaseConversions();
showNumberPatterns();
explainAlgorithm();

console.log('\n=== Quick Verification Tests ===');
[
  { num: 255, base: 16 },
  { num: 1000, base: 8 },
  { num: 64, base: 2 },
  { num: 123, base: 7 },
  { num: 456, base: 12 }
].forEach(({ num, base }) => {
  convertWithVerification(num, base);
});

console.log('\n=== Demo Complete ===');
console.log('Key insights:');
console.log('• Same stack algorithm works for any base 2-36');
console.log('• Stacks naturally handle the digit order reversal');
console.log('• Perfect example of algorithm generalization');