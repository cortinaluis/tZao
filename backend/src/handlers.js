const handleGetPartial = (dictionary) => (req, res) => {
    const { partial } = req.params;

    const matchesStartingWithPartial = dictionary.getWordsStartingWith(partial);

    if (!matchesStartingWithPartial.length) {
        return res.json([]);
    }

    if (matchesStartingWithPartial.length > 3) {
        const reducedSubset = dictionary.getWordsForEachFirstLetter(matchesStartingWithPartial, 2);
        console.log(`more than 3 (${matchesStartingWithPartial.length}) partials found. subset for ${partial} ->`, reducedSubset);
        return res.json(reducedSubset);
    }

    return res.json(matchesStartingWithPartial);
}


module.exports = {
    handleGetPartial
};