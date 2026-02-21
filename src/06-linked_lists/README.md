# Chapter 6: Linked Lists

This chapter explores linked list data structures, including singly linked lists, doubly linked lists, and circular linked lists. Linked lists are fundamental data structures that provide dynamic memory allocation and efficient insertion/deletion operations.

## Overview

Linked lists are linear data structures where elements are stored in nodes, and each node contains data and a reference (or pointer) to the next node in the sequence. Unlike arrays, linked list elements are not stored in contiguous memory locations, allowing for dynamic size and efficient memory usage.

### Key Concepts

- **Dynamic Size**: Linked lists can grow and shrink during runtime
- **Memory Efficiency**: Only allocates memory when needed
- **Flexible Insertion/Deletion**: Efficient operations at any position
- **Sequential Access**: Elements must be accessed in order from the head

### Types of Linked Lists

1. **Singly Linked List**: Each node points to the next node
2. **Doubly Linked List**: Each node has pointers to both next and previous nodes
3. **Circular Linked List**: The last node points back to the first node

## Real-World Applications

### Singly Linked Lists
- **Undo functionality** in text editors and applications
- **Browser history** (simplified version)
- **Music playlists** with sequential play
- **Task scheduling** in operating systems
- **Memory management** and garbage collection
- **Implementation of other data structures** (stacks, queues)

### Doubly Linked Lists
- **Browser navigation** (back and forward buttons)
- **Media players** with previous/next track navigation
- **Document editors** with cursor navigation
- **LRU (Least Recently Used) cache** implementations
- **Undo/Redo systems** with bidirectional navigation
- **Train carriages** where you can move in both directions

### Circular Linked Lists
- **Round-robin scheduling** in operating systems
- **Multiplayer turn-based games**
- **Circular buffers** and ring buffers
- **Josephus problem** solutions
- **Music playlist repeat modes**
- **Resource allocation** in distributed systems

## Time Complexity Analysis

| Operation | Singly Linked | Doubly Linked | Circular Linked |
|-----------|---------------|---------------|-----------------|
| Access/Search | O(n) | O(n) | O(n) |
| Insertion at head | O(1) | O(1) | O(n)* |
| Insertion at tail | O(n) | O(1) | O(n) |
| Insertion at position | O(n) | O(n) | O(n) |
| Deletion at head | O(1) | O(1) | O(n)* |
| Deletion at tail | O(n) | O(1) | O(n) |
| Deletion at position | O(n) | O(n) | O(n) |

*Note: Circular linked list operations marked with * are O(n) because we need to find the last node to update its reference.

## Implementation Files

### JavaScript Implementation (`js/` folder)

#### 1. Basic Linked List (`linked-list.js`)
- **LinkedListNode**: Basic node implementation
- **LinkedList**: Complete singly linked list with all standard operations
- **Features**: append, prepend, insert, remove, search, clear
- **Demonstrations**: Basic usage, error handling, performance examples

#### 2. Doubly Linked List (`doubly-linked-list.js`)
- **DoublyLinkedListNode**: Node with next and previous pointers
- **DoublyLinkedList**: Full implementation with bidirectional navigation
- **Features**: All basic operations plus reverse traversal, efficient tail operations
- **Demonstrations**: Forward/backward navigation, performance comparisons

#### 3. Circular Linked List (`circular-linked-list.js`)
- **CircularLinkedList**: Implementation using basic LinkedListNode
- **Features**: All standard operations plus rotation and circular traversal
- **Unique Operations**: rotate(), getCurrent(), traverse()
- **Demonstrations**: Round-robin simulation, infinite traversal examples

#### 4. Practical Example (`media-player-example.js`)
- **Track**: Represents a media file with metadata
- **MediaPlayer**: Complete media player using all three linked list types
- **Features**: Playlist management, queue system, recently played, shuffle/repeat modes
- **Real-world demonstration**: Shows practical usage patterns

### TypeScript Implementation (`ts/` folder)

All JavaScript implementations are recreated in TypeScript with:
- **Full type safety** with generics (`<T>`)
- **Interface definitions** for contracts
- **Enum types** for constants (AudioQuality, RepeatMode)
- **Comprehensive type checking** at compile time
- **Advanced features** like type predicates and conditional types

#### TypeScript-Specific Features
- **Generics**: `LinkedList<T>`, `DoublyLinkedList<T>`, `CircularLinkedList<T>`
- **Interfaces**: `ILinkedList<T>`, `ITrack`, `IMediaPlayer`
- **Enums**: `AudioQuality`, `RepeatMode`
- **Type safety**: Compile-time error prevention
- **Better IDE support**: Autocomplete, refactoring, error detection

