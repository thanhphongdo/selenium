const express = require('express');
const fs = require('fs-extra');
const services = require('../services/index');
const router = express.Router();

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
    let data = require(`../projects/${projectId}/index.json`);
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
    let path = `./projects/${projectId}/index.json`;
    let pathExists = await fs.pathExists(path);
    if (pathExists) {
      res.status(401).json({
        message: 'Project is exists!'
      });
      return;
    }
    await services.code.saveCode(path, services.code.formatJSONCode(JSON.stringify({projectId, projectTitle, projectDesc, scenarios: []})));
    res.json({projectId, projectTitle, projectDesc});
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
    let projectData = await fs.readJSON(path + '/index.json');
    let scenarios = projectData.scenarios || [];
    await services.code.saveCode(path + '/index.json', services.code.formatJSONCode(JSON.stringify({projectId, projectTitle, projectDesc, scenarios})));
    if (oldProjectId != projectId) {
      await fs.move(path, updatePath);
    }
    res.json({projectId, projectTitle, projectDesc, scenarios});
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
    res.json({projectId});
  } catch (e) {
    res.status(401).json({
      e
    });
  }
});

module.exports = router;
