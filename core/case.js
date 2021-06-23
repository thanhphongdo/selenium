const { assert } = require('chai');
const Page = require('./page');
const Utils = require('../utils/index');
const config = require('../config/index');
const e = require('express');
let utils = new Utils();
const projects = require('../projects/index');

class CaseData {
    /**
     * 
     * @param {Object} caseData 
     * @param {string} caseData.id
     * @param {string} caseData.url
     * @param {Object} caseData.testData
     * @param {boolean} caseData.autoQuiteTimeOut
     * @param {function} caseData.expectResult
     * @param {Object[]} caseData.steps
     * @param {string} caseData.steps[].selectorType
     * @param {string} caseData.steps[].selectorQuery
     * @param {function} caseData.steps[].expectResult
     * @param {number} caseData.steps[].delayBefore
     * @param {number} caseData.steps[].delayAfter
     * @param {string} caseData.steps[].action
     * @param {Function} caseData.steps[].actionFunc
     * @param {number} caseData.steps[].delayBefore
     * @param {number} caseData.steps[].delayAfter
     * @param {string} caseData.steps[].text
     * @param {string} caseData.steps[].script
     * @param {string} caseData.steps[].scrollTop
     * @param {string} caseData.steps[].scrollLeft
     */
    constructor(caseData, testData) {
        this.caseData = caseData;
        this.testData = testData;
        this.id = caseData.id;
        this.url = caseData.url;
        this.autoQuiteTimeOut = caseData.autoQuiteTimeOut;
        this.expectResult = caseData.expectResult;
        this.steps = [];
        caseData.steps.forEach(item => {
            let step = Object.assign({}, item);
            step.action = Object.assign({}, step.action);
            this.steps.push(step);
        })
    }

    async processTestData(data) {
        if (!data) data = {};
        if (typeof this.testData == 'function') {
            data = await this.testData(utils);
        }
        this.steps.forEach(sItem => {
            if (sItem.action.text) {
                sItem.action.text = utils.valueReplace(sItem.action.text, data);
            }
            if (sItem.action.script) {
                sItem.action.script = utils.valueReplace(sItem.action.script, data);
            }
        });
    }
}

module.exports = class Case {
    constructor(caseData, testData) {
        this.caseData = new CaseData(caseData, testData);
        this.page = new Page();
    }

    async openBrowser() {
        return await this.page.visit(`${config.baseUrl}/${this.caseData.url}`);
    }

    async closeBrowser() {
        return await this.page.driver.close();
    }

    async findElementAtStep(selector) {
        switch (selector.selectorType) {
            case 'id':
                return await this.page.findById(selector.selectorQuery);
            case 'name':
                return await this.page.findByName(selector.selectorQuery);
            case 'xPath':
                return await this.page.findByXPath(selector.selectorQuery);
            case 'tagName':
                return await this.page.findByTagName(selector.selectorQuery);
        }
    }

    async runStep(index) {
        let step = this.caseData.steps[index];
        let element = await this.findElementAtStep(step);
        if (step.delayBefore) await this.page.delay(step.delayBefore);
        let action = step.action;
        if (action.delayBefore) await this.page.delay(action.delayBefore);
        if (action.action) {
            switch (action.action) {
                case 'click':
                    await element.click();
                    break;
                case 'input':
                    await element.sendKeys(action.text);
                    break;
                case 'click_input':
                    await element.click();
                    await this.page.delay(500);
                    await element.sendKeys(action.text);
                    break;
                case 'scroll':
                    if (step.selectorType == 'xPath') {
                        let varName = 'ele_' + new Date().getTime();
                        await this.page.executeScript(`
                                    let ${varName} = document.evaluate('${step.selectorQuery}', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                                    ${varName}.scroll(${action.scrollLeft}, ${action.scrollTop});
                                `);
                    } else {
                        console.info('Scroll action support xPath only.');
                    }
                    break;
                case 'scrollToBottom':
                    if (step.selectorType == 'xPath') {
                        let varName = 'ele_' + new Date().getTime();
                        await this.page.executeScript(`
                                let ${varName} = document.evaluate('${step.selectorQuery}', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                                ${varName}.scroll(0, ${varName}.scrollHeight);
                            `);
                    } else {
                        console.info('Scroll action support xPath only.');
                    }
                    break;
                case 'execute_js':
                    await this.page.executeScript(action.script);
                    break;
            }
        }
        if (action.actionFunc) {
            await action.actionFunc(this.page, element, utils);
        }
        if (action.delayAfter) await this.page.delay(action.delayAfter);
        if (step.expectResult) {
            try {
                await step.expectResult(this.page, assert);
            }
            catch (err) {
                if (err && err.message) {
                    this.page.sendMesage(err.message);
                }
                throw e;
            }
        }
        if (step.delayAfter) await this.page.delay(step.delayAfter);
    }

    async run() {
        const steps = [];
        this.caseData.steps.forEach(step => {
            if (!step.copy) {
                steps.push(step);
            } else {
                let scenario = projects[step.copy.projectId].scenarios[step.copy.scenarioId];
                if (step.copy.caseId) {
                    const cIndex = scenario.cases.findIndex((item) => item.id == step.copy.caseId);
                    const copySteps = scenario.cases[cIndex].steps;
                    if (step.copy.copyAllStep) {
                        copySteps.forEach(item => {
                            steps.push(item);
                        });
                    } else {
                        copySteps.filter(item => step.copy.stepIds.indexOf(item.id) >= 0).forEach(item => {
                            steps.push(item);
                        });
                    }
                }
            }
        });
        this.caseData.steps = steps;
        await this.caseData.processTestData(this.caseData.testData);
        await this.openBrowser();
        for (let sIndex = 0; sIndex < this.caseData.steps.length; sIndex++) {
            try {
                await this.runStep(sIndex);
            } catch (e) {
                await this.closeBrowser();
                throw e;
            }
        }
        if (this.caseData.expectResult) {
            try {
                await this.caseData.expectResult(this.page, assert);
            }
            catch (err) {
                if (err && err.message) {
                    console.log(err.message);
                }
            }
        }
        if (this.caseData.autoQuiteTimeOut) {
            await this.page.delay(this.caseData.autoQuiteTimeOut);
            this.page.quite();
        }
        await this.page.delay(2000);
    }
}