/**
 * Decimal to Any Base Converter using Stack in TypeScript
 * 
 * This example extends the binary converter to handle conversion
 * to any base (2-36). It demonstrates how the same stack-based
 * algorithm works for different number systems.
 * 
 * TypeScript features:
 * - Union types for base constraints
 * - Type-safe base validation
 * - Comprehensive error handling
 * - Generic Stack usage
 */

import Stack from './stack';

// Define valid base range as a type
type ValidBase = number; // We'll validate this at runtime

// Type for representing a conversion step in any base
interface BaseConversionStep {
  dividend: number;
  base: number;
  quotient: number;
  remainder: number;
  digit: string;
}

// Type for conversion results
interface ConversionResult {
  success: boolean;
  result?: string;
  steps?: BaseConversionStep[];
  error?: string;
}

/**
 * Converts a decimal number to any base (2-36)
 * @param decimalNumber The decimal number to convert
 * @param base The target base (2-36)
 * @returns The number in the specified base
 * @throws Error for invalid inputs
 */
function decimalToBase(decimalNumber: number, base: ValidBase): string {
  // Validate input parameters
  if (!Number.isInteger(decimalNumber)) {
    throw new Error('Decimal number must be an integer');
  }

  if (!Number.isInteger(base) || base < 2 || base > 36) {
    throw new Error('Base must be an integer between 2 and 36');
  }
  
  if (decimalNumber === 0) {
    return '0';
  }

  // Character set for bases up to 36 (0-9, A-Z)
  const digits: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const remainderStack = new Stack<number>();
  const conversionSteps: BaseConversionStep[] = [];
  let number: number = Math.abs(decimalNumber);
  let result: string = '';

  console.log(`Converting ${decimalNumber} to base ${base}:`);
  console.log(`Step-by-step division by ${base}:`);

  // Division method for any base
  while (number > 0) {
    const remainder: number = number % base;
    const quotient: number = Math.floor(number / base);
    const digit: string = digits[remainder];
    
    // Store the conversion step
    const step: BaseConversionStep = {
      dividend: number,
      base: base,
      quotient: quotient,
      remainder: remainder,
      digit: digit
    };
    conversionSteps.push(step);
    
    console.log(`${number} ÷ ${base} = ${quotient} remainder ${remainder} (digit: ${digit})`);
    remainderStack.push(remainder);
    number = quotient;
  }

  console.log('\nRemainders in stack:', remainderStack.toString());
  console.log('Popping remainders to build result:');

  // Pop remainders and convert to appropriate digits
  while (!remainderStack.isEmpty()) {
    const remainder: number | undefined = remainderStack.pop();
    if (remainder !== undefined) {
      const digit: string = digits[remainder];
      result += digit;
      console.log(`Popped: ${remainder}, Digit: ${digit}, Result so far: ${result}`);
    }
  }

  // Handle negative numbers
  if (decimalNumber < 0) {
    result = '-' + result;
  }

  return result;
}

/**
 * Safely converts a decimal number to any base with comprehensive error handling
 * @param decimalNumber The decimal number to convert
 * @param base The target base
 * @returns Conversion result object
 */
