const {Builder, By, until} = require('selenium-webdriver');
const Utils = require('../utils');
const Case = require('./case');

const utils = new Utils();

class ScenarioData {
    /**
     * 
     * @param {Object} scenarioData 
     * @param {string} scenarioData.id 
     * @param {Object[]} scenarioData.cases 
     */
    constructor(scenarioData) {
        this.id = scenarioData.id;
        this.cases = scenarioData.cases;
    }
}

module.exports = class Scenario {
    constructor(scenarioData) {
        // this.page = new Page();
        this.scenario = new ScenarioData(scenarioData);
    }

    async run() {
        // let caseItem = new Case(this.scenario.cases[0]);
        for (let cIndex = 0; cIndex < this.scenario.cases.length; cIndex++) {
            let caseData = this.scenario.cases[cIndex];
            if (typeof caseData.testData == 'function') {
                caseData.testData = await caseData.testData(utils, this.scenario);
            }
            if (Array.isArray(caseData.testData)) {
                for (let tIndex = 0; tIndex < caseData.testData.length; tIndex++) {
                    let caseItem = new Case(caseData, caseData.testData[tIndex]);
                    await caseItem.run();
                }
            } else {
                let caseItem = new Case(caseData, caseData.testData);
                await caseItem.run();
            }
        }
    }
}