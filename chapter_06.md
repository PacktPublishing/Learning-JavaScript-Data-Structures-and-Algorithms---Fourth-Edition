# Chapter 6: Linked Lists

In the previous chapters, we looked at data structures stored sequentially in memory. Now, we'll examine linked lists - a dynamic and linear data structure with a different memory arrangement.

This chapter covers:
* The linked list data structure and how it works
* Adding and removing elements from linked lists
* Variations: doubly linked lists, circular linked lists, and sorted linked lists
* Using linked lists to implement other data structures
* A practical example: building a media player with linked lists

## Understanding the Linked List Data Structure

Arrays are common in almost every programming language. They let us store collections of elements and access them using bracket notation ([]). But arrays have a key limitation: their fixed size in most languages. When you insert or remove elements from the beginning or middle of an array, all remaining elements must shift positions. JavaScript provides methods to handle this, but the shifting process still happens behind the scenes, which affects performance.

Linked lists also store elements in sequence, but unlike arrays, they don't require contiguous memory locations. Instead, linked lists store elements as nodes scattered throughout memory. Each node contains two parts:
* The data (the information we want to store)
* A reference (called a pointer or link) that points to the next node in the sequence

Here's how a linked list structure looks:

<p align="center">
  <img src="../images/B22494_06_01.png">
</p>

_Figure 6.1: The structure of a linked list data structure with nodes, data and pointers_


The first node is called the **head**, and the last node points to `null` (or `undefined`) to mark the end of the list.

### Advantages and Disadvantages

Linked lists offer a key advantage over arrays: you can insert or remove elements without shifting other items. This flexibility comes with trade-offs. You need pointers, which require careful implementation. While arrays allow direct access to elements at any position, linked lists require traversal from the head to reach elements in the middle.

Linked lists are not ideal when you need to access elements by their index (like arrays do). You must traverse the list from the beginning, which can be slower. Linked lists also use additional memory because each node stores extra pointer information.

### Real-World Applications

Linked lists handle dynamic data efficiently in many real-world scenarios. Media players use linked lists to organize playlists. Adding, removing, and rearranging songs or videos become straightforward operations with a linked list structure:

<p align="center">
  <img src="../images/B22494_06_02.png">
</p>

_Figure 6.2: A media player representation using linked list as data structure_

### Types of Linked Lists

There are different types of linked lists:
* **Singly Linked List**: Each node has a pointer to the next node
* **Doubly Linked List**: Each node has pointers to both the next and previous nodes
* **Circular Linked List**: The last node points back to the head, forming a loop

We'll cover all these variations in this chapter, starting with the basic singly linked list.

## Creating the LinkedList Class

Let's implement our own linked list data structure. We'll create two classes: one for the nodes and one for the list itself.

First, we define a `LinkedListNode` class for each element in our linked list:

```javascript
class LinkedListNode {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}
```

Each node holds the data we want to store and a reference to the next node. By default, a new node's `next` pointer is set to `null`. The constructor also lets you specify the next node if you know it beforehand.

Next, we declare the `LinkedList` class:

```javascript
class LinkedList {
    #head;
    #size = 0;
    
    // methods will go here
}
```

This class uses a private `#head` reference pointing to the first node in the list. We also maintain a private `#size` variable to track the number of elements without traversing the entire list each time. Both properties are private (using the `#` prefix) to ensure proper encapsulation.

The `LinkedList` class will provide these methods:
* `append(data)`: adds a new node at the end of the list
* `prepend(data)`: adds a new node at the beginning of the list
* `insert(data, position)`: inserts a new node at a specific position
* `removeAt(position)`: removes the node at a specific position
* `remove(data)`: removes the first node containing the specified data
* `indexOf(data)`: returns the index of the first node with the specified data, or -1 if not found
* `isEmpty()`: returns true if the list is empty
* `clear()`: removes all elements from the list
* `size`: returns the number of elements in the list
* `toString()`: returns a string representation of the list

## Appending Elements to the End of the Linked List

When adding an element at the end of a linked list, we face two scenarios:
* **Empty list**: no existing elements, we're adding the first one
* **Non-empty list**: the list already contains elements, we're adding to the end

Here's the `append` method implementation:

```javascript
append(data) {
    const newNode = new LinkedListNode(data);
    
    if (!this.#head) {
        this.#head = newNode;
    } else {
        let current = this.#head;
        while (current.next !== null) {
            current = current.next;
        }
        current.next = newNode;
    }
    this.#size++;
}
```

