const prettier = require('prettier');
const path = require('path');
const fs = require('fs-extra');
const code = require('./code');

/**
 * 
 * @param {string} projectId 
 * @param {string} scenarioId 
 */
async function getScenario(projectId, scenarioId) {
    let scenarioPath = `./projects/${projectId}/${scenarioId}.js`;
    let scenario = code.formatJSCode(await (await fs.readFile(path.resolve(scenarioPath))).toString());
    scenario = scenario.replace(`const scenario = require('../../core/create_scenario');`, '');
    scenario = scenario.replace(``, '');
    scenario = scenario.replace(`module.exports = scenario.createScenario(`, '');
    scenario = scenario.slice(1, scenario.length - 3);
    return scenario;
}

module.exports = {
    getScenario
}