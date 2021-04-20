const scenario = require('../../core/create_scenario');
const scenarioDef = scenario.createScenario({
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
                    id: 'owp_input_email',
                    selectorType: 'id',
                    selectorQuery: 'email',
                    action: {
                        action: 'input',
                        text: 'pgsw_100_{{RANDOM_10000_99999}}@yopmail.com',
                        delayBefore: 250,
                    },
                    expectResult: async (page, assert) => {
                    },
                },
                {
                    id: 'owp_input_fName',
                    selectorType: 'id',
                    selectorQuery: 'firstName',
                    action: {
                        action: 'input',
                        text: '{{FIRST_NAME}}',
                        delayBefore: 250,
                    },
                    expectResult: async (page, assert) => {
                    },
                },
                {
                    id: 'owp_input_lName',
                    selectorType: 'id',
                    selectorQuery: 'lastName',
                    action: {
                        action: 'input',
                        text: '{{LAST_NAME}}',
                        delayBefore: 250,
                    },
                    expectResult: async (page, assert) => {

                    },
                },
                {
                    id: 'owp_btn_next_click',
                    selectorType: 'id',
                    selectorQuery: 'next',
                    action: {
                        action: 'click',
                        delayBefore: 250,
                        delayAfter: 5000
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
                        FIRST_NAME: 'Phong',
                        LAST_NAME: 'Do',
                    },
                    {
                        FIRST_NAME: 'PhongX',
                        LAST_NAME: 'DoX',
                    },
                ];
            },
            expectResult: async (page, assert) => {
                await page.findByTagName(`body`);
            },
        },
        {
            id: 'input_dob',
            url: 'Welcome',
            desc: `
                Open welcome page
                and fill data
            `,
            steps: [
                {
                    id: 'idob_copy_from_open_welcome_page',
                    copy: {
                        projectId: 'creditstrong',
                        scenarioId: 'welcome_scenario',
                        caseId: 'open_welcome_page',
                        stepIds: ['owp_input_email', 'owp_input_fName', 'owp_input_lName', 'owp_btn_next_click'],
                        copyAllStep: true
                    }
                },
                {
                    id: 'idob_input_dob',
                    selectorType: 'xPath',
                    selectorQuery: '//*[@id="rootBody"]/app-root/div/div/ng-sidebar-container/div/div/div[2]/app-sign-up-dob/div/app-page-container/div/div/div/div/div[2]/form/div[1]/div/div/p-inputmask/input',
                    action: {
                        action: 'click_input',
                        text: '12121992',
                        delayBefore: 250,
                    },
                    expectResult: async (page, assert) => {
                    },
                },
                {
                    id: 'idob_btn_next_click',
                    selectorType: 'id',
                    selectorQuery: 'next',
                    action: {
                        action: 'click',
                        delayBefore: 250,
                        delayAfter: 5000
                    },
                    expectResult: async (page, assert) => {
                        const currentUrl = await page.driver.getCurrentUrl();
                        try {
                            const result = assert.include(currentUrl, 'MobilePhone', 'go to next step fail');
                        }
                        catch (e) {
                            throw e;
                        }
                    },
                }
            ],
            autoQuiteTimeOut: 1000,
            testData: async (utils, scenario) => {
                return {
                    FIRST_NAME: 'Phong',
                    LAST_NAME: 'Do',
                }
            },
            expectResult: async (page, assert) => {
                await page.findByTagName(`body`);
            },
        }
    ],
});

module.exports = scenarioDef;