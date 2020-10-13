const Scenario = require('./core/scenario');
const scenarioData = require('./scenarios/index');
let scenario = new Scenario(scenarioData[0]);
scenario.run();