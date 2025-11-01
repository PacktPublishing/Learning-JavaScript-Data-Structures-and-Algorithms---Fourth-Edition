# Chapter 4 – Stacks

This folder contains runnable code examples for **Chapter 4** of the book ["Learning JavaScript Data Structures and Algorithms - Fourth Edition"](https://www.packtpub.com/) by **Packt Publishing**.

The examples demonstrate the Stack data structure and its Last-In-First-Out (LIFO) principle through practical applications.

## What is a Stack?

A stack is an ordered collection where items follow the **Last-In-First-Out (LIFO)** principle. Think of it like:
- A stack of books (you can only add/remove from the top)
- A stack of cafeteria trays
- The undo feature in text editors
- Browser back button history

## Files

### JavaScript Implementation (`js/` folder)
- **`stack.js`** – Complete Stack class implementation with all essential methods
- **`01-undo-feature.js`** – Simulates a text editor's undo functionality using stacks
- **`02-decimal-to-binary.js`** – Converts decimal numbers to binary using stack-based algorithm
- **`03-decimal-to-base.js`** – General base conversion (supports bases 2-36) using stacks

### TypeScript Implementation (`ts/` folder)
- **`stack.ts`** – Generic Stack class with TypeScript type safety and interfaces
- **`01-undo-feature.ts`** – Type-safe undo feature with enums and interfaces for editor actions
- **`02-decimal-to-binary.ts`** – Binary converter with comprehensive type validation and error handling
- **`03-decimal-to-base.ts`** – Advanced base converter with union types and real-world examples

## Stack Operations

Our Stack class provides these essential methods:

| Method | Description | Time Complexity |
|--------|-------------|-----------------|
| `push(item)` | Add element to top | O(1) |
| `pop()` | Remove and return top element | O(1) |
| `peek()` | View top element without removing | O(1) |
| `isEmpty()` | Check if stack is empty | O(1) |
| `size` | Get number of elements | O(1) |
| `clear()` | Remove all elements | O(1) |
| `toString()` | String representation | O(n) |

## Running the Examples

> **Note**: Make sure you have followed the setup instructions in the [main repository README](../../README.md) before running these examples.

### Run JavaScript Examples

```bash
# Navigate to the chapter directory
cd src/04-stack

# Run the JavaScript examples
node js/01-undo-feature.js
node js/02-decimal-to-binary.js
node js/03-decimal-to-base.js
```

### Run TypeScript Examples

```bash
# Navigate to the chapter directory
cd src/04-stack

# Run the TypeScript examples (ts-node is already configured)
npx ts-node ts/01-undo-feature.ts
npx ts-node ts/02-decimal-to-binary.ts
npx ts-node ts/03-decimal-to-base.ts
```

### Alternative: Use NPM Scripts

From the root directory, you can also use the predefined npm scripts:

```bash
# JavaScript examples
npm run stack:js     # Undo feature demo
npm run binary:js    # Binary converter
npm run base:js      # Base converter

# TypeScript examples  
npm run stack:ts     # Undo feature demo
npm run binary:ts    # Binary converter
npm run base:ts      # Base converter
```

### Example Outputs

#### Undo Feature Demo (JavaScript)
```
=== Document Editor Undo Feature Demo ===

1. Opening a new document...
   Undo stack empty: true
   Available undos: 0

2. Starting to type "Stack"...
   Typing "S"
   Typing "t"
   Current state:
   - Last action: {"action":"typing","text":"t"}
   - Available undos: 2
```

#### TypeScript Undo Feature Demo
```
=== TypeScript Document Editor Undo Feature Demo ===

1. Opening a new document...
   Undo stack empty: true
   Available undos: 0

2. Starting to type "Stack"...
   Typing "S"
   Typing "t"
   Current state:
   - Last action: {"action":"typing","text":"S","position":0,"timestamp":"..."}
   - Available undos: 2
```

#### Decimal to Binary Converter
```
=== Decimal to Binary Converter Demo ===

Example 1:
Converting 10 to binary:
Step-by-step division by 2:
10 ÷ 2 = 5 remainder 0
5 ÷ 2 = 2 remainder 1
2 ÷ 2 = 1 remainder 0
1 ÷ 2 = 0 remainder 1

Result: 10 (decimal) = 1010 (binary)
```

#### Base Converter
```
=== Decimal to Any Base Converter Demo ===

Converting 42 to different bases:
Binary       (base  2): 101010
Octal        (base  8): 52
Hexadecimal  (base 16): 2A
Ternary      (base  3): 1120
```

## Key Learning Points

### JavaScript vs TypeScript Implementation

**JavaScript Benefits:**
- Simple and straightforward implementation
- No compilation step required
- Familiar syntax for beginners
- Direct execution with Node.js

**TypeScript Benefits:**
- **Type Safety**: Prevents runtime errors through compile-time checking
- **Generics**: `Stack<T>` allows reuse with different data types while maintaining type safety
- **Interfaces**: Define clear contracts for complex data structures
- **Enums**: Prevent typos and ensure consistency in action types
- **Better IDE Support**: Enhanced autocomplete, refactoring, and error detection
- **Self-Documenting Code**: Type annotations serve as inline documentation

### Why Stacks Work for These Problems

1. **Undo Feature**: Recent actions need to be undone first → LIFO behavior
2. **Number Conversion**: Division algorithm produces digits in reverse order → Stack naturally reverses them
3. **Order Reversal**: Whenever you need to process items in reverse order of generation

### Real-World Applications

- **Function call management** (call stack)
- **Expression evaluation** (parentheses matching, infix to postfix)
- **Browser navigation** (back button)
- **Syntax parsing** in compilers
- **Backtracking algorithms** (maze solving, tree traversal)

## Code Structure

### JavaScript Examples
- **Modern JavaScript**: Uses `const`, `let`, arrow functions
- **Node.js compatible**: CommonJS modules (`require`/`module.exports`)
- **Self-contained**: Each file can run independently
- **Well-documented**: Extensive comments explaining the logic
- **Demonstrative**: Shows step-by-step execution with visual output

### TypeScript Examples
- **Type-safe**: Generic classes and interfaces prevent runtime errors
- **Comprehensive validation**: Input validation with type guards
- **Error handling**: Structured error handling with typed return objects
- **Real-world examples**: Practical applications like RGB-to-hex conversion
- **Performance monitoring**: Built-in timing and verification
- **ES6 modules**: Uses `import`/`export` syntax for modern module systems

## Exercises to Try

### JavaScript Exercises
1. **Extend the undo feature** to handle redo functionality (hint: use a second stack)
2. **Implement balanced parentheses checker** using stacks
3. **Create a calculator** that evaluates postfix expressions
4. **Build a simple browser history** simulator with back/forward buttons
5. **Implement function call tracing** showing the call stack

### TypeScript Exercises
1. **Create a type-safe calculator** with operation enums and result interfaces
2. **Build a generic undo/redo system** that works with any action type
3. **Implement a stack-based expression evaluator** with operator precedence types
4. **Create a typed browser history** with URL validation and navigation interfaces
5. **Build a call stack tracer** with function signature types and timing metrics

### Advanced Challenges
1. **Compare performance** between JavaScript and TypeScript implementations
2. **Create hybrid implementations** that use both approaches
3. **Build a stack visualizer** that shows the data structure graphically
4. **Implement stack persistence** with serialization and deserialization

## Next Steps

After mastering stacks, you'll be ready for:
- **Queues** (Chapter 5) - First-In-First-Out data structures
- **Recursion** - Understanding the implicit call stack
- **Tree traversal** - Using stacks for depth-first search
- **Advanced algorithms** - Backtracking and parsing

---

**Remember**: Stacks are fundamental to many algorithms and system designs. Understanding LIFO behavior will help you recognize when stacks are the right tool for the job!