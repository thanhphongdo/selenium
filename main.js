const Scenario = require('./core/scenario');
const scenarioData = require('./scenarios/index');
let scenario = new Scenario(scenarioData[0]);
async function start() {
    await scenario.run();
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
