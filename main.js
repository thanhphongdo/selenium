const Scenario = require('./core/scenario');
const scenarioData = require('./scenarios/index');
let scenario = new Scenario(scenarioData[0]);
async function start() {
    await scenario.run();
    // setTimeout(async () => {
    //     await scenario.run();
    // }, 1500);

}
start();