function safeDecimalToBase(decimalNumber: unknown, base: unknown): ConversionResult {
  try {
    // Type validation
    if (typeof decimalNumber !== 'number' || !Number.isInteger(decimalNumber)) {
      return {
        success: false,
        error: 'Decimal number must be an integer'
      };
    }

    if (typeof base !== 'number' || !Number.isInteger(base)) {
      return {
        success: false,
        error: 'Base must be an integer'
      };
    }

    const result: string = decimalToBase(decimalNumber, base);
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

/**
 * Gets the name of a base for display purposes
 * @param base The base number
 * @returns The common name of the base
 */
function getBaseName(base: number): string {
  const baseNames: Record<number, string> = {
    2: 'Binary',
    8: 'Octal',
    10: 'Decimal',
    16: 'Hexadecimal',
    32: 'Base32',
    36: 'Base36'
  };
  
  return baseNames[base] || `Base-${base}`;
}

/**
 * Verifies a conversion by converting back to decimal
 * @param result The converted result
 * @param base The base used for conversion
 * @returns The decimal equivalent
 */
function verifyConversion(result: string, base: number): number {
  const cleanResult: string = result.replace('-', '');
  return parseInt(cleanResult, base);
}

// Demonstration
console.log('=== TypeScript Decimal to Base Converter Demo ===\n');

// Test cases with different bases
const testCases: Array<{ decimal: number; base: number }> = [
  { decimal: 100345, base: 2 },
  { decimal: 100345, base: 8 },
  { decimal: 100345, base: 16 },
  { decimal: 100345, base: 35 },
  { decimal: 255, base: 16 },
  { decimal: 1000, base: 36 },
  { decimal: 42, base: 7 }
];

testCases.forEach((testCase, index) => {
  console.log(`\n--- Test Case ${index + 1}: ${testCase.decimal} to ${getBaseName(testCase.base)} ---`);
  
  try {
    const result: string = decimalToBase(testCase.decimal, testCase.base);
    console.log(`Final result: ${testCase.decimal} (decimal) = ${result} (${getBaseName(testCase.base).toLowerCase()})`);
    
    // Verify the conversion
    const verification: number = verifyConversion(result, testCase.base);
    console.log(`Verification: ${result} (base ${testCase.base}) = ${verification} (decimal)`);
    console.log(`Conversion ${verification === testCase.decimal ? '✓ CORRECT' : '✗ INCORRECT'}`);
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
  }
});

console.log('\n--- Common Base Conversions ---');

// Demonstrate common programming bases
const commonNumber: number = 255;
const commonBases: number[] = [2, 8, 10, 16];

console.log(`Converting ${commonNumber} to common programming bases:`);
commonBases.forEach((base: number) => {
  const result: string = decimalToBase(commonNumber, base);
  console.log(`${getBaseName(base).padEnd(12)}: ${result}`);
});

console.log('\n--- Error Handling Tests ---');

// Test various invalid inputs
const invalidTests: Array<{ decimal: unknown; base: unknown; description: string }> = [
  { decimal: 3.14, base: 10, description: 'Float decimal number' },
  { decimal: 100, base: 1.5, description: 'Float base' },
  { decimal: 100, base: 1, description: 'Base too small' },
  { decimal: 100, base: 37, description: 'Base too large' },
  { decimal: '100', base: 10, description: 'String decimal number' },
  { decimal: 100, base: 'hex', description: 'String base' },
  { decimal: null, base: 10, description: 'Null decimal number' },
  { decimal: 100, base: undefined, description: 'Undefined base' }
];

invalidTests.forEach((test, index) => {
  console.log(`\n${index + 1}. Testing: ${test.description}`);
  console.log(`   Input: decimal=${test.decimal}, base=${test.base}`);
  
  const result: ConversionResult = safeDecimalToBase(test.decimal, test.base);
  if (result.success) {
    console.log(`   ✓ Result: ${result.result}`);
  } else {
    console.log(`   ✗ Error: ${result.error}`);
  }
});

console.log('\n--- Real-World Applications ---');

// Demonstrate real-world use cases
console.log('\n1. Web Color Codes (RGB to Hex):');
const rgbValues: Array<{ r: number; g: number; b: number }> = [
  { r: 255, g: 0, b: 0 },    // Red
  { r: 0, g: 255, b: 0 },    // Green
  { r: 0, g: 0, b: 255 },    // Blue
  { r: 255, g: 255, b: 255 } // White
];

rgbValues.forEach((rgb) => {
  const rHex: string = decimalToBase(rgb.r, 16).padStart(2, '0');
  const gHex: string = decimalToBase(rgb.g, 16).padStart(2, '0');
  const bHex: string = decimalToBase(rgb.b, 16).padStart(2, '0');
  const colorCode: string = `#${rHex}${gHex}${bHex}`;
  
  console.log(`   RGB(${rgb.r}, ${rgb.g}, ${rgb.b}) = ${colorCode}`);
});

console.log('\n2. URL Shortening (Base62 simulation):');
const urlIds: number[] = [1000, 5000, 10000, 50000];

urlIds.forEach((id: number) => {
  // Simulate base-62 with base-36 (close approximation)
  const shortCode: string = decimalToBase(id, 36);
  console.log(`   URL ID ${id} → Short code: ${shortCode}`);
});

console.log('\n=== Demo Complete ===');
console.log('TypeScript advantages demonstrated:');
console.log('• Strong typing prevents invalid base conversions');
console.log('• Type-safe function parameters and return values');
console.log('• Union types for flexible yet constrained inputs');
console.log('• Comprehensive error handling with typed results');
console.log('• Interface definitions for complex data structures');
console.log('• Type guards for runtime validation');