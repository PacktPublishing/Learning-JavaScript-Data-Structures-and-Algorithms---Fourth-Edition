/**
 * Decimal to Binary Converter using Stack in TypeScript
 * 
 * This example demonstrates how stacks can be used to convert
 * decimal numbers to binary representation. The algorithm uses
 * the division-by-2 method where remainders are pushed onto
 * a stack and then popped to get the binary digits in correct order.
 * 
 * TypeScript features:
 * - Type annotations for function parameters and return values
 * - Type guards for input validation
 * - Generic Stack class usage
 */

import Stack from './stack';

// Type for representing a conversion step
interface ConversionStep {
  dividend: number;
  quotient: number;
  remainder: number;
}

/**
 * Converts a decimal number to binary using a stack
 * @param decimalNumber The decimal number to convert
 * @returns The binary representation as a string
 * @throws Error if input is not a valid number
 */
function decimalToBinary(decimalNumber: number): string {
  // Input validation with type guards
  if (!Number.isInteger(decimalNumber)) {
    throw new Error('Input must be an integer');
  }

  if (decimalNumber === 0) {
    return '0';
  }

  const remainderStack = new Stack<number>();
  const conversionSteps: ConversionStep[] = [];
  let number: number = Math.abs(decimalNumber); // Work with absolute value
  let binaryString: string = '';

  console.log(`Converting ${decimalNumber} to binary:`);
  console.log('Step-by-step division by 2:');

  // Division by 2 method
  while (number > 0) {
    const remainder: number = number % 2;
    const quotient: number = Math.floor(number / 2);
    
    // Store the conversion step for educational purposes
    const step: ConversionStep = {
      dividend: number,
      quotient: quotient,
      remainder: remainder
    };
    conversionSteps.push(step);
    
    console.log(`${number} ÷ 2 = ${quotient} remainder ${remainder}`);
    remainderStack.push(remainder);
    number = quotient;
  }

  console.log('\nRemainders in stack (top to bottom):', remainderStack.toString());
  console.log('Popping remainders to build binary number:');

  // Pop remainders to build binary string
  while (!remainderStack.isEmpty()) {
    const digit: number | undefined = remainderStack.pop();
    if (digit !== undefined) {
      binaryString += digit.toString();
      console.log(`Popped: ${digit}, Binary so far: ${binaryString}`);
    }
  }

  // Handle negative numbers
  if (decimalNumber < 0) {
    binaryString = '-' + binaryString;
  }

  return binaryString;
}

/**
 * Validates if a value is a valid decimal number for conversion
 * @param value The value to validate
 * @returns True if valid, false otherwise
 */
function isValidDecimalNumber(value: unknown): value is number {
  return typeof value === 'number' && 
         Number.isInteger(value) && 
         Number.isFinite(value);
}

/**
 * Safely converts a decimal number to binary with error handling
 * @param input The input to convert
 * @returns Object containing success status and result or error
 */
function safeDecimalToBinary(input: unknown): { success: boolean; result?: string; error?: string } {
  try {
    if (!isValidDecimalNumber(input)) {
      return {
        success: false,
        error: 'Input must be a finite integer'
      };
    }

    const result: string = decimalToBinary(input);
    return {
      success: true,
      result: result
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

// Demonstration with various test cases
console.log('=== TypeScript Decimal to Binary Converter Demo ===\n');

// Test cases with proper typing
const testCases: number[] = [10, 13, 0, 1, 255, 1024];

testCases.forEach((testCase: number, index: number) => {
  console.log(`\n--- Test Case ${index + 1}: Converting ${testCase} ---`);
  
  try {
    const binaryResult: string = decimalToBinary(testCase);
    console.log(`Final result: ${testCase} (decimal) = ${binaryResult} (binary)`);
    
    // Verify the result by converting back
    const verification: number = parseInt(binaryResult.replace('-', ''), 2);
    const originalAbs: number = Math.abs(testCase);
    console.log(`Verification: ${binaryResult} (binary) = ${verification} (decimal)`);
    console.log(`Conversion ${verification === originalAbs ? '✓ CORRECT' : '✗ INCORRECT'}`);
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
  }
});

console.log('\n--- Testing Error Handling ---');

// Test error handling with various invalid inputs
const invalidInputs: unknown[] = [3.14, 'hello', null, undefined, NaN, Infinity];

invalidInputs.forEach((invalidInput: unknown) => {
  console.log(`\nTesting invalid input: ${invalidInput} (${typeof invalidInput})`);
  const result = safeDecimalToBinary(invalidInput);
  
  if (result.success) {
    console.log(`✓ Result: ${result.result}`);
  } else {
    console.log(`✗ Error: ${result.error}`);
  }
});

console.log('\n--- Performance Test ---');

// Performance test with larger numbers
const largeNumbers: number[] = [1000, 10000, 65535];

largeNumbers.forEach((num: number) => {
  console.log(`\nConverting large number: ${num}`);
  const startTime: number = performance.now();
  const binaryResult: string = decimalToBinary(num);
  const endTime: number = performance.now();
  
  console.log(`Result: ${binaryResult}`);
  console.log(`Time taken: ${(endTime - startTime).toFixed(3)}ms`);
  console.log(`Binary length: ${binaryResult.length} digits`);
});

console.log('\n=== Demo Complete ===');
console.log('TypeScript advantages demonstrated:');
console.log('• Type safety prevents runtime errors');
console.log('• Clear function signatures document expected inputs/outputs');
console.log('• Type guards enable robust input validation');
console.log('• Generic Stack<number> ensures type consistency');
console.log('• Interface definitions make data structures explicit');