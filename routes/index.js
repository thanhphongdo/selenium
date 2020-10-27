const express = require('express');
const path = require('path');
const router = express.Router();

//Web app route - Always in the last place
router.get('/*', function (req, res, next) {
    res.sendFile(path.resolve('./webapp/index.html'));
});
// Don't add any route here

module.exports = router;
