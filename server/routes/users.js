var express = require('express');
var router = express.Router();
var { appendObject } = require("../helpers/firebase");

const fs = require("fs");
// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate").v2;
// Imports the Google Cloud client libraries
const vision = require("@google-cloud/vision");
const { lookup } = require('dns');

const languageLookup = {
  Arabic: "ar",
  Chinese_S: "zh",
  Chinese_T: "zh-TW",
  French: "fr",
  German: "de",
  Hindi: "hi",
  Indonesian: "id",
  Italian: "it",
  Japanese: "ja",
  Korean: "ko",
  Myanmar: "my",
  Russian: "ru",
  Spanish: "es",
  Tagalog: "tl",
  Thai: "th",
  Turkish: "tr",
  Vietnamese: "vi",
};

async function imageToText(image) {
  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  let fileName = `..\\server\\hotddog.jpg`;
  if (!image) {
    image = fs.readFileSync(fileName);
    console.log(image);
  }
  else {
    image = Buffer.from(image, "base64");
    console.log(image);
  }
  const request = {
    image: { content: image },
  };

  const [result] = await client.objectLocalization(request);
  const objects = result.localizedObjectAnnotations;
  let results = [];
  objects.forEach((object) => {
    console.log(`Name: ${object.name}`);
    console.log(`Confidence: ${object.score}`);
    const vertices = object.boundingPoly.normalizedVertices;
    vertices.forEach((v) => console.log(`x: ${v.x}, y:${v.y}`));
    results.push(object.name);
  });
  console.log("IMAGE RESULTS:", results);
  return results;
}

async function translateText(words, targetLanguage) {
  // Instantiates a client
  const translate = new Translate();
  let translatedWords = [];
  for (let i = 0; i < words.length; ++i) {
    let word = words[i];
    // Translates some text into Russian
    const [translation] = await translate.translate(word, targetLanguage);
    translatedWords.push({
      original: word,
      translated: translation
    });
  }
  return translatedWords;
}

/* GET users listing. */
router.post('/', async function (req, res, next) {
  let key = req.body.key;
  let image = req.body.image;
  let language = req.body.language;

  let words = await imageToText(image);
  let translatedWords = await translateText(words, languageLookup[language]);

  // if google api found objects
  if (translatedWords.length > 0) {
    let bestResults = translatedWords[0];

    // form a document in the database
    let object = {
      image: image,
      label: bestResults["original"],
      translation: bestResults["translated"],
      translationLanguage: language,
      similarWords: []
    };

    appendObject(key, object);
  }
});

module.exports = router;