The first step is always creating a new node to hold the data.

For an empty list, we check if `this.#head` is null. If it is, the new node becomes the head. Its `next` pointer remains null since it's the only node.

For a non-empty list, we need to traverse to the end:
1. Start with a `current` variable pointing to the head
2. Use a while loop to move through nodes until `current.next` is null
3. Set `current.next` to our new node
4. Increment the size

This process ensures the new node is always added at the end.

## Prepending a New Element to the Linked List

Adding an element at the beginning (head) of the linked list is simpler than appending:

```javascript
prepend(data) {
    const newNode = new LinkedListNode(data, this.#head);
    this.#head = newNode;
    this.#size++;
}
```

Here's what happens:
1. Create a new node with the data and set its `next` pointer to the current head
2. Update the head to point to the new node
3. Increment the size

If the list is empty, the current head is null, so the new node's `next` reference becomes null. The entire list adjusts seamlessly because the new node is already linked to the previous head.

## Inserting a New Element at a Specific Position

To insert an element at any position within the linked list, we need an `insert` method that takes both the data and the desired position:

```javascript
insert(data, position) {
    if (this.#isInvalidPosition(position)) {
        return false;
    }
    
    const newNode = new LinkedListNode(data);
    
    if (position === 0) {
        this.prepend(data);
        return true;
    }
    
    let current = this.#head;
    let previous = null;
    let index = 0;
    
    while (index++ < position) {
        previous = current;
        current = current.next;
    }
    
    newNode.next = current;
    previous.next = newNode;
    this.#size++;
    return true;
}
```

First, we verify the position is valid using a helper method:

```javascript
#isInvalidPosition(position) {
    return position < 0 || position > this.#size;
}
```

If the position is 0, we simply call the `prepend` method.

For other positions, we traverse the list:
1. Use `current` to track the node at the insertion point
2. Use `previous` to track the node before the insertion point
3. Move through the list until we reach the desired position
4. Set `newNode.next` to `current` (the node originally at this position)
5. Set `previous.next` to `newNode` (linking the new node into the list)

It's crucial to maintain references to the nodes we need so we don't lose links between nodes. Using two variables makes it easier to control these connections.

## Finding the Position of an Element

The `indexOf` method searches for a particular element and returns its position:

```javascript
indexOf(data, compareFunction = (a, b) => a === b) {
    let current = this.#head;
    let index = 0;
    
    while (current) {
        if (compareFunction(current.data, data)) {
            return index;
        }
        index++;
        current = current.next;
    }
    return -1;
}
```

We start with `current` pointing to the head and `index` at 0. The while loop continues until we reach the end of the list. In each iteration, we check if the current node's data matches what we're looking for.

We can pass a custom comparison function to handle complex data types. This function takes two arguments and returns true if they match. By default, we use simple equality comparison.

Using a comparison function is standard practice in programming languages. You could also set this function in the constructor to use it throughout the class.

If we don't find the element, we return -1 (an industry convention for "not found").

The `indexOf` method is useful for searching and will help us implement element removal.

## Removing an Element from a Specific Position

Removing elements from a linked list involves two main scenarios: removing the first element (head) and removing any other element.

Here's the main `removeAt` method:

```javascript
removeAt(position) {
    if (this.#size === 0) {
        throw new RangeError('Cannot remove from an empty list.');
    }
    
    if (this.#isInvalidPosition(position)) {
        throw new RangeError('Invalid position');
    }
    
    if (position === 0) {
        return this.#removeFromHead();
    }
    
    return this.#removeFromMiddleOrEnd(position);
}
```

We check for an empty list and invalid positions first. Then we handle two scenarios separately for better organization.

### Removing from the Head

The `#removeFromHead` method handles removing the first element:

```javascript
#removeFromHead() {
    const nodeToRemove = this.#head;
    this.#head = this.#head.next;
    this.#size--;
    return nodeToRemove.data;
}
```

We store a reference to the current head, shift the head pointer to the next node, decrease the size, and return the removed data. This effectively disconnects the original head from the list.

### Removing from the Middle or End

For any position other than 0, we use this method:

```javascript
#removeFromMiddleOrEnd(position) {
    let nodeToRemove = this.#head;
    let previous;
    
    for (let index = 0; index < position; index++) {
        previous = nodeToRemove;
        nodeToRemove = nodeToRemove.next;
    }
    
    // unlink the node to be removed
    previous.next = nodeToRemove.next;
    this.#size--;
    return nodeToRemove.data;
}
```

