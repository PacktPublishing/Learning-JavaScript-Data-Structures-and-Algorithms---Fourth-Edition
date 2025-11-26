/**
 * Decimal to Binary Converter using Stack
 * 
 * This example demonstrates how stacks can be used to convert
 * decimal numbers to binary representation. The algorithm uses
 * the division-by-2 method where remainders are pushed onto
 * a stack and then popped to get the binary digits in correct order.
 */

const Stack = require('./stack');

/**
 * Converts a decimal number to binary using a stack
 * @param {number} decimalNumber - The decimal number to convert
 * @returns {string} The binary representation
 */
function decimalToBinary(decimalNumber) {
  if (decimalNumber === 0) {
    return '0';
  }

  const remainderStack = new Stack();
  let number = Math.abs(decimalNumber); // Work with absolute value
  let binaryString = '';

  console.log(`Converting ${decimalNumber} to binary:`);
  console.log('Step-by-step division by 2:');

  // Division by 2 method
  while (number > 0) {
    const remainder = number % 2;
    console.log(`${number} ÷ 2 = ${Math.floor(number / 2)} remainder ${remainder}`);
    remainderStack.push(remainder);
    number = Math.floor(number / 2);
  }

  console.log('\nRemainders in stack (top to bottom):', remainderStack.toString());
  console.log('Popping remainders to build binary number:');

  // Pop remainders to build binary string
  while (!remainderStack.isEmpty()) {
    const digit = remainderStack.pop();
    binaryString += digit;
    console.log(`Popped: ${digit}, Binary so far: ${binaryString}`);
  }

  // Handle negative numbers
  if (decimalNumber < 0) {
    binaryString = '-' + binaryString;
  }

  return binaryString;
}

/**
 * Demonstrates the conversion process with visual feedback
 */
function demonstrateConversion() {
  console.log('=== Decimal to Binary Converter Demo ===\n');

  const testNumbers = [10, 233, 0, 1, 8, 15];

  testNumbers.forEach((num, index) => {
    console.log(`Example ${index + 1}:`);
    const binary = decimalToBinary(num);
    console.log(`Result: ${num} (decimal) = ${binary} (binary)`);
    
    // Verify our result
    const verification = parseInt(binary, 2);
    console.log(`Verification: ${binary} (binary) = ${verification} (decimal) ✓`);
    console.log('-'.repeat(50));
  });
}

/**
 * Shows why stacks are perfect for this algorithm
 */
function explainWhyStacksWork() {
  console.log('\n=== Why Stacks Work for Binary Conversion ===');
  console.log('The division-by-2 method generates remainders in reverse order:');
  console.log('• We get the LAST binary digit first (rightmost)');
  console.log('• We get the FIRST binary digit last (leftmost)');
  console.log('• Stack\'s LIFO property reverses this order perfectly!');
  console.log();
  
  console.log('Without a stack, we\'d need to:');
  console.log('1. Store remainders in an array');
  console.log('2. Manually reverse the array');
  console.log('3. Join the digits');
  console.log();
  
  console.log('With a stack:');
  console.log('1. Push remainders as we calculate them');
  console.log('2. Pop them in reverse order (automatic reversal!)');
  console.log('3. Build the binary string');
}

/**
 * Alternative implementation without explicit stack explanation
 */
function decimalToBinarySimple(decimalNumber) {
  if (decimalNumber === 0) return '0';
  
  const stack = new Stack();
  let number = Math.abs(decimalNumber);
  
  while (number > 0) {
    stack.push(number % 2);
    number = Math.floor(number / 2);
  }
  
  let binary = '';
  while (!stack.isEmpty()) {
    binary += stack.pop();
  }
  
  return decimalNumber < 0 ? '-' + binary : binary;
}

// Run the demonstrations
demonstrateConversion();
explainWhyStacksWork();

console.log('\n=== Quick Conversion Tests ===');
const quickTests = [5, 42, 128, 255, 1024];
quickTests.forEach(num => {
  const binary = decimalToBinarySimple(num);
  console.log(`${num} → ${binary}`);
});

console.log('\n=== Demo Complete ===');
console.log('Key takeaway: Stacks naturally handle the order reversal');
console.log('needed when building numbers digit by digit from right to left!');