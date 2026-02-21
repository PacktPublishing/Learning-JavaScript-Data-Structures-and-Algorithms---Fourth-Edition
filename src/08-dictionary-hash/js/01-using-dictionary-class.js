/**
 * Using the Dictionary Class - Translation Example
 * 
 * This example demonstrates how to use a dictionary to build
 * a simple language learning program that stores translations
 * for frequently-used words and phrases.
 */

import Dictionary from './dictionary.js';

console.log('=== Language Translation Dictionary Demo ===\n');

// Create a new dictionary for translations
const translations = new Dictionary();

console.log('1. Building our English to Portuguese dictionary...');
console.log();

// Add some translations - English to Portuguese
translations.set('hello', 'olá');
translations.set('thank you', 'obrigado');
translations.set('book', 'livro');
translations.set('cat', 'gato');
translations.set('computer', 'computador');
translations.set('water', 'água');
translations.set('good morning', 'bom dia');
translations.set('goodbye', 'adeus');

console.log(`   Added ${translations.size} translations to the dictionary.`);
console.log();

// Function to translate a word
function translateWord(word) {
  if (translations.hasKey(word)) {
    const translation = translations.get(word);
    console.log(`   ✓ The translation of "${word}" is "${translation}"`);
    return translation;
  } else {
    console.log(`   ✗ Sorry, no translation found for "${word}"`);
    return null;
  }
}

console.log('2. Looking up translations...');
console.log();
translateWord('hello');
translateWord('book');
translateWord('dog');  // Not in our dictionary
translateWord('computer');
console.log();

console.log('3. Viewing all available words:');
console.log(`   Words: [${translations.keys().join(', ')}]`);
console.log();

console.log('4. Viewing all translations:');
console.log(`   Translations: [${translations.values().join(', ')}]`);
console.log();

console.log('5. Printing the complete dictionary:');
console.log();
translations.forEach((value, key) => {
  console.log(`   ${key} → ${value}`);
});
console.log();

console.log('6. Adding a new translation:');
translations.set('friend', 'amigo');
console.log(`   Added: friend → amigo`);
console.log(`   Total translations: ${translations.size}`);
console.log();

console.log('7. Updating an existing translation:');
console.log(`   Current "thank you": ${translations.get('thank you')}`);
translations.set('thank you', 'obrigado/obrigada');
console.log(`   Updated "thank you": ${translations.get('thank you')}`);
console.log();

console.log('8. Removing a translation:');
const removed = translations.remove('goodbye');
console.log(`   Removed "goodbye": ${removed}`);
console.log(`   Remaining translations: ${translations.size}`);
console.log();

console.log('9. Building a quiz function...');
console.log();

// Interactive quiz concept
function quiz(englishWord, userAnswer) {
  const correctAnswer = translations.get(englishWord);
  if (correctAnswer === undefined) {
    return { valid: false, message: `Word "${englishWord}" not in dictionary` };
  }
  
  const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();
  return {
    valid: true,
    correct: isCorrect,
    message: isCorrect 
      ? `   ✓ Correct! "${englishWord}" = "${correctAnswer}"`
      : `   ✗ Incorrect. "${englishWord}" = "${correctAnswer}" (you said: "${userAnswer}")`
  };
}

// Simulate some quiz answers
const quizResults = [
  quiz('hello', 'olá'),
  quiz('book', 'livro'),
  quiz('cat', 'perro'),  // Wrong answer
  quiz('water', 'água'),
];

console.log('   Quiz Results:');
quizResults.forEach(result => {
  if (result.valid) {
    console.log(result.message);
  }
});
console.log();

console.log('=== Demo Complete ===');
