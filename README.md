# Learning JavaScript Data Structures and Algorithms - Fourth Edition

This repository contains the complete source code examples for the book **"Learning JavaScript Data Structures and Algorithms - Fourth Edition"** by **Packt Publishing**.

## About This Book

Learn how to implement the most important data structures and algorithms in JavaScript. This book covers:

- **Arrays, Stacks, and Queues** - Linear data structures
- **Linked Lists** - Dynamic data structures  
- **Trees and Graphs** - Hierarchical and network structures
- **Sorting and Searching** - Essential algorithms
- **Advanced Algorithms** - Dynamic programming, greedy algorithms, and more

Each chapter includes both **JavaScript** and **TypeScript** implementations with practical, real-world examples.

## Prerequisites

Before running the examples, make sure you have the following installed:

### Required
- **Node.js** (version 14.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

### For TypeScript Examples
The TypeScript dependencies are already configured in this repository. After cloning, simply run:

```bash
npm install
```

This will install:
- TypeScript compiler
- ts-node for running TypeScript files directly
- Type definitions for Node.js

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PacktPublishing/Learning-JavaScript-Data-Structures-and-Algorithms---Fourth-Edition.git
   cd Learning-JavaScript-Data-Structures-and-Algorithms---Fourth-Edition
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Navigate to any chapter and run examples:**
   ```bash
   # For JavaScript examples
   node src/04-stack/js/01-undo-feature.js
   
   # For TypeScript examples  
   npx ts-node src/04-stack/ts/01-undo-feature.ts
   ```

## Repository Structure

```
├── src/
│   ├── 04-stack/          # Chapter 4: Stacks
│   │   ├── js/            # JavaScript implementations
│   │   ├── ts/            # TypeScript implementations
│   │   └── README.md      # Chapter-specific documentation
│   ├── 05-queue/          # Chapter 5: Queues
│   ├── 06-linked-list/    # Chapter 6: Linked Lists
│   └── ...               # Additional chapters
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## Chapters

Each chapter folder contains:
- **JavaScript examples** (`js/` folder) - Modern ES6+ JavaScript
- **TypeScript examples** (`ts/` folder) - Type-safe implementations
- **README.md** - Chapter-specific documentation and running instructions

## Key Features

### JavaScript Examples
- ✅ Modern ES6+ syntax (const, let, arrow functions)
- ✅ CommonJS modules for Node.js compatibility
- ✅ Extensive comments and documentation
- ✅ Step-by-step execution demos

### TypeScript Examples
- ✅ Generic types and interfaces for type safety
- ✅ Comprehensive input validation
- ✅ Structured error handling
- ✅ Enhanced IDE support with autocomplete
- ✅ Self-documenting code with type annotations

## Contributing

This repository contains the official examples from the Packt Publishing book. For questions about the content, please refer to the book or contact Packt Publishing.

## License

This project is licensed under the terms specified by Packt Publishing for the book "Learning JavaScript Data Structures and Algorithms - Fourth Edition".

## Support

- **Book Support**: [Packt Publishing Support](https://www.packtpub.com/support)
- **Technical Issues**: Check individual chapter READMEs for specific running instructions
- **Updates**: Watch this repository for any updates or corrections
