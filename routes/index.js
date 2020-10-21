var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/api', function (req, res, next) {
  res.json({});
});

//Web app route - Always in the last place
router.get('/*', function (req, res, next) {
  res.sendFile(path.resolve('./webapp/index.html'));
});
// Don't add any route here

module.exports = router;