We traverse the list to find the node to remove. Here we use a for loop instead of a while loop to show different approaches work.

We keep two variables: `nodeToRemove` (starting at the head) and `previous`. At each iteration, we move `previous` to the current node and advance `nodeToRemove` to the next node.

When we reach the target position, `previous` points to the node before the one we want to remove, and `nodeToRemove` points to the target node. We set `previous.next` to skip over the target node, effectively removing it.

This logic also works for the last element. When removing the last node, `nodeToRemove.next` is null, and setting `previous.next` to null automatically unlinks the last element.

## Searching and Removing an Element from the Linked List

Sometimes we need to remove an element without knowing its exact position. We need a method that searches by data value and then removes the element:

```javascript
remove(data, compareFunction = (a, b) => a === b) {
    const index = this.indexOf(data, compareFunction);
    if (index === -1) {
        return null;
    }
    return this.removeAt(index);
}
```

This method uses our existing `indexOf` method to find the element's position. If the element isn't found (index is -1), we return null. Otherwise, we call `removeAt` to remove the node at that position.

## Utility Methods: isEmpty, size, and clear

These methods provide fundamental operations for managing the linked list:

```javascript
isEmpty() {
    return this.#size === 0;
}

get size() {
    return this.#size;
}

clear() {
    this.#head = null;
    this.#size = 0;
}
```

* `isEmpty`: checks if the list is empty by comparing size to zero
* `size`: returns the current number of elements (using a getter for clean syntax)
* `clear`: empties the list by setting head to null and size to 0

## Converting the Linked List to a String

The `toString` method provides a string representation of the list for debugging and display:

```javascript
toString() {
    let current = this.#head;
    let objString = '';
    
    while (current) {
        objString += this.#elementToString(current.data);
        current = current.next;
        if (current) {
            objString += ', ';
        }
    }
    return objString;
}
```

We traverse the list from head to tail, converting each element to a string and concatenating them with commas. The `#elementToString` helper method (from previous chapters) handles the conversion of data to string format.

We create a while loop to iterate through each node. For each node, we convert the data to a string and add it to our result. We move to the next node and add a comma separator if there are more nodes to process.

## Doubly Linked Lists

A doubly linked list differs from a singly linked list by having links in both directions. Each node has pointers to both the next and previous nodes:

```
null <- [Prev|Data|Next] <-> [Prev|Data|Next] <-> [Prev|Data|Next] -> null
            ^                                                   ^
          Head                                                Tail
```

Doubly linked lists enable efficient traversal in both directions and make certain operations more efficient.

### When to Use Doubly Linked Lists

Doubly linked lists work well when you need:
* Bidirectional traversal (moving forward and backward through data)
* Efficient insertion and removal at both ends
* Implementation of data structures like deques (double-ended queues)
* Undo/redo functionality in applications

### DoublyLinkedListNode Class

First, we define a node class for doubly linked lists:

```javascript
class DoublyLinkedListNode {
    constructor(data, next = null, previous = null) {
        this.data = data;
        this.next = next;
        this.previous = previous;
    }
}
```

Each node maintains two references:
* `next`: points to the next node in the list
* `previous`: points to the previous node in the list

Both pointers default to null, allowing flexible node creation.

### DoublyLinkedList Class

The main class tracks both head and tail:

```javascript
class DoublyLinkedList {
    #head;
    #tail;
    #size = 0;
    
    // methods go here
}
```

Tracking both ends enables efficient operations at either end of the list. When inserting or removing nodes, we must carefully update both `next` and `previous` pointers to maintain proper links.

### Appending to a Doubly Linked List

Adding elements to the end of a doubly linked list is similar to singly linked lists, but we manage two pointers:

```javascript
append(data) {
    const newNode = new DoublyLinkedListNode(data);
    
    if (!this.#head) { // empty list
        this.#head = newNode;
        this.#tail = newNode;
    } else { // non-empty list
        newNode.previous = this.#tail;
        this.#tail.next = newNode;
        this.#tail = newNode;
    }
    this.#size++;
}
```

For an empty list, the new node becomes both head and tail. For a non-empty list, we:
1. Set the new node's `previous` pointer to the current tail
2. Set the current tail's `next` pointer to the new node
3. Update the tail reference to the new node

The order of these operations matters. If we update the tail reference too early, we lose the connection to the original last node.

### Prepending to a Doubly Linked List

Adding elements at the beginning works similarly:

