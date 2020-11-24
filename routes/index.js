const express = require('express');
const path = require('path');
const router = express.Router();

//Web app route - Always in the last place
router.get('/project_info/:project/:scenario/:file', function (req, res, next) {
    res.sendFile(path.resolve(`./projects/${req.params.project}/desc/${req.params.scenario}/${req.params.file}.md`));
});
router.get('/stackedit/*', function (req, res, next) {
    res.sendFile(path.resolve('./webapp-stack-edit/index.html'));
});
router.get('/*', function (req, res, next) {
    res.sendFile(path.resolve('./webapp/index.html'));
});
// Don't add any route here

module.exports = router;
