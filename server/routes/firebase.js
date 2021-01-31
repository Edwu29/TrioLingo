var express = require("express");
var router = express.Router();

let { initializeData, getObjects } = require("../helpers/firebase");

router.get("/initialize_database", async function (req, res, next) {
    var key = initializeData();
    res.json({ key })
});

router.get("/get_quiz", async (req, res) => {
    let key = req.query.key;
    let numQuestions = req.query.numQuestions ? req.query.numQuestions : 5;
    let objects = await getObjects(key);
    let shuffled = shuffle(Object.keys(objects));
    let quiz = [];

    let quizWords = [];
    let quizPool = [];
    for (let i = 0; i < shuffled.length; ++i) {
        quizPool.push(objects[shuffled[i]]["translation"]);
    }

    console.log(quizPool.length)

    for (let i = 0; i < shuffled.length && numQuestions > quizWords.length; ++i) {
        let object = objects[shuffled[i]];
        // get words from other objects
        let quizWord = object["translation"];
        if (quizWords.includes(quizWord)) {
            continue;
        }

        let wordChoices = [quizWord];
        let newShuffle = shuffle(shuffled);
        // get words choices from existing collection
        for (let j = 0; j < newShuffle.length && wordChoices.length < 4; ++j) {
            let potentialChoice = objects[shuffled[j]]["translation"];
            if (!wordChoices.includes(potentialChoice)) {
                wordChoices.push(potentialChoice);
            }
        }
        object["wordChoices"] = wordChoices;
        quizWords.push(quizWord);
        quiz.push(object);
    }
    console.log(quizWords);
    console.log(quiz.length)
    res.json(quiz);
})

router.put("/append_oneObject", async function (req, res, next) {
    var key = req.body.key;
    appendObject(key, {
        image: "base64:asdgdsed",
        label: "nothotdog",
        translation: "熱狗",
        translationLanguage: "japanese",
        wordChoices: ["熱狗", "熱狗b", "熱狗c", "熱狗d"]
    });
    // appendObject();
    res.send("Object appended!"); x
});

function shuffle(array) {
    array = [...array]
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

module.exports = router;
