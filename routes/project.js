const express = require('express');
const fs = require('fs-extra');
const services = require('../services/index');
const router = express.Router();
const Utils = require('../utils');
const utils = new Utils();

router.get('/api/project', async function (req, res, next) {
    let dirs = await fs.readdir('./projects');
    let readFilesPromises = [];
    dirs.forEach(dir => {
        readFilesPromises.push(services.project.getProjectById(dir));
    });
    Promise.all(readFilesPromises).then(data => {
        res.json({
            data: data.filter(item => item).map(item => item.metadata)
        });
    }).catch(error => {
        res.status(403).json({ error: error });
    });
});

router.get('/api/project/:projectId', async function (req, res, next) {
    let projectId = req.params.projectId
    try {
        let path = `./projects/${projectId}`;
        let pathExists = await fs.pathExists(path);
        if (!pathExists) {
            res.status(401).json({
                message: 'Project is not exists!'
            });
            return;
        }
        let data = require(`../projects/${projectId}/index.js`);
        res.status(200).json({
            data: data
        })
    } catch (e) {
        res.status(401).json({
            e
        });
    }
});

router.post('/api/project/create', async function (req, res, next) {
    let projectId = req.body['projectId'];
    let projectTitle = req.body['projectTitle'];
    let projectDesc = req.body['projectDesc'];
    try {
        let path = `./projects/${projectId}/index.js`;
        let pathExists = await fs.pathExists(path);
        if (pathExists) {
            res.status(401).json({
                message: 'Project is exists!'
            });
            return;
        }
        // await services.code.saveCode(path, services.code.formatJSCode(JSON.stringify({projectId, projectTitle, projectDesc, scenarios: []})));
        await services.code.saveCode(path, services.code.formatJSCode(`
            const scenarios = [];
            module.exports = {
                metadata: {
                    "projectId": "${projectId}",
                    "projectTitle": "${projectTitle}",
                    "projectDesc": "${projectDesc}",
                    "scenarios": scenarios
                },
                scenario: scenarios.reduce((scenarios, item) => {
                    const scenario = require(\`./\${item.id}.js\`);
                    return {
                        ...scenarios,
                        [item.id]: scenario
                    }
                }, {})
            }
        
        `));
        res.json({ projectId, projectTitle, projectDesc });
    } catch (e) {
        res.status(401).json({
            e
        });
    }
});

router.post('/api/project/update/:projectId', async function (req, res, next) {
    let oldProjectId = req.params.projectId;
    let projectId = req.body['projectId'];
    let projectTitle = req.body['projectTitle'];
    let projectDesc = req.body['projectDesc'];
    try {
        let path = `./projects/${oldProjectId}`;
        let updatePath = `./projects/${projectId}`;
        let pathExists = await fs.pathExists(path);
        if (!pathExists) {
            res.status(401).json({
                message: 'Project is not exists!'
            });
            return;
        }
        if (oldProjectId != projectId) {
            pathExists = await fs.pathExists(updatePath);
            if (pathExists) {
                res.status(401).json({
                    message: 'new project id is exists!'
                });
                return;
            }
        }
        let projectData = await fs.readJSON(path + '/index.js');
        let scenarios = projectData.scenarios || [];
        await services.code.saveCode(path + '/index.js', services.code.formatJSCode(JSON.stringify({ projectId, projectTitle, projectDesc, scenarios })));
        if (oldProjectId != projectId) {
            await fs.move(path, updatePath);
        }
        res.json({ projectId, projectTitle, projectDesc, scenarios });
    } catch (e) {
        res.status(401).json({
            e
        });
    }
});

router.delete('/api/project/delete/:projectId', async function (req, res, next) {
    let projectId = req.params.projectId
    try {
        let path = `./projects/${projectId}`;
        let pathExists = await fs.pathExists(path);
        if (!pathExists) {
            res.status(401).json({
                message: 'Project is not exists!'
            });
            return;
        }
        await fs.remove(path);
        res.json({ projectId });
    } catch (e) {
        res.status(401).json({
            e
        });
    }
});

module.exports = router;
