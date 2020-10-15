const config = require('../../config/index');

module.exports = {
    id: 'first_scenario',
    cases: [
        {
            id: 'open_page',
            url: `${config.baseUrl}/`,
            steps: [
                {
                    selectorType: 'name',
                    selectorQuery: 'q',
                    actions: [
                        {
                            action: 'input',
                            text: 'how to use google?'
                        }
                    ],
                    expectResults: []
                },
                {
                    selectorType: 'xPath',
                    selectorQuery: '//*[@id="gb_70"]',
                    event: 'click',
                    expectResults: []
                },
                {
                    selectorType: 'id',
                    selectorQuery: 'identifierId',
                    actions: [
                        {
                            action: 'input',
                            text: 'phongdo.sw2@gmail.com'
                        }
                    ],
                    expectResults: []
                },
                {
                    selectorType: 'xPath',
                    selectorQuery: '//*[@id="identifierNext"]/div/button/div[2]',
                    event: 'click',
                    expectResults: []
                }
            ],
            autoQuiteTimeOut: 5000
        }
    ]
}