```javascript
prepend(data) {
    const newNode = new DoublyLinkedListNode(data);
    
    if (!this.#head) { // empty list
        this.#head = newNode;
        this.#tail = newNode;
    } else { // non-empty list
        newNode.next = this.#head;
        this.#head.previous = newNode;
        this.#head = newNode;
    }
    this.#size++;
}
```

For an empty list, the behavior matches the append method. For a non-empty list, we:
1. Set the new node's `next` pointer to the current head
2. Set the current head's `previous` pointer to the new node
3. Update the head reference to the new node

### Inserting at Any Position

Insertion at arbitrary positions requires checking for special cases:

```javascript
insert(data, position) {
    if (this.#isInvalidPosition(position)) {
        return false;
    }
    
    if (position === 0) { // first position
        this.prepend(data);
        return true;
    }
    
    if (position === this.#size) { // last position
        this.append(data);
        return true;
    }
    
    // middle position
    return this.#insertInTheMiddle(data, position);
}
```

We handle three cases: insertion at the head, at the tail, and in the middle. Checking for head and tail positions avoids unnecessary traversal.

For middle positions:

```javascript
#insertInTheMiddle(data, position) {
    const newNode = new DoublyLinkedListNode(data);
    let currentNode = this.#head;
    let previousNode;
    
    for (let index = 0; index < position; index++) {
        previousNode = currentNode;
        currentNode = currentNode.next;
    }
    
    newNode.next = currentNode;
    newNode.previous = previousNode;
    currentNode.previous = newNode;
    previousNode.next = newNode;
    
    this.#size++;
    return true;
}
```

We traverse to the insertion position, then update four pointers:
1. Set `newNode.next` to `currentNode`
2. Set `newNode.previous` to `previousNode`
3. Set `currentNode.previous` to `newNode`
4. Set `previousNode.next` to `newNode`

These steps insert the new node between the existing nodes while maintaining all links.

### Removing from a Doubly Linked List

Removal requires handling three scenarios:

```javascript
removeAt(position) {
    if (this.#size === 0) {
        throw new RangeError('Cannot remove from an empty list.');
    }
    
    if (this.#isInvalidPosition(position)) {
        throw new RangeError('Invalid position.');
    }
    
    if (position === 0) {
        return this.#removeFromHead();
    }
    
    if (position === this.#size - 1) {
        return this.#removeFromTail();
    }
    
    return this.#removeFromMiddle(position);
}
```

#### Removing from the Head

```javascript
#removeFromHead() {
    const nodeToRemove = this.#head;
    this.#head = nodeToRemove.next;
    
    if (this.#head) {
        this.#head.previous = null;
    } else {
        this.#tail = null; // List becomes empty
    }
    
    this.#size--;
    nodeToRemove.next = null;
    return nodeToRemove.data;
}
```

We move the head to the next node and set the new head's `previous` pointer to null. If the list becomes empty, we also set the tail to null.

#### Removing from the Tail

```javascript
#removeFromTail() {
    const nodeToRemove = this.#tail;
    this.#tail = nodeToRemove.previous;
    
    if (this.#tail) {
        this.#tail.next = null;
    } else {
        this.#head = null; // List becomes empty
    }
    
    this.#size--;
    nodeToRemove.previous = null;
    return nodeToRemove.data;
}
```

We move the tail to the previous node and set the new tail's `next` pointer to null. If the list becomes empty, we also set the head to null.

#### Removing from the Middle

```javascript
#removeFromMiddle(position) {
    let nodeToRemove = this.#head;
    let previousNode;
    
    for (let index = 0; index < position; index++) {
        previousNode = nodeToRemove;
        nodeToRemove = nodeToRemove.next;
    }
    
    previousNode.next = nodeToRemove.next;
    nodeToRemove.next.previous = previousNode;
    
    nodeToRemove.next = null;
    nodeToRemove.previous = null;
    
    this.#size--;
    return nodeToRemove.data;
}
```

We traverse to the target position and update the surrounding nodes' pointers to skip the removed node. We also clean up the removed node's pointers.

## Circular Linked Lists

A circular linked list is a variation where the last node points back to the first node instead of null. This creates a continuous loop structure.

In a singly circular linked list:
```
[Data|Next] -> [Data|Next] -> [Data|Next] -
    ^                                     |
    |_____________________________________|
```

In a doubly circular linked list, the head's `previous` pointer also points to the tail.

### When to Use Circular Linked Lists

Circular linked lists work well for:
* Round-robin scheduling algorithms
* Multiplayer games where turns cycle through players
* Music playlists that repeat continuously
* Buffer implementations that wrap around

### CircularLinkedList Class

