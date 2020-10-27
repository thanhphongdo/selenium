const express = require('express');
const path = require('path');
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
    await services.code.saveCode(path, services.code.formatJSONCode(JSON.stringify({projectId, projectTitle, projectDesc})));
    res.json({projectId, projectTitle, projectDesc});
  } catch (e) {
    res.status(401).json({
      e
    });
  }
});

router.post('/api/project/update', async function (req, res, next) {
  let projectId = req.body['projectId'];
  let projectTitle = req.body['projectTitle'];
  let projectDesc = req.body['projectDesc'];
  try {
    let path = `./projects/${projectId}/index.json`;
    let pathExists = await fs.pathExists(path);
    if (!pathExists) {
      res.status(401).json({
        message: 'Project is not exists!'
      });
      return;
    }
    await services.code.saveCode(path, services.code.formatJSONCode(JSON.stringify({projectId, projectTitle, projectDesc})));
    res.json({projectId, projectTitle, projectDesc});
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
