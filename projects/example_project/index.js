const scenarios = [{ "id": "first_scenario", "desc": "this is first scenario" }];
module.exports = {
    metadata: {
        "projectId": "example_project",
        "projectTitle": "Project example",
        "projectDesc": "This is the example project",
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
