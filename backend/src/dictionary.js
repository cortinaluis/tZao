const fs = require('fs');
const path = require('path');
const { keyDictionary, keypad } = require('./types/keyboard');

class Dictionary {
    constructor(filePath) {
        const file = fs.readFileSync(path.join(__dirname, filePath), 'utf-8');
        const dictionary = JSON.parse(file);

        this.dictionaryEntries = {};
        Object.entries(dictionary).forEach(([k, v]) => {
            this.dictionaryEntries[k] = v;
        });

        this.dictionaryKeys = Object.keys(this.dictionaryEntries);
    }

    // t9Word is a representation of the keypad (eg. '2' would be 'a' or 'b' or 'c')
    getWordsStartingWith(t9WordPartial) {
        return this.sortWordsByCharacterCount(
            this.dictionaryKeys
                .filter((key) => key.startsWith(t9WordPartial))
                .map((key) => this.dictionaryEntries[key])
                .flat(1)
        );
    }

    getWordsForEachFirstLetter(words, matchesPerLetter) {
        const firstLetter = words[0][0];
        const possibleLetters = keypad[keyDictionary[firstLetter]];
        const alphaWords = words.sort();

        // for each letter, generate an array of words
        const wordsPerLetter = {};
        for (const word of alphaWords) {
            const wordFirstLetter = word[0];
            if (possibleLetters.includes(wordFirstLetter)) {
                if (!wordsPerLetter[wordFirstLetter]) {
                    wordsPerLetter[wordFirstLetter] = [word];
                } else {
                    wordsPerLetter[wordFirstLetter].push(word);
                }
            }
        }
        return this.sortWordsByCharacterCount(Object.values(wordsPerLetter)
            .map(
                (words) => this.sortWordsByCharacterCount(words).slice(0, matchesPerLetter)
            ).flat(1));
    }

    sortWordsByCharacterCount(words) {
        return words.sort((a, b) => a.length - b.length);
    }
}

module.exports = { Dictionary };