const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const services = require('../services/index');
const router = express.Router();
const Utils = require('../utils');
const utils = new Utils();

router.get('/api/scenario/:projectId/:scenarioId', async function (req, res, next) {
    let projectId = req.params.projectId;
    let scenarioId = req.params.scenarioId;
    try {
        let scenarioPath = `./projects/${projectId}/${scenarioId}.js`;
        let pathExists = await fs.pathExists(path.resolve(scenarioPath));
        if (!pathExists) {
            res.status(403).json({
                message: 'Scenario is not exists!'
            });
            return;
        }
        let data = await services.scenario.getScenario(projectId, scenarioId);
        res.status(200).json({
            data: data
        });
    } catch (e) {
        res.status(403).json({
            e
        });
    }
});

router.post('/api/scenario/create/:projectId/:scenarioId', async function (req, res, next) {
    let projectId = req.params['projectId'];
    let scenarioId = req.params['scenarioId'];
    try {
        let scenarioPath = `./projects/${projectId}/${scenarioId}.js`;
        let pathExists = await fs.pathExists(scenarioPath);
        if (pathExists) {
            res.status(403).json({
                message: 'Scenario is exists!'
            });
            return;
        }
        await services.code.saveCode(scenarioPath, services.code.formatJSCode(`
            const scenario = require('../../core/create_scenario');
            module.exports = scenario.createScenario({
                id: '${scenarioId}',
                cases: []
            });
        `));
        res.json({projectId, scenarioId});
    } catch (e) {
        res.status(403).json({
            e
        });
    }
});

router.post('/api/scenario/case/:projectId/:scenarioId', async function (req, res, next) {
    let projectId = req.params.projectId;
    let scenarioId = req.params.scenarioId;
    let cases = eval(`(()=>{return ${req.body.cases}})()`);
    if (!cases) cases = [];
    try {
        let scenarioPath = `./projects/${projectId}/${scenarioId}.js`;
        let pathExists = await fs.pathExists(path.resolve(scenarioPath));
        if (!pathExists) {
            res.status(403).json({
                message: 'Scenario is not exists!'
            });
            return;
        }
        let scenarioData = await services.scenario.getScenario(projectId, scenarioId);
        let scenario = eval(`(()=>{return ${scenarioData}})()`);
        // scenario.cases = scenario.cases.concat(cases);
        scenario.cases = cases;
        let scenarioEncode = await services.scenario.encodeScenarioFunction(scenario);
        let matchKeyPath = scenarioEncode.refScenario.match(scenarioEncode.reg);
        matchKeyPath.forEach(keyPath => {
            let keyPathReplace = keyPath.replace('{{{', '').replace('}}}', '').trim();
            let funcStringify = utils.getPropByKeyPath(keyPathReplace, scenario).toString();
            scenarioEncode.refScenario = scenarioEncode.refScenario.replace(`"${keyPath}"`, funcStringify);
        });
        await services.code.saveCode(scenarioPath, services.code.formatJSCode(`
            const scenario = require('../../core/create_scenario');
            module.exports = scenario.createScenario(${scenarioEncode.refScenario});
        `));
        res.json({projectId, scenarioId});
    } catch (e) {
        res.status(403).json({
            e
        });
    }
});

// router.post('/api/project/update/:projectId', async function (req, res, next) {
//   let oldProjectId = req.params.projectId;
//   let projectId = req.body['projectId'];
//   let projectTitle = req.body['projectTitle'];
//   let projectDesc = req.body['projectDesc'];
//   try {
//     let path = `./projects/${oldProjectId}`;
//     let updatePath = `./projects/${projectId}`;
//     let pathExists = await fs.pathExists(path);
//     if (!pathExists) {
//       res.status(403).json({
//         message: 'Project is not exists!'
//       });
//       return;
//     }
//     if (oldProjectId != projectId) {
//       pathExists = await fs.pathExists(updatePath);
//       if (pathExists) {
//         res.status(403).json({
//           message: 'new project id is exists!'
//         });
//         return;
//       }
//     }
//     let projectData = await fs.readJSON(path + '/index.json');
//     let scenarios = projectData.scenarios || [];
//     await services.code.saveCode(path + '/index.json', services.code.formatJSONCode(JSON.stringify({projectId, projectTitle, projectDesc, scenarios})));
//     if (oldProjectId != projectId) {
//       await fs.move(path, updatePath);
//     }
//     res.json({projectId, projectTitle, projectDesc, scenarios});
//   } catch (e) {
//     res.status(403).json({
//       e
//     });
//   }
// });

// router.delete('/api/project/delete/:projectId', async function (req, res, next) {
//   let projectId = req.params.projectId
//   try {
//     let path = `./projects/${projectId}`;
//     let pathExists = await fs.pathExists(path);
//     if (!pathExists) {
//       res.status(403).json({
//         message: 'Project is not exists!'
//       });
//       return;
//     }
//     await fs.remove(path);
//     res.json({projectId});
//   } catch (e) {
//     res.status(403).json({
//       e
//     });
//   }
// });

module.exports = router;
