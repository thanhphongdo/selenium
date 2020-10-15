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

// const {assert, expect, should} = require('chai');

// let foo = 'bar2'
// let beverages = {tea: ['chai', 'matcha', 'oolong']};
// try {
//     // assert.typeOf(foo, 'string'); // without optional message
//     assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
//     assert.include(foo, 'ar2', 'include "ar"')
//     // // assert.equal(foo, 'bar2', 'foo equal `bar`');
//     // assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
//     // assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');

//     // expect(foo, 'foo should is a string').to.be.a('bool');
//     // expect(foo).to.equal('bar');
//     // expect(foo).to.have.lengthOf(3);
//     // expect(beverages).to.have.property('tea').with.lengthOf(3);
    
// }
// catch (err) {
//     console.log(err.message);
// }