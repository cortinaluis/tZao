const fs = require('fs');
const { keyDictionary } = require('../src/types/keyboard');

const transformWordToT9 = (word) => {
    return [...word].map(character => keyDictionary[character])
        .join('');
}

const generateT9Dictionary = (words) => {
    const t9Dictionary = {};
    words.forEach((word) => {
        const lowercaseWord = word.toLowerCase();
        const transformedWord = transformWordToT9(lowercaseWord);
        if (!t9Dictionary[transformedWord]) {
            t9Dictionary[transformedWord] = [lowercaseWord];
        } else {
            if (!t9Dictionary[transformedWord].includes(lowercaseWord)) {
                t9Dictionary[transformedWord].push(lowercaseWord);
            }
        }
    });

    return t9Dictionary;
}

const extractWordsArrayFromFile = (filePath) => {
    const file = fs.readFileSync(filePath, 'utf8');
    return file.toString().split('\n');
}

const saveT9DictionaryToFile = (filePath, t9Dictionary) => {
    fs.writeFileSync(filePath, t9Dictionary, { encoding: 'utf8' });
}

const loadDictionaryNames = () => {
    return fs.readdirSync('./dictionaries').map((file) => `./dictionaries/${file}`);
}

module.exports = {
    transformWordToT9,
    generateT9Dictionary,
    extractWordsArrayFromFile,
    saveT9DictionaryToFile,
    loadDictionaryNames,
};
