var express = require("express");
var router = express.Router();

let { initializeData } = require("../helpers/firebase");

router.get("/initialize_database", async function (req, res, next) {
    var key = initializeData();
    res.json({ key })
});

router.put("/append_oneObject", async function (req, res, next) {
    var key = req.body.key;
    appendObject(key, {
        photo: "base64:asdgdsed",
        label: "nothotdog",
        translation: "熱狗",
        translationLanguage: "japanese",
        similarWords: ["熱狗a", "熱狗b", "熱狗c", "熱狗d"]

    });
    // appendObject();
    res.send("Object appended!"); x
});

module.exports = router;
