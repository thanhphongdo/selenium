const scenarios = [{ "id": "welcome_scenario", "desc": "Welcome Scenario" }];
module.exports = {
    metadata: {
        "projectId": "creditstrong",
        "projectTitle": "Credit Strong",
        "projectDesc": "Automation test for CS  Application",
        "scenarios": scenarios
    },
    scenario: scenarios.reduce((scenarios, item) => {
        const scenario = require(`./${item.id}.js`);
        return {
            ...scenarios,
            [item.id]: scenario
        }
    }, {})
}
