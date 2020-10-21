const config = require('../config/index');
const scenario = require('./create_scenario');
module.exports = scenario.createScenario({
    id: 'first_scenario',
    cases: [
        {
            id: 'open_page',
            url: `${config.baseUrl}/applicant`,
            testData: async (utils, scenario) => {
                return [
                    async (utils) => {
                        return {
                            FIRST_NAME: 'Phong222',
                            LAST_NAME: 'Do222',
                            FUNC_TEST_1_2: (utils, param1, param2) => {
                                return param1 + '---' + param2;
                            }
                        }
                    },
                    {
                        FIRST_NAME: 'Phong333',
                        LAST_NAME: 'Do333'
                    }
                ]
            },
            steps: [
                {
                    selectorType: 'id',
                    selectorQuery: 'email',
                    action: {
                        // action: 'input',
                        // text: 'pgsw_100_{{RANDOM_10000_99999}}@yopmail.com',
                        actionFunc: async (page, element, utils) => {
                            await element.sendKeys('pgsw_100_' + utils.random(1000000, 9999999) + '@yopmail.com');
                        },
                        delayBefore: 250
                    },
                    expectResult: async (page, assert) => {
                        await page.findByTagName('body');
                        assert.include('Bar', 'ar2', 'include "ar"');
                    }
                },
                {
                    selectorType: 'id',
                    selectorQuery: 'firstName',
                    action: {
                        action: 'input',
                        text: '{{FIRST_NAME}}-{{RANDOM_10_30}}-{{FUNC_TEST_1_2}}',
                        delayBefore: 250
                    },
                    expectResult: null,
                    delayBefore: 250
                },
                {
                    selectorType: 'id',
                    selectorQuery: 'lastName',
                    action: {
                        action: 'input',
                        text: '{{LAST_NAME}}-{{RANDOM_10_30}}-{{FUNC_TEST_1_2}}',
                        delayBefore: 250
                    },
                    expectResult: null,
                    delayBefore: 250
                },
                {
                    selectorType: 'xPath',
                    selectorQuery: '//*[@id="mobilePhoneNumber"]/input',
                    action: {
                        action: 'input',
                        text: '999{{RANDOM_1000000_9999999}}',
                        delayBefore: 250
                    },
                    expectResult: null,
                    delayBefore: 250
                },
                {
                    selectorType: 'xPath',
                    selectorQuery: '//*[@id="rootBody"]/app-root/div/ng-sidebar-container/div/div/div[2]/app-customer-signup/div/div/div/div/form/div[4]/div/div/div/label/i',
                    action: {
                        action: 'click'
                    },
                    expectResult: null,
                    delayBefore: 250
                },
                {
                    selectorType: 'xPath',
                    selectorQuery: '//*[@id="rootBody"]/app-root/div/ng-sidebar-container/div/div/div[2]/app-customer-signup/div/div/div/div/form/div[8]/div/div/div/label/i',
                    action: {
                        action: 'click'
                    },
                    expectResult: null,
                    delayAfter: 250
                },
                {
                    selectorType: 'xPath',
                    selectorQuery: '//*[@id="rootBody"]/app-root/div/ng-sidebar-container/div/div/div[2]/app-customer-signup/div/div/div/div/form/div[9]/div/div/div/label/i',
                    action: {
                        action: 'click'
                    },
                    expectResult: null,
                    delayAfter: 250
                },
                {
                    selectorType: 'tagName',
                    selectorQuery: 'body',
                    action: {
                        action: 'execute_js',
                        script: 'console.log(12345789)',
                        delayBefore: 250
                    },
                    expectResult: null,
                    delayBefore: 250
                },
            ],
            expectResult: async (page, assert) => {
                await page.findByTagName('body');
                assert.include('Bar', 'ar3', 'include "ar"')
            },
            autoQuiteTimeOut: 1000
        },
        {
            id: 'open_page',
            url: `${config.baseUrl}/applicant`,
            testData: async (utils, scenario) => {
                return {
                    FIRST_NAME: 'Phong444',
                    LAST_NAME: 'Do444',
                    FUNC_TEST_1_2: (utils, param1, param2) => {
                        return param1 + '---' + param2;
                    }
                }
            },
            steps: [
                {
                    selectorType: 'id',
                    selectorQuery: 'email',
                    action: {
                        action: 'input',
                        text: 'pgsw_100_{{RANDOM_10000_99999}}@yopmail.com',
                        delayBefore: 250
                    }
                    ,
                    expectResult: async (page, assert) => {
                        await page.findByTagName('body');
                        assert.include('Bar', 'ar2', 'include "ar"');
                    }
                },
                {
                    selectorType: 'id',
                    selectorQuery: 'firstName',
                    action: {
                        action: 'input',
                        text: '{{FIRST_NAME}}-{{RANDOM_10_30}}-{{FUNC_TEST_1_2}}',
                        delayBefore: 250
                    },
                    expectResult: null,
                    delayBefore: 250
                },
                {
                    selectorType: 'id',
                    selectorQuery: 'lastName',
                    action: {
                        action: 'input',
                        text: '{{LAST_NAME}}-{{RANDOM_10_30}}-{{FUNC_TEST_1_2}}',
                        delayBefore: 250
                    },
                    expectResult: null,
                    delayBefore: 250
                },
                {
                    selectorType: 'xPath',
                    selectorQuery: '//*[@id="mobilePhoneNumber"]/input',
                    action: {
                        action: 'input',
                        text: '999{{RANDOM_1000000_9999999}}',
                        delayBefore: 250
                    },
                    expectResult: null,
                    delayBefore: 250
                },
                {
                    selectorType: 'xPath',
                    selectorQuery: '//*[@id="rootBody"]/app-root/div/ng-sidebar-container/div/div/div[2]/app-customer-signup/div/div/div/div/form/div[4]/div/div/div/label/i',
                    action: {
                        action: 'click'
                    },
                    expectResult: null,
                    delayBefore: 250
                },
                {
                    selectorType: 'xPath',
                    selectorQuery: '//*[@id="rootBody"]/app-root/div/ng-sidebar-container/div/div/div[2]/app-customer-signup/div/div/div/div/form/div[8]/div/div/div/label/i',
                    action: {
                        action: 'click'
                    },
                    expectResult: null,
                    delayAfter: 250
                },
                {
                    selectorType: 'xPath',
                    selectorQuery: '//*[@id="rootBody"]/app-root/div/ng-sidebar-container/div/div/div[2]/app-customer-signup/div/div/div/div/form/div[9]/div/div/div/label/i',
                    action: {
                        action: 'click'
                    },
                    expectResult: null,
                    delayAfter: 250
                },
                {
                    selectorType: 'tagName',
                    selectorQuery: 'body',
                    action: {
                        action: 'execute_js',
                        script: 'console.log(12345789)',
                        delayBefore: 250
                    },
                    expectResult: null,
                    delayBefore: 250
                },
            ],
            expectResult: async (page, assert) => {
                await page.findByTagName('body');
                assert.include('Bar', 'ar3', 'include "ar"')
            },
            autoQuiteTimeOut: 1000
        }
    ]
})