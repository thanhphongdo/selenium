const {Builder, By, until} = require('selenium-webdriver');
// const Page = require('./page');
const Case = require('./case');

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
        let caseItem = new Case(this.scenario.cases[0]);
        await caseItem.run();
    }
}