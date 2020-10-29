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

/**
 * 
 * @param {object} code 
 */
async function encodeScenarioFunction(scenario) {
    let refScenario = JSON.parse(JSON.stringify(scenario));

    scenario.cases.forEach((caseItem, caseIndex) => {
        //Test Data
        if (typeof caseItem.testData == 'function') {
            refScenario.cases[caseIndex].testData = `{{{cases->${caseIndex}->testData}}}`;
        }
        else if (Array.isArray(caseItem.testData)) {
            caseItem.forEach((testDataItem, testDataIndex) => {
                let keys = Object.keys(testDataItem);
                keys.forEach((key, index) => {
                    if (typeof testDataItem[key] == 'function') {
                        refScenario.cases[caseIndex].testData[testDataIndex][key] = `{{{cases->${caseIndex}->testData->${testDataIndex}->${key}}}}`
                    }
                });
            });
        } else {
            if (caseItem.testData) {
                let keys = Object.keys(caseItem.testData);
                keys.forEach((key, index) => {
                    if (typeof caseItem.testData[key] == 'function') {
                        refScenario.cases[caseIndex].testData[key] = `{{{cases->${caseIndex}->testData->${key}}}}`;
                    }
                });
            }
        }

        //Steps
        caseItem.steps.forEach((stepItem, stepIndex) => {
            if (typeof stepItem.expectResult == 'function') {
                refScenario.cases[caseIndex].steps[stepIndex].expectResult = `{{{cases->${caseIndex}->steps->${stepIndex}->expectResult}}}`;
            }
            //Actions
            if (stepItem.action && typeof stepItem.action.actionFunc == 'function') {
                refScenario.cases[caseIndex].steps[stepIndex].action.actionFunc = `{{{cases->${caseIndex}->steps->${stepIndex}->action->actionFunc}}}`;
            }
        });

        //expectResult
        if (typeof caseItem.expectResult == 'function') {
            refScenario.cases[caseIndex].expectResult = `{{{cases->${caseIndex}->expectResult}}}`;
        }
    });
    return {
        reg: /{{{(\s+)?((\w|([\-\>])))+(\s+)?}}}/g,
        refScenario: JSON.stringify(refScenario)
    }
}

module.exports = {
    getScenario,
    encodeScenarioFunction
}