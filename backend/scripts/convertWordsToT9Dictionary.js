
const inquirer = require('inquirer');
const { loadDictionaryNames, extractWordsArrayFromFile, generateT9Dictionary, saveT9DictionaryToFile } = require('./wordsToT9Dictionary');

(async () => {
    const dictionaries = loadDictionaryNames();

    const { dictionaryName } = await inquirer.prompt([{
        name: 'dictionaryName',
        message: 'Which dictionary would you like to use?',
        type: 'list',
        choices: dictionaries
    }]);

    const words = extractWordsArrayFromFile(dictionaryName);
    const t9Dictionary = generateT9Dictionary(words);
    saveT9DictionaryToFile('dictionary.json', JSON.stringify(t9Dictionary));
})();
