const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/agent', function (req, res, next) {
    res.sendFile(path.resolve('core/agent/dist/agent/index.html'));
});

router.get('/agent/*', function (req, res, next) {
    res.sendFile(path.resolve('core/agent/dist/agent/index.html'));
});

module.exports = router;