We can reuse the `LinkedListNode` structure:

```javascript
class CircularLinkedList {
    #head;
    #size = 0;
    
    // methods go here
}
```

The circular nature affects how we implement operations, especially traversal conditions.

### Appending to a Circular Linked List

```javascript
append(data) {
    const newNode = new LinkedListNode(data);
    
    if (!this.#head) { // empty list
        this.#head = newNode;
        newNode.next = this.#head; // points to itself
    } else { // non-empty list
        let current = this.#head;
        while (current.next !== this.#head) {
            current = current.next;
        }
        current.next = newNode;
        newNode.next = this.#head; // circular reference
    }
    this.#size++;
}
```

For an empty list, the new node becomes the head and points to itself. For a non-empty list, we find the last node (whose `next` points to the head) and link it to the new node. The new node then points back to the head.

### Prepending to a Circular Linked List

```javascript
prepend(data) {
    const newNode = new LinkedListNode(data, this.#head);
    
    if (!this.#head) {
        this.#head = newNode;
        newNode.next = this.#head; // make it circular
    } else {
        // Find the last node
        let current = this.#head;
        while (current.next !== this.#head) {
            current = current.next;
        }
        current.next = newNode;
        this.#head = newNode;
    }
    this.#size++;
}
```

We create the new node with its `next` pointing to the current head. For a non-empty list, we find the last node and update its `next` pointer to the new node. The new node becomes the new head.

### Removing from a Circular Linked List

Removal requires special handling to maintain the circular structure.

#### Removing from the Head

```javascript
#removeFromHead() {
    const nodeToRemove = this.#head;
    let lastNode = this.#head;
    
    while (lastNode.next !== this.#head) { // Find the last node
        lastNode = lastNode.next;
    }
    
    this.#head = nodeToRemove.next; // skip the head
    lastNode.next = this.#head; // make it circular
    
    if (this.#size === 1) { // only one node
        this.#head = null;
    }
    
    this.#size--;
    return nodeToRemove.data;
}
```

We find the last node (which points to the current head) and update it to point to the new head. If there was only one node, the list becomes empty.

#### Removing from the Tail

```javascript
#removeFromTail() {
    if (this.#head.next === this.#head) { // single node case
        const nodeToRemove = this.#head;
        this.#head = null;
        this.#size--;
        return nodeToRemove.data;
    } else {
        let lastNode = this.#head;
        let previousNode = null;
        
        while (lastNode.next !== this.#head) { // Find the last node
            previousNode = lastNode;
            lastNode = lastNode.next;
        }
        
        previousNode.next = this.#head; // skip the last node to remove it
        
        this.#size--;
        return lastNode.data;
    }
}
```

For a single node, we simply set the head to null. For multiple nodes, we find the last node and the second-to-last node, then update the second-to-last node to point to the head.

## Creating a Media Player Using a Linked List

Let's build a practical application to demonstrate linked lists: a media player with playlist functionality. This project will use a doubly circular linked list and implement ordered insertion.

### Features

Our media player will have these features:
* **Ordered song insertion**: add songs alphabetically by title
* **Sequential playback**: play songs in order
* **Navigation**: move to previous or next song
* **Continuous repeat**: loop the playlist automatically

### MediaPlayerSong Class

First, we define a node structure for songs:

```javascript
class MediaPlayerSong {
    constructor(songTitle) {
        this.songTitle = songTitle;
        this.previous = null;
        this.next = null;
    }
}
```

Each song node stores the title and references to the previous and next songs. In a real application, this would include additional metadata like artist, duration, and file path.

### MediaPlayer Class

The main player class manages the playlist:

```javascript
class MediaPlayer {
    #firstSong;
    #lastSong;
    #size = 0;
    #playingSong;
    
    // methods go here
}
```

The class maintains:
* `#firstSong`: reference to the first song in the playlist
* `#lastSong`: reference to the last song in the playlist
* `#size`: count of songs in the playlist
* `#playingSong`: reference to the currently playing song

### Adding Songs in Alphabetical Order

The `addSongByTitle` method performs sorted insertion:

```javascript
addSongByTitle(newSongTitle) {
    const newSong = new MediaPlayerSong(newSongTitle);
    
    if (this.#size === 0) { // empty list
        this.#insertEmptyPlayList(newSong);
    } else {
        const position = this.#findIndexOfSortedSong(newSongTitle);
        if (position === 0) { // insert at the beginning
            this.#insertAtBeginning(newSong);
        } else if (position === this.#size) { // insert at the end
            this.#insertAtEnd(newSong);
        } else { // insert in the middle
            this.#insertInMiddle(newSong, position);
        }
    }
    this.#size++;
}
```

