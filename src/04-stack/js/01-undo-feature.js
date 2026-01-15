/**
 * Document Editor Undo Feature Simulation
 * 
 * This example demonstrates how stacks can be used to implement
 * an undo feature in a text editor. Each action gets pushed onto
 * the stack and can be undone by popping from the stack.
 */

import Stack from './stack.js';

console.log('=== Document Editor Undo Feature Demo ===\n');

// Create a new undo stack for our document editor
const undoFeature = new Stack();

console.log('1. Opening a new document...');
console.log('   Undo stack empty:', undoFeature.isEmpty()); // true
console.log('   Available undos:', undoFeature.size); // 0
console.log();

console.log('2. Starting to type "Stack"...');

// Simulate typing each character
console.log('   Typing "S"');
undoFeature.push({ action: 'typing', text: 'S' });

console.log('   Typing "t"');
undoFeature.push({ action: 'typing', text: 't' });

console.log('   Current state:');
console.log('   - Last action:', JSON.stringify(undoFeature.peek()));
console.log('   - Available undos:', undoFeature.size);
console.log('   - Stack contents:', undoFeature.toString());
console.log();

console.log('3. Continuing to type "ack"...');
undoFeature.push({ action: 'typing', text: 'a' });
undoFeature.push({ action: 'typing', text: 'c' });
undoFeature.push({ action: 'typing', text: 'k' });

console.log('   Final typing state:');
console.log('   - Available undos:', undoFeature.size);
console.log('   - Undo stack empty:', undoFeature.isEmpty());
console.log('   - Stack contents:', undoFeature.toString());
console.log();

console.log('4. Oops! Made a mistake. Let\'s undo the last two characters...');

// Undo the last two actions
const undone1 = undoFeature.pop();
const undone2 = undoFeature.pop();

console.log('   Undid:', JSON.stringify(undone1));
console.log('   Undid:', JSON.stringify(undone2));
console.log('   Current state:');
console.log('   - Available undos:', undoFeature.size);
console.log('   - Next action to undo:', JSON.stringify(undoFeature.peek()));
console.log('   - Stack contents:', undoFeature.toString());
console.log();

console.log('5. Let\'s simulate more complex actions...');

// Add some formatting actions
undoFeature.push({ action: 'format', type: 'bold', text: 'Sta' });
undoFeature.push({ action: 'typing', text: 'c' });
undoFeature.push({ action: 'typing', text: 'k' });
undoFeature.push({ action: 'format', type: 'italic', text: 'Stack' });

console.log('   After formatting:');
console.log('   - Available undos:', undoFeature.size);
console.log('   - Stack contents:', undoFeature.toString());
console.log();

console.log('6. Undo all actions one by one...');
let undoCount = 0;
while (!undoFeature.isEmpty()) {
  const action = undoFeature.pop();
  undoCount++;
  console.log(`   Undo ${undoCount}:`, JSON.stringify(action));
  console.log(`   Remaining undos: ${undoFeature.size}`);
}

console.log('\n7. Back to empty document!');
console.log('   Undo stack empty:', undoFeature.isEmpty());
console.log('   Available undos:', undoFeature.size);

// Try to undo when nothing is left
const noUndo = undoFeature.pop();
console.log('   Trying to undo with empty stack:', noUndo); // undefined

console.log('\n8. Demonstrating clear functionality...');
undoFeature.push({ action: 'typing', text: 'New' });
undoFeature.push({ action: 'typing', text: ' ' });
undoFeature.push({ action: 'typing', text: 'document' });

console.log('   Before clear - Available undos:', undoFeature.size);
undoFeature.clear();
console.log('   After clear - Available undos:', undoFeature.size);
console.log('   Stack empty:', undoFeature.isEmpty());

console.log('\n=== Demo Complete ===');
console.log('This demonstrates how stacks enable undo functionality:');
console.log('• Push = Record an action');
console.log('• Pop = Undo the most recent action');
console.log('• Peek = Preview what will be undone');
console.log('• isEmpty = Check if undo is available');
console.log('• clear = Reset undo history');