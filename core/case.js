const Page = require('./page');

class CaseData {
    /**
     * 
     * @param {Object} caseData 
     * @param {string} caseData.id
     * @param {string} caseData.url
     * @param {boolean} caseData.autoQuiteTimeOut
     * @param {Object[]} caseData.steps
     * @param {string} caseData.steps[].selectorType
     * @param {string} caseData.steps[].selectorQuery
     * @param {string} caseData.steps[].event
     * @param {Object[]} caseData.steps[].actions
     * @param {string} caseData.steps[].actions[].action
     * @param {string} caseData.steps[].actions[].text
     * @param {Object[]} caseData.expectResults
     */
    constructor(caseData) {
        this.id = caseData.id;
        this.url = caseData.url;
        this.autoQuiteTimeOut = caseData.autoQuiteTimeOut;
        this.steps = caseData.steps;
    }
}

module.exports = class Case {
    constructor(caseData) {
        this.caseData = new CaseData(caseData);
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
        }
    }

    async runStep(index) {
        let step = this.caseData.steps[index];
        let element = await this.findElementAtStep(step);
        switch (step.event) {
            case 'click':
                await element.click();
                break;
        }
        if (step.actions && step.actions.length) {
            // for (let aIndex = 0; aIndex < step.actions.length; aIndex++) {
            //     let action = step.actions[index];
            //     switch (action.action) {
            //         case 'input':
            //             await element.sendKeys(action.text);
            //             break;
            //     }
            // }
            step.actions.forEach(async (action) => {
                switch (action.action) {
                    case 'input':
                        await element.sendKeys(action.text);
                        break;
                }
            })
        }
    }

    async run() {
        await this.openBrowser();
        for (let sIndex = 0; sIndex < this.caseData.steps.length; sIndex++) {
            await this.runStep(sIndex);
        }
        if (this.caseData.autoQuiteTimeOut) {
            setTimeout(() => {
                this.page.quite();
            }, this.caseData.autoQuiteTimeOut);
        }
    }
}