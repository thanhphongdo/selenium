const {assert, util} = require('chai');
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
     * @param {Object[]} caseData.steps[].actions
     * @param {string} caseData.steps[].actions[].action
     * @param {number} caseData.steps[].actions[].delayBefore
     * @param {number} caseData.steps[].actions[].delayAfter
     * @param {string} caseData.steps[].actions[].text
     * @param {string} caseData.steps[].actions[].script
     * @param {string} caseData.steps[].actions[].scrollTop
     * @param {string} caseData.steps[].actions[].scrollLeft
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
            step.actions = [];
            item.actions.forEach(action => {
                step.actions.push(Object.assign({}, action));
            });
            this.steps.push(step);
        })
    }

    async processTestData() {
        let data = this.testData;
        if (!data) data = {};
        if (typeof this.testData == 'function') {
            data = await this.testData(utils);
        }
        this.steps.forEach(sItem => {
            sItem.actions.forEach(aItem => {
                if (aItem.text) {
                    aItem.text = utils.valueReplace(aItem.text, data);
                }
                if (aItem.script) {
                    aItem.script = utils.valueReplace(aItem.script, data);
                }
            });
        });
        console.log(this.steps);
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
        if (step.actions && step.actions.length) {
            for (let aIndex = 0; aIndex < step.actions.length; aIndex++) {
                let action = step.actions[aIndex];
                if (action.delayBefore) await this.page.delay(action.delayBefore);
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
                if (action.delayAfter) await this.page.delay(action.delayAfter);
            }
        }
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
        await this.openBrowser();
        await this.caseData.processTestData();
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