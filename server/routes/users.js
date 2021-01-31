var express = require('express');
var router = express.Router();

// Imports the Google Cloud client library
const { Translate } = require("@google-cloud/translate").v2;
// Imports the Google Cloud client libraries
const vision = require("@google-cloud/vision");

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
  let translatedWords = {};
  for (let i = 0; i < words.length; ++i) {
    let word = words[i];
    // Translates some text into Russian
    const [translation] = await translate.translate(word, targetLanguage);
    translatedWords[word] = translation;
  }
  return translatedWords;
}

/* GET users listing. */
router.post('/', async function(req, res, next) {
  res.json(req.body);
  let image = req.body.image;
  let words = await imageToText(image);
  let translatedWords = await translateText(words, "zh-TW");
  console.log(translatedWords);

});

module.exports = router;
