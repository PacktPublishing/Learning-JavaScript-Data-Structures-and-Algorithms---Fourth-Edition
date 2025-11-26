/**
 * Document Editor Undo Feature Simulation in TypeScript
 * 
 * This example demonstrates how stacks can be used to implement
 * an undo feature in a text editor. Each action gets pushed onto
 * the stack and can be undone by popping from the stack.
 * 
 * Uses TypeScript features:
 * - Interfaces for type safety
 * - Enums for action types
 * - Generic Stack class
 */

import Stack from './stack';

// Define possible actions in our text editor
enum EditorActionType {
  TYPING = 'typing',
  DELETE = 'delete',
  FORMAT = 'format',
  INSERT = 'insert',
  PASTE = 'paste'
}

// Define the structure of formatting actions
interface FormatAction {
  type: 'bold' | 'italic' | 'underline' | 'color';
  value?: string; // For color, font-size, etc.
}

// Define the structure of an editor action
interface EditorAction {
  action: EditorActionType;
  text?: string;           // For typing, delete, insert, paste actions
  position?: number;       // Cursor position where action occurred
  format?: FormatAction;   // For formatting actions
  timestamp?: Date;        // When the action occurred
}

console.log('=== TypeScript Document Editor Undo Feature Demo ===\n');

// Create a new undo stack for our document editor
const undoFeature = new Stack<EditorAction>();

console.log('1. Opening a new document...');
console.log('   Undo stack empty:', undoFeature.isEmpty()); // true
console.log('   Available undos:', undoFeature.size); // 0
console.log();

console.log('2. Starting to type "Stack"...');

// Simulate typing each character with timestamps
console.log('   Typing "S"');
undoFeature.push({ 
  action: EditorActionType.TYPING, 
  text: 'S', 
  position: 0,
  timestamp: new Date()
});

console.log('   Typing "t"');
undoFeature.push({ 
  action: EditorActionType.TYPING, 
  text: 't', 
  position: 1,
  timestamp: new Date()
});

console.log('   Current state:');
console.log('   - Last action:', JSON.stringify(undoFeature.peek()));
console.log('   - Available undos:', undoFeature.size);
console.log('   - Stack contents:', undoFeature.toString());
console.log();

console.log('3. Continuing to type "ack"...');
undoFeature.push({ 
  action: EditorActionType.TYPING, 
  text: 'a', 
  position: 2,
  timestamp: new Date()
});
undoFeature.push({ 
  action: EditorActionType.TYPING, 
  text: 'c', 
  position: 3,
  timestamp: new Date()
});
undoFeature.push({ 
  action: EditorActionType.TYPING, 
  text: 'k', 
  position: 4,
  timestamp: new Date()
});

console.log('   Final typing state:');
console.log('   - Available undos:', undoFeature.size);
console.log('   - Undo stack empty:', undoFeature.isEmpty());
console.log('   - Stack contents:', undoFeature.toString());
console.log();

console.log('4. Adding some formatting...');

// Add formatting actions with type safety
undoFeature.push({
  action: EditorActionType.FORMAT,
  text: 'Stack',
  format: { type: 'bold' },
  timestamp: new Date()
});

undoFeature.push({
  action: EditorActionType.FORMAT,
  text: 'Stack',
  format: { type: 'italic' },
  timestamp: new Date()
});

console.log('   After formatting:');
console.log('   - Available undos:', undoFeature.size);
console.log('   - Stack contents:', undoFeature.toString());
console.log();

console.log('5. Oops! Made a mistake. Let\'s undo the last two actions...');

// Undo the last two actions with type safety
const undone1: EditorAction | undefined = undoFeature.pop();
const undone2: EditorAction | undefined = undoFeature.pop();

if (undone1) {
  console.log('   Undid:', JSON.stringify(undone1));
}
if (undone2) {
  console.log('   Undid:', JSON.stringify(undone2));
}

console.log('   Current state:');
console.log('   - Available undos:', undoFeature.size);
console.log('   - Next action to undo:', JSON.stringify(undoFeature.peek()));
console.log('   - Stack contents:', undoFeature.toString());
console.log();

console.log('6. Let\'s simulate more complex editing...');

// Add various types of actions
undoFeature.push({
  action: EditorActionType.DELETE,
  text: 'k',
  position: 4,
  timestamp: new Date()
});

undoFeature.push({
  action: EditorActionType.INSERT,
  text: 'ks are awesome',
  position: 4,
  timestamp: new Date()
});

undoFeature.push({
  action: EditorActionType.FORMAT,
  text: 'Stacks are awesome',
  format: { type: 'color', value: '#ff0000' },
  timestamp: new Date()
});

console.log('   After complex editing:');
console.log('   - Available undos:', undoFeature.size);
console.log('   - Stack contents:', undoFeature.toString());
console.log();

console.log('7. Undo all actions one by one...');
let undoCount = 0;
while (!undoFeature.isEmpty()) {
  const action: EditorAction | undefined = undoFeature.pop();
  undoCount++;
  if (action) {
    console.log(`   Undo ${undoCount}:`, JSON.stringify(action));
    console.log(`   Remaining undos: ${undoFeature.size}`);
  }
}

console.log('\n8. Back to empty document!');
console.log('   Undo stack empty:', undoFeature.isEmpty());
console.log('   Available undos:', undoFeature.size);

// Try to undo when nothing is left (with type safety)
const noUndo: EditorAction | undefined = undoFeature.pop();
console.log('   Trying to undo with empty stack:', noUndo); // undefined

console.log('\n9. Demonstrating clear functionality...');
undoFeature.push({ 
  action: EditorActionType.TYPING, 
  text: 'New', 
  timestamp: new Date() 
});
undoFeature.push({ 
  action: EditorActionType.TYPING, 
  text: ' ', 
  timestamp: new Date() 
});
undoFeature.push({ 
  action: EditorActionType.TYPING, 
  text: 'document', 
  timestamp: new Date() 
});

console.log('   Before clear - Available undos:', undoFeature.size);
undoFeature.clear();
console.log('   After clear - Available undos:', undoFeature.size);
console.log('   Stack empty:', undoFeature.isEmpty());

console.log('\n=== TypeScript Demo Complete ===');
console.log('This demonstrates how TypeScript enhances stack usage:');
console.log('• Generic types ensure type safety');
console.log('• Interfaces define clear data contracts');
console.log('• Enums prevent typos in action types');
console.log('• Type annotations make code self-documenting');
console.log('• Optional properties provide flexibility');
console.log('• Return type annotations ensure correct usage');