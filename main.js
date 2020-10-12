// let Page = require('./page');
// const {Builder, By, until} = require('selenium-webdriver');

// let page = new Page();
// let driver = page.driver;
// page.visit('https://www.google.com/').then(p => {
//     page.findByName('q').then(d => {
//         console.log(d);
//         d.getAttribute('title').then(t => {
//             console.log(t);
//         }).catch(err => {
//             console.log(err);
//         });
//         page.write(d, 'testing').then(d => {
//             console.log(d);
//         }).catch(err => {
//             console.log(err);
//         })
//     }).catch(err => {
//         console.log(err);
//     })
// }).catch(err => {
//     console.log(err);
// });
const Scenario = require('./core/scenario');
const scenarioData = require('./scenarios/index');
let scenario = new Scenario(scenarioData[0]);
scenario.run();