## Getting Started

### Running JavaScript Examples

```bash
# Navigate to the js folder
cd src/06-linked_lists/js

# Run individual implementations
node linked-list.js
node doubly-linked-list.js
node circular-linked-list.js
node media-player-example.js
```

### Running TypeScript Examples

```bash
# Navigate to the ts folder  
cd src/06-linked_lists/ts

# Compile TypeScript files
tsc linked-list.ts
tsc doubly-linked-list.ts
tsc circular-linked-list.ts
tsc media-player-example.ts

# Run compiled JavaScript
node linked-list.js
node doubly-linked-list.js
node circular-linked-list.js
node media-player-example.js
```

## Code Examples

### Basic Usage

```javascript
// JavaScript Example
const { LinkedList } = require('./linked-list');

const list = new LinkedList();
list.append('First');
list.append('Second');
list.prepend('Zero');
console.log(list.toString()); // "Zero" -> "First" -> "Second"

// Remove and search
const removed = list.removeAt(1);
console.log(`Removed: ${removed}`); // Removed: First
console.log(list.indexOf('Second')); // 1
```

```typescript
// TypeScript Example
import { LinkedList } from './linked-list';

const numberList = new LinkedList<number>();
numberList.append(10);
numberList.append(20);
numberList.prepend(5);

// Type-safe operations
const firstNumber: number | undefined = numberList.get(0);
const evenNumbers = numberList.filter(x => x % 2 === 0);
```

### Doubly Linked List Usage

```javascript
const { DoublyLinkedList } = require('./doubly-linked-list');

const dlist = new DoublyLinkedList();
dlist.append('A');
dlist.append('B');
dlist.append('C');

console.log(dlist.toString());        // A <-> B <-> C
console.log(dlist.toStringReverse()); // C <-> B <-> A

// Efficient operations at both ends
const first = dlist.removeFirst();
const last = dlist.removeLast();
```

### Circular Linked List Usage

```javascript
const { CircularLinkedList } = require('./circular-linked-list');

const clist = new CircularLinkedList();
clist.append('A');
clist.append('B');
clist.append('C');

console.log(clist.toString()); // A -> B -> C -> (circular)

// Rotation (unique to circular lists)
console.log(clist.getCurrent()); // A
clist.rotate(2);
console.log(clist.getCurrent()); // C

// Infinite traversal simulation
clist.traverse(2, (data, index) => {
    console.log(`Position ${index}: ${data}`);
});
```

### Media Player Example

```javascript
const { MediaPlayer, Track } = require('./media-player-example');

const player = new MediaPlayer();
const track1 = new Track('Bohemian Rhapsody', 'Queen', 355, '/music/queen.mp3');
const track2 = new Track('Hotel California', 'Eagles', 391, '/music/eagles.mp3');

player.addToPlaylist(track1);
player.addToPlaylist(track2);
player.addToQueue(track1); // Priority play

player.playNext(); // Plays from queue first
player.toggleShuffle();
player.toggleRepeat();
player.showStatus();
```

## Advanced Features

### Functional Programming Support

Both JavaScript and TypeScript implementations include functional programming methods:

```javascript
// Map, filter, reduce operations
const numbers = new LinkedList();
[1, 2, 3, 4, 5].forEach(n => numbers.append(n));

const doubled = numbers.map(x => x * 2);
const evens = numbers.filter(x => x % 2 === 0);
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
```

### Custom Comparison Functions

```javascript
const people = new LinkedList();
people.append({ name: 'Alice', age: 30 });
people.append({ name: 'Bob', age: 25 });

// Custom comparison for objects
const found = people.remove(
    { name: 'Alice', age: 0 }, // age doesn't matter
    (a, b) => a.name === b.name
);
```

### TypeScript Generics

```typescript
// Type-safe collections
const stringList = new LinkedList<string>();
const numberList = new DoublyLinkedList<number>();
const trackList = new CircularLinkedList<ITrack>();

// Compile-time type checking
stringList.append("Hello"); // ✓ Valid
// stringList.append(123);   // ✗ Compile error
```

## Performance Considerations

### Memory Usage
- **Linked Lists**: O(n) space + pointer overhead
- **Arrays**: O(n) space, but contiguous and cache-friendly
- **Trade-off**: Dynamic sizing vs. memory locality

### When to Use Linked Lists
✅ **Good for**:
- Frequent insertions/deletions at the beginning
- Unknown or highly variable data size
- Implementing other data structures (stacks, queues)
- When you don't need random access

