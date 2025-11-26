# Chapter 2 – Big O Notation

This folder contains runnable code examples for **Chapter 2** of the book ["Learning JavaScript Data Structures and Algorithms - Fourth Edition"](https://www.packtpub.com/) by **Packt Publishing**.

The examples demonstrate algorithm complexity analysis using Big O notation through practical, hands-on demonstrations of different time complexities.

## What is Big O Notation?

Big O notation is a mathematical notation used to describe the performance or complexity of an algorithm. It specifically describes how the resource usage (typically time or space) scales as the size of the input grows.

Think of Big O as answering the question: **"If I double my input size, how much more work does my algorithm need to do?"**

## Why Big O Matters

- **Algorithm Selection**: Choose the right data structure or algorithm for your problem
- **Performance Prediction**: Understand how your code will behave with large datasets
- **Technical Interviews**: Big O analysis is a fundamental interview topic
- **Optimization**: Identify bottlenecks and opportunities for improvement
- **Scalability**: Build systems that perform well as data grows

## Files

### JavaScript Implementation (`js/` folder)
- **`01-constant-o1.js`** – O(1) examples: array access, arithmetic, constant-time operations
- **`02-logarithmic-ologn.js`** – O(log n) examples: binary search, guess the number, logarithmic scaling
- **`03-linear-on.js`** – O(n) examples: finding max, sum, linear search, filtering, string operations
- **`04-quadratic-on2.js`** – O(n²) examples: duplicate detection, bubble sort, selection sort, all pairs
- **`05-exercises.js`** – Chapter 2 exercises with detailed Big O analysis and solutions

### TypeScript Implementation (`ts/` folder)
- **`01-constant-o1.ts`** – Type-safe O(1) examples with generics and interfaces
- **`02-logarithmic-ologn.ts`** – Generic binary search with custom comparators
- **`03-linear-on.ts`** – Type-safe linear operations with predicates and transformations
- **`04-quadratic-on2.ts`** – Quadratic algorithms with proper typing and metrics
- **`05-exercises.ts`** – Exercises with TypeScript type safety and optimized solutions

## Common Time Complexities

| Notation | Name | Description | Example |
|----------|------|-------------|---------|
| **O(1)** | Constant | Same time regardless of input size | Array access, hash lookup |
| **O(log n)** | Logarithmic | Halves the problem with each step | Binary search |
| **O(n)** | Linear | Proportional to input size | Linear search, array iteration |
| **O(n log n)** | Linearithmic | Efficient sorting | Merge sort, quick sort |
| **O(n²)** | Quadratic | Nested loops over input | Bubble sort, naive pair comparison |
| **O(2^n)** | Exponential | Doubles with each additional input | Recursive Fibonacci (naive) |
| **O(n!)** | Factorial | Permutations | Traveling salesperson (brute force) |

### Growth Comparison

| Input (n) | O(1) | O(log n) | O(n) | O(n log n) | O(n²) | O(2^n) |
|-----------|------|----------|------|------------|-------|--------|
| 10 | 1 | ~3 | 10 | ~33 | 100 | 1,024 |
| 100 | 1 | ~7 | 100 | ~664 | 10,000 | ~1.3×10³⁰ |
| 1,000 | 1 | ~10 | 1,000 | ~9,966 | 1,000,000 | (enormous) |

**Key Insight**: O(1), O(log n), and O(n) scale well. O(n²) and worse become impractical for large datasets.

## Running the Examples

> **Note**: Make sure you have followed the setup instructions in the [main repository README](../../README.md) before running these examples.

### Run JavaScript Examples

```bash
# Navigate to the chapter directory
cd src/02-onotation

# Run individual examples
node js/01-constant-o1.js
node js/02-logarithmic-ologn.js
node js/03-linear-on.js
node js/04-quadratic-on2.js
node js/05-exercises.js
```

### Run TypeScript Examples

```bash
# Navigate to the chapter directory
cd src/02-onotation

# Run individual examples (ts-node is already configured)
npx ts-node ts/01-constant-o1.ts
npx ts-node ts/02-logarithmic-ologn.ts
npx ts-node ts/03-linear-on.ts
npx ts-node ts/04-quadratic-on2.ts
npx ts-node ts/05-exercises.ts
```

### Alternative: Use NPM Scripts

From the root directory, you can also use predefined npm scripts:

```bash
# JavaScript examples
npm run o1:js           # O(1) constant time demos
npm run ologn:js        # O(log n) logarithmic demos
npm run on:js           # O(n) linear demos
npm run on2:js          # O(n²) quadratic demos
npm run exercises:js    # Chapter 2 exercises

# TypeScript examples  
npm run o1:ts           # O(1) constant time demos
npm run ologn:ts        # O(log n) logarithmic demos
npm run on:ts           # O(n) linear demos
npm run on2:ts          # O(n²) quadratic demos
npm run exercises:ts    # Chapter 2 exercises
```

## Example Outputs

### O(1) - Constant Time Demo

```
=== O(1) - Constant Time Complexity Demo ===

Example 1: Array Access by Index
  Array with 3 elements, first element: 1
  Array with 1,000,000 elements, first element: 0
  ✓ Both operations take the same time (O(1))

Example 2: Getting Array Length
  Small array length: 3
  Large array length: 1000000
  ✓ Length lookup is instant regardless of size (O(1))
```

### O(log n) - Binary Search Demo

```
=== O(log n) - Logarithmic Time Complexity Demo ===

Example 1: Binary Search
  Searching for 23 in array of 16 elements
  Step 1: Checking index 7 (value: 15)
    Target is higher, searching right half (8 to 15)
  Step 2: Checking index 11 (value: 23)
  ✓ Found 23 at index 11 in 2 steps

Scalability demonstration:
  For 16 elements: max ~4 steps (log₂ 16 = 4)
  For 1,024 elements: max ~10 steps (log₂ 1,024 = 10)
  For 1,048,576 elements: max ~20 steps (log₂ 1,048,576 = 20)
  ✓ Doubling the data adds only 1 step!
```

### O(n) - Linear Search Demo

```
=== O(n) - Linear Time Complexity Demo ===

Example 1: Finding Maximum Value
  Starting with first element: 3
  Found new max: 7 (was 3)
  Found new max: 9 (was 7)
  ✓ Found maximum 9 after 7 comparisons
  Array size: 8, Comparisons: 7
  Ratio: 0.88 (approaches 1 for large n)
```

### O(n²) - Quadratic Complexity Demo

```
=== O(n²) - Quadratic Time Complexity Demo ===

Example 1: Finding Duplicates (Brute Force)
  Checking array of 7 elements for duplicates
  ✓ Found duplicate: 3 at indices 1 and 5
  Total comparisons: 11

How O(n²) grows with input size:

  Input (n) | Operations (n²) | Growth Factor
  ----------|-----------------|---------------
        10  |             100 | baseline
        20  |             400 | 4.0x
        50  |            2500 | 6.2x
       100  |           10000 | 4.0x
```

## Key Learning Points

### JavaScript vs TypeScript Implementation

**JavaScript Benefits:**
- Simple and straightforward
- No compilation step required
- Direct execution with Node.js
- Great for learning basics

**TypeScript Benefits:**
- **Type Safety**: Catch errors at compile time
- **Generics**: Reusable algorithms with `<T>` that work with any type
- **Interfaces**: Clear contracts for data structures
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Self-Documenting**: Types serve as inline documentation
- **Real-World Ready**: Same patterns used in production code

### Analyzing Algorithm Complexity

**Rules for Time Complexity:**
1. Basic operations (assignment, arithmetic) are O(1)
2. Loops multiply complexity - single loop = O(n), nested loops = O(n²)
3. Always consider worst-case scenario
4. Drop constants and non-dominant terms: O(2n) → O(n), O(n² + n) → O(n²)

**Rules for Space Complexity:**
1. Focus on auxiliary space (extra memory used by algorithm)
2. Variables and primitives are O(1)
3. Data structures scale with their size: array of n elements = O(n)
4. Recursive calls add to the call stack

### When to Use What

- **O(1)**: Ideal for all operations when possible
- **O(log n)**: Perfect for searching sorted data
- **O(n)**: Acceptable for most cases, unavoidable when processing all data
- **O(n log n)**: Good for efficient sorting (merge sort, quick sort)
- **O(n²)**: Use only for small datasets (n < 1000)
- **O(2^n), O(n!)**: Usually impractical; seek better algorithms

## Real-World Applications

### O(1) - Constant Time
- Hash table lookups
- Array access by index
- Stack push/pop
- Getting array length

### O(log n) - Logarithmic
- Binary search in sorted arrays
- Balanced tree operations (AVL, Red-Black trees)
- Finding elements in binary search trees
- Efficient exponentiation

### O(n) - Linear
- Finding min/max in unsorted array
- Calculating sum or average
- Linear search
- Array filtering and mapping

### O(n²) - Quadratic
- Simple sorting (bubble, selection, insertion)
- Checking all pairs of elements
- Naive duplicate detection
- Matrix operations

## Exercises to Try

### From the Chapter (see `05-exercises.*`)
1. **isEven** - Determine if array size is even (O(1))
2. **calculateSum** - Sum all array elements (O(n))
3. **hasCommonElements** - Find common values in two arrays (O(n²) naive, O(n) optimized)
4. **getOddNumbers** - Filter odd numbers (O(n) time, O(n) space)

### Additional Challenges

#### Beginner
1. Write a function to find the minimum value in an array
2. Count how many times a specific element appears
3. Check if an array is sorted
4. Reverse an array in place

#### Intermediate
5. Implement an optimized duplicate finder using a Set (improve from O(n²) to O(n))
6. Write a binary search function from scratch
7. Compare performance of O(n²) bubble sort vs O(n log n) native sort
8. Analyze space complexity of recursive vs iterative solutions

#### Advanced
9. Implement a function to find all pairs that sum to a target (optimize from O(n²) to O(n))
10. Build a performance benchmarking tool that measures actual runtime
11. Create visualizations showing how different complexities scale
12. Analyze the complexity of nested data structure operations

## Performance Tips

1. **Avoid nested loops** when possible - often a sign of O(n²)
2. **Use appropriate data structures**:
   - Hash tables/Maps/Sets for O(1) lookups
   - Arrays for ordered sequences
   - Binary search trees for sorted data with frequent insertions
3. **Sort once, search many times**: O(n log n) sorting + O(log n) searches beats O(n) linear searches when you search frequently
4. **Watch for hidden complexity**: Some built-in methods have their own complexity
   - `array.includes()` is O(n)
   - `array.sort()` is typically O(n log n)
   - `set.has()` is O(1)
5. **Space-time tradeoffs**: Sometimes using more memory (e.g., caching) can dramatically reduce time complexity

## Next Steps

After mastering Big O notation, you'll be ready for:
- **Arrays** (Chapter 3) - Analyzing array operation complexities
- **Stacks and Queues** (Chapters 4-5) - Understanding LIFO and FIFO complexities
- **Linked Lists** (Chapter 6) - Comparing with array performance
- **Sorting Algorithms** (Chapter 13) - Applying Big O to compare sorting methods
- **Searching Algorithms** (Chapter 14) - Binary search and more advanced techniques

## Resources

- **Book Chapter**: Read Chapter 2 for detailed explanations and theory
- **Big O Cheat Sheet**: [https://www.bigocheatsheet.com/](https://www.bigocheatsheet.com/)
- **Visualization Tools**: 
  - [https://visualgo.net](https://visualgo.net)
  - [https://algorithm-visualizer.org](https://algorithm-visualizer.org)

---

**Remember**: Understanding Big O notation is crucial for:
- Writing efficient code
- Making informed algorithm choices
- Succeeding in technical interviews
- Building scalable systems

The examples in this chapter provide hands-on demonstrations of how different algorithms scale. Run them, modify them, and experiment to build intuition for algorithm complexity!
