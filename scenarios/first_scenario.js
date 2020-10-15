const config = require('../config/index');
const scenario = require('./create_scenario');
module.exports = scenario.createScenario({
    id: 'first_scenario',
    cases: [
        {
            id: 'open_page',
            url: `${config.baseUrl}/applicant`,
            testData: {
                FIRST_NAME: 'Phong',
                LAST_NAME: 'Do'
            },
            steps: [
                {
                    selectorType: 'id',
                    selectorQuery: 'email',
                    actions: [
                        {
                            action: 'input',
                            text: 'pgsw_100_{{RANDOM_10000_99999}}@yopmail.com',
                            delayBefore: 500
                        }
                    ],
                    expectResults: []
                },
                {
                    selectorType: 'id',
                    selectorQuery: 'firstName',
                    actions: [
                        {
                            action: 'input',
                            text: '{{FIRST_NAME}}-{{RANDOM_10_30}}',
                            delayBefore: 500
                        }
                    ],
                    expectResults: [],
                    delayBefore: 500
                },
                {
                    selectorType: 'id',
                    selectorQuery: 'lastName',
                    actions: [
                        {
                            action: 'input',
                            text: '{{LAST_NAME}}-{{RANDOM_10_30}}',
                            delayBefore: 500
                        }
                    ],
                    expectResults: [],
                    delayBefore: 500
                },
                {
                    selectorType: 'xPath',
                    selectorQuery: '//*[@id="mobilePhoneNumber"]/input',
                    actions: [
                        {
                            action: 'input',
                            text: '999{{RANDOM_1000000_9999999}}',
                            delayBefore: 500
                        }
                    ],
                    expectResults: [],
                    delayBefore: 500
                },
                {
                    selectorType: 'xPath',
                    selectorQuery: '//*[@id="rootBody"]/app-root/div/div/ng-sidebar-container/div/div/div[2]/app-customer-signup/div/div/div/div/form/div[4]/div/div/div/label',
                    actions: [
                        {
                            action: 'click'
                        }
                    ],
                    expectResults: [],
                    delayBefore: 500
                },
                {
                    selectorType: 'xPath',
                    selectorQuery: '//*[@id="rootBody"]/app-root/div/div/ng-sidebar-container/div/div/div[2]/app-customer-signup/div/div/div/div/form/div[8]/div/div/div/label',
                    actions: [
                        {
                            action: 'click'
                        }
                    ],
                    expectResults: [],
                    delayAfter: 500
                },
                {
                    selectorType: 'xPath',
                    selectorQuery: '//*[@id="rootBody"]/app-root/div/div/ng-sidebar-container/div/div/div[2]/app-customer-signup/div/div/div/div/form/div[9]/div/div/div/label',
                    actions: [
                        {
                            action: 'click'
                        }
                    ],
                    expectResults: [],
                    delayAfter: 500
                },
                {
                    selectorType: 'tagName',
                    selectorQuery: 'body',
                    actions: [
                        {
                            action: 'execute_js',
                            script: 'console.log(12345789)',
                            delayBefore: 500
                        }
                    ],
                    expectResults: [],
                    delayBefore: 500
                },
                {
                    selectorType: 'xPath',
                    selectorQuery: '//*[@id="rootBody"]/app-root/div/div/ng-sidebar-container/div',
                    actions: [
                        {
                            action: 'scrollToBottom',
                            scrollTop: 50,
                            scrollLeft: 0
                        }
                    ],
                    expectResults: [],
                    delayBefore: 500
                }
            ],
            autoQuiteTimeOut: 2000
        },
        {
            id: 'case_2',
            testData: {},
            steps: [
                {
                    actions: [
                        {
                            action: ''
                        }
                    ]
                }
            ]
        }
    ]
})