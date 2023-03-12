const fs = require('fs');
const path = require('path');

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

    getFirstWordForEachFirstLetter(words) {
        const matches = [];
        const processedLetters = [];
        words.forEach((word) => {
            const firstLetter = word[0];
            if (!processedLetters.includes(firstLetter)) {
                matches.push(word);
                processedLetters.push(firstLetter);
            }
        });

        return this.sortWordsByCharacterCount(matches);
    }

    sortWordsByCharacterCount(words) {
        return words.sort((a, b) => a.length - b.length);
    }
}

module.exports = { Dictionary };