❌ **Avoid when**:
- Need frequent random access by index
- Memory is constrained (pointer overhead)
- Cache performance is critical
- Mostly read-only operations

### Optimization Tips
1. **Keep reference to tail** in singly linked lists for O(1) append
2. **Use doubly linked lists** when you need efficient removal at both ends
3. **Consider circular lists** for cyclic data or round-robin scenarios
4. **Batch operations** when possible to reduce traversal overhead

## Testing

Each implementation includes comprehensive demonstrations that verify:
- ✅ Basic operations (CRUD)
- ✅ Edge cases (empty lists, single elements)
- ✅ Error handling (invalid positions, empty operations)
- ✅ Performance characteristics
- ✅ Memory management
- ✅ Type safety (TypeScript)

Run the files directly to see the test output and verify correctness.

## Error Handling

All implementations include robust error handling:

```javascript
try {
    const list = new LinkedList();
    list.removeAt(0); // Empty list
} catch (error) {
    console.log(error.message); // "Cannot remove from an empty list."
}

try {
    list.removeAt(-1); // Invalid position
} catch (error) {
    console.log(error.message); // "Invalid position"
}
```

## Comparison with Arrays

| Aspect | Linked List | Array |
|--------|-------------|-------|
| Memory Layout | Non-contiguous | Contiguous |
| Access Time | O(n) | O(1) |
| Insertion at start | O(1) | O(n) |
| Insertion at end | O(n)/O(1)* | O(1)/O(n)** |
| Memory Overhead | High (pointers) | Low |
| Cache Performance | Poor | Good |
| Dynamic Size | Yes | No (in most languages) |

*O(1) with tail reference  
**O(n) when array needs to be resized

## Common Interview Questions

### Linked List Problems
1. **Reverse a linked list** (iterative and recursive)
2. **Detect cycle in a linked list** (Floyd's algorithm)
3. **Find the middle element** (two-pointer technique)
4. **Merge two sorted linked lists**
5. **Remove nth node from the end**
6. **Check if linked list is palindrome**

### Example Solution Patterns

```javascript
// Reverse a linked list
function reverseLinkedList(head) {
    let prev = null;
    let current = head;
    
    while (current) {
        const next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }
    
    return prev; // New head
}

// Detect cycle using Floyd's algorithm
function hasCycle(head) {
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) {
            return true; // Cycle detected
        }
    }
    
    return false;
}
```

## Best Practices

### Design Guidelines
1. **Always check for null/undefined** before accessing node properties
2. **Maintain size counter** for O(1) size operations
3. **Provide both position-based and value-based operations**
4. **Include comprehensive error handling**
5. **Use tail reference** for efficient append operations

### Code Quality
1. **Use meaningful variable names** (current, previous, nodeToRemove)
2. **Include detailed documentation** for complex operations
3. **Provide usage examples** and demonstrations
4. **Test edge cases** thoroughly
5. **Follow consistent naming conventions**

### TypeScript Specific
1. **Use generics** for type flexibility
2. **Define clear interfaces** for contracts
3. **Leverage enums** for constants
4. **Provide proper return types** for all methods
5. **Use type guards** where appropriate

## Further Reading

### Theoretical Background
- **Knuth's "The Art of Computer Programming"** - Volume 1, Chapter 2
- **Cormen et al. "Introduction to Algorithms"** - Chapter 10
- **Sedgewick "Algorithms in C"** - Chapter 3

### Advanced Topics
- **Lock-free linked lists** for concurrent programming
- **Skip lists** for probabilistic data structures
- **XOR linked lists** for memory-efficient doubly linked lists
- **Persistent linked lists** for functional programming

### Related Data Structures
- **Stacks and Queues** (Chapter 4) - Often implemented using linked lists
- **Hash Tables** (Chapter 8) - Use linked lists for collision resolution
- **Trees** (Chapter 9) - Share similar pointer-based structure
- **Graphs** (Chapter 12) - Adjacency lists are linked list applications

## Conclusion

Linked lists are fundamental data structures that provide the foundation for understanding more complex data structures. While they may not be the most efficient choice for all scenarios, they excel in situations requiring dynamic memory allocation and frequent insertions/deletions.

The three types of linked lists covered in this chapter each have their specific use cases:
- **Singly linked lists** for simple sequential access
- **Doubly linked lists** for bidirectional navigation
- **Circular linked lists** for cyclic data and round-robin scenarios

The practical media player example demonstrates how these different types of linked lists can be combined to create a real-world application, showcasing the power and flexibility of these data structures.

Understanding linked lists is essential for any programmer, as they form the building blocks for many other data structures and algorithms in computer science.