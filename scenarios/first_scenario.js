const config = require('../config/index');

module.exports = {
    id: 'first_scenario',
    cases: [
        {
            id: 'open_page',
            url: `${config.baseUrl}/applicant`,
            steps: [
                {
                    selectorType: 'id',
                    selectorQuery: 'email',
                    actions: [
                        {
                            action: 'input',
                            text: 'pgsw0880@yopmail.com'
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
                            text: 'Phong'
                        }
                    ],
                    expectResults: []
                },
                {
                    selectorType: 'id',
                    selectorQuery: 'lastName',
                    actions: [
                        {
                            action: 'input',
                            text: 'Do'
                        }
                    ],
                    expectResults: []
                },
                {
                    selectorType: 'xPath',
                    selectorQuery: '//*[@id="mobilePhoneNumber"]/input',
                    actions: [
                        {
                            action: 'input',
                            text: '1234456459'
                        }
                    ],
                    expectResults: []
                },
                {
                    selectorType: 'xPath',
                    selectorQuery: '//*[@id="rootBody"]/app-root/div/div/ng-sidebar-container/div/div/div[2]/app-customer-signup/div/div/div/div/form/div[4]/div/div/div/label',
                    event: 'click',
                    expectResults: []
                },
                {
                    selectorType: 'xPath',
                    selectorQuery: '//*[@id="rootBody"]/app-root/div/div/ng-sidebar-container/div/div/div[2]/app-customer-signup/div/div/div/div/form/div[8]/div/div/div/label',
                    event: 'click',
                    expectResults: []
                },
                {
                    selectorType: 'xPath',
                    selectorQuery: '//*[@id="rootBody"]/app-root/div/div/ng-sidebar-container/div/div/div[2]/app-customer-signup/div/div/div/div/form/div[9]/div/div/div/label',
                    event: 'click',
                    expectResults: []
                },
            ],
            autoQuiteTimeOut: 15000
        }
    ]
}