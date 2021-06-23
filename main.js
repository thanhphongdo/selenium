const Scenario = require('./core/scenario');
const projects = require('./projects/index');
// let scenario = new Scenario(require(`./projects/${projects.creditstrong.projectId}/${projects.creditstrong.scenarios[0].id}.js`));
let scenario = new Scenario(projects.creditstrong.scenarios.welcome_scenario);
async function start() {
    try {
        // await scenario.run();
        await scenario.runCaseById('input_dob')
    }
    catch (e) {
        if (e.message) {
            console.log(e.message);
        } else {
            console.log('CASE ERROR');
        }
    }
}
start();



// let firstScenarioData = scenarioData[0];
// let refScenario = JSON.parse(JSON.stringify(firstScenarioData));

// firstScenarioData.cases.forEach((caseItem, caseIndex) => {
//     //Test Data
//     if (typeof caseItem.testData == 'function') {
//         refScenario.cases[caseIndex].testData = `{{cases->${caseIndex}->testData}}`;
//     }
//     else if (Array.isArray(caseItem.testData)) {
//         caseItem.forEach((testDataItem, testDataIndex) => {
//             let keys = Object.keys(testDataItem);
//             keys.forEach((key, index) => {
//                 if (typeof testDataItem[key] == 'function') {
//                     refScenario.cases[caseIndex].testData[testDataIndex][key] = `{{cases->${caseIndex}->testData->${testDataIndex}->${key}}}`
//                 }
//             });
//         });
//     } else {
//         let keys = Object.keys(caseItem.testData);
//         keys.forEach((key, index) => {
//             if (typeof caseItem.testData[key] == 'function') {
//                 refScenario.cases[caseIndex].testData[key] = `{{cases->${caseIndex}->testData->${key}}}`;
//             }
//         });
//     }

//     //Steps
//     caseItem.steps.forEach((stepItem, stepIndex) => {
//         if(typeof stepItem.expectResult == 'function'){
//             refScenario.cases[caseIndex].steps[stepIndex].expectResult = `{{cases->${caseIndex}->steps->${stepIndex}->expectResult}}`;
//         }
//     });

//     //expectResult
//     if(typeof caseItem.expectResult == 'function'){
//         refScenario.cases[caseIndex].expectResult = `{{cases->${caseIndex}->expectResult}}`;
//     }
// });

// console.log(firstScenarioData);

// const codeServices = require('./services/code');

// codeServices.saveCode('./projects/test/index.js', codeServices.formatJSCode(`function test(){return 1}`));