The method handles different insertion scenarios based on the alphabetical position of the new song.

#### Finding the Insertion Position

```javascript
#findIndexOfSortedSong(newSongTitle) {
    let currentSong = this.#firstSong;
    let i = 0;
    
    for (; i < this.#size && currentSong; i++) {
        const currentSongTitle = currentSong.songTitle;
        if (this.#compareSongs(currentSongTitle, newSongTitle) >= 0) {
            return i;
        }
        currentSong = currentSong.next;
    }
    return i;
}
```

We traverse the list comparing song titles until we find the correct insertion point.

#### Comparing Songs

```javascript
#compareSongs(songTitle1, songTitle2) {
    return songTitle1.localeCompare(songTitle2);
}
```

The `localeCompare` method provides locale-aware string comparison:
* Negative number: `songTitle1` comes before `songTitle2`
* 0: titles are equal
* Positive number: `songTitle1` comes after `songTitle2`

#### Insertion Methods

For an empty playlist:

```javascript
#insertEmptyPlayList(newSong) {
    this.#firstSong = newSong;
    this.#lastSong = newSong;
    newSong.next = newSong; // points to itself
    newSong.previous = newSong; // points to itself
}
```

For insertion at the beginning:

```javascript
#insertAtBeginning(newSong) {
    newSong.next = this.#firstSong;
    newSong.previous = this.#lastSong;
    this.#firstSong.previous = newSong;
    this.#lastSong.next = newSong;
    this.#firstSong = newSong;
}
```

For insertion at the end:

```javascript
#insertAtEnd(newSong) {
    newSong.next = this.#firstSong;
    newSong.previous = this.#lastSong;
    this.#lastSong.next = newSong;
    this.#firstSong.previous = newSong;
    this.#lastSong = newSong;
}
```

For insertion in the middle:

```javascript
#insertInMiddle(newSong, position) {
    let currentSong = this.#firstSong;
    for (let i = 0; i < position - 1; i++) {
        currentSong = currentSong.next;
    }
    
    newSong.next = currentSong.next;
    newSong.previous = currentSong;
    currentSong.next.previous = newSong;
    currentSong.next = newSong;
}
```

### Playing Songs

The media player can simulate song playback and navigation:

```javascript
play() {
    if (!this.#playingSong && this.#firstSong) {
        this.#playingSong = this.#firstSong;
    }
    if (this.#playingSong) {
        console.log(`Now playing: ${this.#playingSong.songTitle}`);
    }
}

next() {
    if (this.#playingSong) {
        this.#playingSong = this.#playingSong.next;
        this.play();
    }
}

previous() {
    if (this.#playingSong) {
        this.#playingSong = this.#playingSong.previous;
        this.play();
    }
}

getCurrentSong() {
    return this.#playingSong ? this.#playingSong.songTitle : null;
}
```

### Example Usage

```javascript
const player = new MediaPlayer();

// Add songs to the playlist
player.addSongByTitle("Yellow Submarine");
player.addSongByTitle("Hey Jude");
player.addSongByTitle("Let It Be");
player.addSongByTitle("Come Together");

// Play songs
player.play(); // "Now playing: Come Together"
player.next(); // "Now playing: Hey Jude"
player.next(); // "Now playing: Let It Be"
player.next(); // "Now playing: Yellow Submarine"
player.next(); // "Now playing: Come Together" (loops back)

player.previous(); // "Now playing: Yellow Submarine"
```

The playlist maintains alphabetical order and provides seamless navigation in both directions with automatic looping.

## Summary

Linked lists provide a flexible alternative to arrays for storing sequential data. We've covered:

* **Singly linked lists**: basic structure with one-way navigation
* **Doubly linked lists**: bidirectional navigation with previous and next pointers
* **Circular linked lists**: continuous loops with no explicit end
* **Practical application**: a media player demonstrating real-world usage

Each variation has specific use cases:
* Use singly linked lists for simple sequential access with frequent insertions/deletions
* Use doubly linked lists when you need bidirectional traversal
* Use circular linked lists for cyclic data or round-robin scenarios

The key advantages of linked lists include dynamic sizing and efficient insertion/removal operations. The main disadvantages are lack of random access and additional memory overhead for storing pointers.

Understanding linked lists prepares you for more complex data structures like trees and graphs, which also use pointer-based relationships between elements.