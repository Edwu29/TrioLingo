var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', async function(req, res, next) {
	res.json(req.body);
});

module.exports = router;
