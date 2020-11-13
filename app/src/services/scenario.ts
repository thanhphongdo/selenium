export class ScenarioService {
    /**
     * 
     * @param {object} code 
     */
    encodeScenarioFunction(scenario: any) {
        const refScenario = JSON.parse(JSON.stringify(scenario));

        scenario.cases.forEach((caseItem: any, caseIndex: any) => {
            //Test Data
            if (typeof caseItem.testData == 'function') {
                refScenario.cases[caseIndex].testData = `{{{cases->${caseIndex}->testData}}}`;
            }
            else if (Array.isArray(caseItem.testData)) {
                caseItem.forEach((testDataItem: any, testDataIndex: any) => {
                    const keys = Object.keys(testDataItem);
                    keys.forEach((key, index) => {
                        if (typeof testDataItem[key] == 'function') {
                            refScenario.cases[caseIndex].testData[testDataIndex][key] = `{{{cases->${caseIndex}->testData->${testDataIndex}->${key}}}}`
                        }
                    });
                });
            } else {
                if (caseItem.testData) {
                    const keys = Object.keys(caseItem.testData);
                    keys.forEach((key, index) => {
                        if (typeof caseItem.testData[key] == 'function') {
                            refScenario.cases[caseIndex].testData[key] = `{{{cases->${caseIndex}->testData->${key}}}}`;
                        }
                    });
                }
            }

            //Steps
            caseItem.steps.forEach((stepItem: any, stepIndex: any) => {
                if (typeof stepItem.expectResult == 'function') {
                    refScenario.cases[caseIndex].steps[stepIndex].expectResult = `{{{cases->${caseIndex}->steps->${stepIndex}->expectResult}}}`;
                }
                //Actions
                if (stepItem.action && typeof stepItem.action.actionFunc == 'function') {
                    refScenario.cases[caseIndex].steps[stepIndex].action.actionFunc = `{{{cases->${caseIndex}->steps->${stepIndex}->action->actionFunc}}}`;
                }
            });

            //expectResult
            if (typeof caseItem.expectResult == 'function') {
                refScenario.cases[caseIndex].expectResult = `{{{cases->${caseIndex}->expectResult}}}`;
            }
        });
        return {
            reg: /{{{(\s+)?((\w|([\-\>])))+(\s+)?}}}/g,
            refScenario: JSON.stringify(refScenario)
        }
    }
}