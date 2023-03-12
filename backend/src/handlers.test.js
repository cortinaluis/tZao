const { Dictionary } = require("./dictionary");
const dictionary = new Dictionary('../dictionary_example.json');

const getWordsStartingWithSpy = jest.spyOn(dictionary, 'getWordsStartingWith');
const getFirstWordForEachFirstLetterSpy = jest.spyOn(dictionary, 'getFirstWordForEachFirstLetter');


const { handleGetPartial } = require("./handlers");

describe('handlers', () => {
    describe('handleGetPartial', () => {
        beforeEach(() => {
            getWordsStartingWithSpy.mockReset();
            getFirstWordForEachFirstLetterSpy.mockReset();
        });
        describe('when getWordsStartingWith returns empty array', () => {
            it('returns empty json', () => {
                getWordsStartingWithSpy.mockReturnValueOnce([]);
                const jsonMock = jest.fn();
                handleGetPartial(dictionary)({ params: {} }, { json: jsonMock });
                expect(jsonMock).toHaveBeenCalledWith([]);
                expect(getWordsStartingWithSpy).toHaveBeenCalled();
            });
        });

        describe('when getWordsStartingWith returns more than 3 words', () => {
            it('returns subset of 3 words', () => {
                getWordsStartingWithSpy.mockReturnValueOnce(['my', 'words', 'are', 'here']);
                getFirstWordForEachFirstLetterSpy.mockReturnValueOnce(['my', 'words', 'are'])
                const jsonMock = jest.fn();
                handleGetPartial(dictionary)({ params: {} }, { json: jsonMock });
                expect(jsonMock).toHaveBeenCalledWith(['my', 'words', 'are']);
                expect(getWordsStartingWithSpy).toHaveBeenCalled();
                expect(getFirstWordForEachFirstLetterSpy).toHaveBeenCalled();
            });
        });

        describe('when getWordsStartingWith returns between 1 and 3 words', () => {
            it('returns all words', () => {
                getWordsStartingWithSpy.mockReturnValueOnce(['my', 'words', 'are']);
                const jsonMock = jest.fn();
                handleGetPartial(dictionary)({ params: {} }, { json: jsonMock });
                expect(jsonMock).toHaveBeenCalledWith(['my', 'words', 'are']);
                expect(getWordsStartingWithSpy).toHaveBeenCalled();
                expect(getFirstWordForEachFirstLetterSpy).not.toHaveBeenCalled();
            });
        });
    });
});
