const {assert} = require('chai');
const Page = require('./page');
const Utils = require('./utils/index');
let utils = new Utils();

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
        return await this.page.visit(this.caseData.url)
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
                    console.log(err.message);
                }
            }
        }
        if (step.delayAfter) await this.page.delay(step.delayAfter);
    }

    async run() {
        await this.caseData.processTestData(this.caseData.testData);
        await this.openBrowser();
        for (let sIndex = 0; sIndex < this.caseData.steps.length; sIndex++) {
            await this.runStep(sIndex);
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