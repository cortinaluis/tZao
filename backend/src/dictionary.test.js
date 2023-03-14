const { Dictionary } = require('./dictionary');

describe('Dictionary class', () => {
    const dictionary = new Dictionary('../dictionary_example.json');
    describe('constructor', () => {
        it('loads and parses the dictionary file', () => {
            expect(dictionary.dictionaryEntries).toEqual({
                7846: [
                    'ruin'
                ],
                727326: [
                    "scream",
                ],
                78673: [
                    "store"
                ],
            });
            expect(dictionary.dictionaryKeys).toEqual(["7846", "78673", "727326"]);
        });
    });

    describe('getWordsStartingWith', () => {
        it('gets a list of real words that starts with a T9 word', () => {
            expect(dictionary.getWordsStartingWith("727326")).toEqual(["scream"]);
        });
    });

    describe('getWordsForEachFirstLetter', () => {
        it.each(
            [
                { matchesPerLetter: 1, expected: ['ruin', 'store'] },
                { matchesPerLetter: 2, expected: ['ruin', 'store', 'scream'] },
            ]
        )('returns max $matchesPerLetter words per letter', ({ matchesPerLetter, expected }) => {
            const wordsStartingWith7 = dictionary.getWordsStartingWith("7");
            expect(
                dictionary.getWordsForEachFirstLetter(wordsStartingWith7, matchesPerLetter)
            ).toEqual(expected);
        });
    });

    describe('sortWordsByCharacterCount', () => {
        it('sorts words by character count', () => {
            const words = ['small', 'big'];
            expect(dictionary.sortWordsByCharacterCount(words)).toEqual(['big', 'small']);
        });
    });
});
