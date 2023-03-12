const handleGetPartial = (dictionary) => (req, res) => {
    const { partial } = req.params;

    const matchesStartingWithPartial = dictionary.getWordsStartingWith(partial);

    if (!matchesStartingWithPartial.length) {
        return res.json([]);
    }

    if (matchesStartingWithPartial.length > 3) {
        const reducedSubset = dictionary.getFirstWordForEachFirstLetter(matchesStartingWithPartial);
        console.log(`more than 3 (${matchesStartingWithPartial.length}) partials found. subset ->`, reducedSubset);
        return res.json(reducedSubset);
    }

    return res.json(matchesStartingWithPartial);
}


module.exports = {
    handleGetPartial
};