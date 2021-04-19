const scenario = require('../../core/create_scenario');
module.exports = scenario.createScenario({
    id: 'welcome_scenario',
    cases: [
        {
            id: 'open_welcome_page',
            url: 'Welcome',
            desc: `
                Open welcome page
                and fill data
            `,
            steps: [
                {
                    selectorType: 'id',
                    selectorQuery: 'email',
                    action: {
                        action: 'input',
                        text: 'pgsw_100_{{RANDOM_10000_99999}}@yopmail.com',
                        delayBefore: 250,
                    },
                    expectResult: async (page, assert) => {
                        await page.findByTagName('body');
                    },
                },
                {
                    selectorType: 'id',
                    selectorQuery: 'firstName',
                    action: {
                        action: 'input',
                        text: 'phong',
                        delayBefore: 250,
                    },
                    expectResult: async (page, assert) => {
                        await page.findByTagName('body');
                    },
                },
                {
                    selectorType: 'id',
                    selectorQuery: 'lastName',
                    action: {
                        action: 'input',
                        text: 'do',
                        delayBefore: 250,
                    },
                    expectResult: async (page, assert) => {
                        const currentUrl = await page.driver.getCurrentUrl();
                        try {
                            const result = assert.include(currentUrl, 'DoB', 'go to next step fail');
                        }
                        catch (e) {
                            throw e;
                        }
                    },
                },
                {
                    selectorType: 'id',
                    selectorQuery: 'next',
                    action: {
                        action: 'click',
                        delayBefore: 250,
                        delayAfter: 2000
                    },
                    expectResult: async (page, assert) => {
                        await page.findByTagName('body');
                        const currentUrl = await page.driver.getCurrentUrl();
                        try {
                            const result = assert.include(currentUrl, 'DoB', 'go to next step fail');
                        }
                        catch (e) {
                            throw e;
                        }
                    },
                }
            ],
            autoQuiteTimeOut: 1000,
            testData: async (utils, scenario) => {
                return [
                    {
                        FIRST_NAME: 'Phong333',
                        LAST_NAME: 'Do333',
                    },
                ];
            },
            expectResult: async (page, assert) => {
                await page.findByTagName(`body`);
            },
        }
    ],
});
