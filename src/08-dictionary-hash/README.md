# Chapter 8 – Dictionaries and Hashes

This folder contains runnable code examples for **Chapter 8** of the book ["Learning JavaScript Data Structures and Algorithms - Fourth Edition"](https://www.packtpub.com/) by **Packt Publishing**.

The examples demonstrate dictionaries (maps) and hash tables, including collision handling techniques like separate chaining and linear probing.

## What are Dictionaries and Hash Tables?

A **dictionary** (also known as a map) is a collection of key-value pairs where each key is unique. It allows efficient lookup, insertion, and deletion of values by their associated keys.

A **hash table** is a specialized implementation of a dictionary that uses a **hash function** to compute an index into an array of buckets, from which the desired value can be found.

### Real-world Analogies
- **Dictionary**: A phone book (name → phone number)
- **Hash Table**: An email address book (contact name → email mapped via hash function)
- **Language Translation**: English word → Spanish translation

## Files

### JavaScript Implementation (`js/` folder)

| File | Description |
|------|-------------|
| `dictionary.js` | Complete Dictionary class implementation with all essential methods |
| `01-using-dictionary-class.js` | Language translation example demonstrating dictionary usage |
| `hash-table.js` | Basic HashTable implementation (no collision handling) |
| `hash-table-separate-chaining.js` | HashTable with separate chaining for collision resolution |
| `hash-table-linear-probing.js` | HashTable with linear probing and rehashing for collision resolution |
| `02-integer-to-roman.js` | LeetCode problem: Integer to Roman numeral conversion |
| `03-weakmap-weakset-examples.js` | WeakMap and WeakSet usage patterns and examples |

### TypeScript Implementation (`ts/` folder)

| File | Description |
|------|-------------|
| `dictionary.ts` | Generic Dictionary class with TypeScript type safety |
| `hash-table.ts` | Generic HashTable with typed keys and values |
| `hash-table-separate-chaining.ts` | Type-safe separate chaining implementation |
| `hash-table-linear-probing.ts` | Type-safe linear probing implementation |
| `02-integer-to-roman.ts` | Integer to Roman with full TypeScript typing |

## Dictionary Operations

| Method | Description | Time Complexity |
|--------|-------------|-----------------|
| `set(key, value)` | Add or update a key-value pair | O(1) |
| `get(key)` | Retrieve value by key | O(1) |
| `hasKey(key)` | Check if key exists | O(1) |
| `remove(key)` | Remove a key-value pair | O(1) |
| `size` | Get number of elements | O(1) |
| `keys()` | Get all keys | O(n) |
| `values()` | Get all values | O(n) |
| `forEach(callback)` | Iterate over all entries | O(n) |

## Hash Table Operations

| Method | Description | Time Complexity |
|--------|-------------|-----------------|
| `put(key, value)` | Add or update a key-value pair | O(1)* |
| `get(key)` | Retrieve value by key | O(1)* |
| `remove(key)` | Remove a key-value pair | O(1)* |
| `hash(key)` | Compute hash code for a key | O(k) where k = key length |

*Average case with good hash function; worst case is O(n) with many collisions.

## Collision Handling Techniques

### Separate Chaining
Each bucket holds a linked list of key-value pairs. Collisions are resolved by adding to the list.

**Pros:**
- No data loss during collisions
- Simple implementation
- Dynamic sizing

**Cons:**
- Extra memory for linked list pointers
- Not cache-friendly

### Linear Probing
All entries stored directly in the array. Collisions resolved by finding next empty slot.

**Pros:**
- Space efficient
- Better cache performance

**Cons:**
- Can cause clustering
- Complex removal (requires rehashing)

## Hash Functions

### Lose-Lose (Educational)
Simple sum of ASCII values, prone to collisions. Used in examples to demonstrate collision handling.

```javascript
hash = (sum of char codes) % 37
```

### DJB2 (Production-ready)
Better distribution, fewer collisions. Recommended for real applications.

```javascript
hash = 5381
for each char: hash = (hash * 33) + charCode
return hash % 1013
```

## Running the Examples

> **Note**: Make sure you have followed the setup instructions in the [main repository README](../../README.md) before running these examples.

### Run JavaScript Examples

```bash
# Navigate to the project root
cd /path/to/Learning-JavaScript-Data-Structures-and-Algorithms---Fourth-Edition

# Run Dictionary demo
node src/08-dictionary-hash/js/dictionary.js

# Run translation example
node src/08-dictionary-hash/js/01-using-dictionary-class.js

# Run basic hash table demo
node src/08-dictionary-hash/js/hash-table.js

# Run separate chaining demo
node src/08-dictionary-hash/js/hash-table-separate-chaining.js

# Run linear probing demo
node src/08-dictionary-hash/js/hash-table-linear-probing.js

# Run Integer to Roman conversion
node src/08-dictionary-hash/js/02-integer-to-roman.js

# Run WeakMap/WeakSet examples
node src/08-dictionary-hash/js/03-weakmap-weakset-examples.js
```

### Run TypeScript Examples

```bash
# Run Dictionary demo
npx ts-node src/08-dictionary-hash/ts/dictionary.ts

# Run HashTable demo
npx ts-node src/08-dictionary-hash/ts/hash-table.ts

# Run separate chaining demo
npx ts-node src/08-dictionary-hash/ts/hash-table-separate-chaining.ts

# Run linear probing demo
npx ts-node src/08-dictionary-hash/ts/hash-table-linear-probing.ts

# Run Integer to Roman conversion
npx ts-node src/08-dictionary-hash/ts/02-integer-to-roman.ts
```

## LeetCode Problems

The following LeetCode problems can be solved using concepts from this chapter:

| Problem | Difficulty | Concept |
|---------|------------|---------|
| [12. Integer to Roman](https://leetcode.com/problems/integer-to-roman/) | Medium | Map/Dictionary lookup |
| [13. Roman to Integer](https://leetcode.com/problems/roman-to-integer/) | Easy | Map/Dictionary lookup |
| [1. Two Sum](https://leetcode.com/problems/two-sum/) | Easy | Hash map for complement storage |
| [242. Valid Anagram](https://leetcode.com/problems/valid-anagram/) | Easy | Character frequency counting |
| [705. Design HashSet](https://leetcode.com/problems/design-hashset/) | Easy | Hash table implementation |
| [706. Design HashMap](https://leetcode.com/problems/design-hashmap/) | Easy | Hash table implementation |

## Key Concepts

1. **Dictionary vs Hash Table**: Both store key-value pairs, but hash tables use hash functions to compute storage locations.

2. **Hash Function**: Converts keys to array indices. A good hash function distributes keys evenly.

3. **Collisions**: When two different keys produce the same hash value. Must be handled to prevent data loss.

4. **Load Factor**: Ratio of elements to buckets. High load factor increases collision probability.

5. **JavaScript Map**: Native ES6 class that provides dictionary functionality with guaranteed insertion order.

6. **WeakMap/WeakSet**: Special collections with weak references - keys can be garbage collected when no other references exist.

## Additional Resources

- [MDN: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [MDN: WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
- [Hash Function Design](https://en.wikipedia.org/wiki/Hash_function)
