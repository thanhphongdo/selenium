const { Builder, By, until } = require('selenium-webdriver');
const Utils = require('./utils');
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


    async runCase(caseData) {
        // if(caseData.require)
        if (typeof caseData.testData == 'function') {
            caseData.testData = await caseData.testData(utils, this.scenario);
        }
        if (Array.isArray(caseData.testData)) {
            for (let tIndex = 0; tIndex < caseData.testData.length; tIndex++) {
                let caseItem = new Case(caseData, caseData.testData[tIndex]);
                try {
                    await caseItem.run();
                }
                catch (e) {
                    caseItem.page.sendMesage(`CASE ERROR: ${caseItem.caseData.id}`);
                }
            }
        } else {
            let caseItem = new Case(caseData, caseData.testData);
            try {
                await caseItem.run();
            } catch (e) {
                caseItem.page.sendMesage(`CASE ERROR: ${caseItem.caseData.id}`);
            }
        }

    }

    async runCaseById(caseId) {
        let cIndex = this.scenario.cases.findIndex(item => item.id == caseId);
        if (cIndex >= 0) {
            await this.runCase(this.scenario.cases[cIndex]);
        } else {
            throw Error('Case not found');
        }
    }

    async run() {
        for (let cIndex = 0; cIndex < this.scenario.cases.length; cIndex++) {
            let caseData = this.scenario.cases[cIndex];
            await this.runCase(caseData);
        }
    }
}