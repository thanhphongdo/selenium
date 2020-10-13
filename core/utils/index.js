const reg = /{{[\w|\s]+}}/g;

/**
 * 
 * @param {number} from 
 * @param {number} to 
 */
function random(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

/**
 * 
 * @param {string} templace 
 * @param {Object} data 
 */
function stringReplace(templace, data) {
    if (!data) data = {};
    let matchReg = templace.match(reg);
    let stringReplace = templace;
    if (matchReg && matchReg.length) {
        matchReg.forEach(item => {
            let key = item.replace('{{', '').replace('}}', '').trim();
            stringReplace = stringReplace.replace(item, data[key]);
        });
    }
    return stringReplace;
}

/**
 * 
 * @param {string} templace 
 * @param {Object} data 
 */
function valueReplace(template, data) {
    if (!data) data = {};
    let randomReg = /{{(\s+)?RANDOM(\s+)?}}/g;
    let randomFromToReg = /{{(\s+)?RANDOM_\d+_\d+(\s+)?}}/g;
    let matchRandomFromTo = template.match(randomFromToReg);
    if (matchRandomFromTo && matchRandomFromTo.length) {
        matchRandomFromTo.forEach(item => {
            let randomKey = item.replace('{{', '').replace('}}', '').trim();
            let randomFrom = parseInt(randomKey.split('_')[1]);
            let randomTo = parseInt(randomKey.split('_')[2]);
            if (!data[randomKey]) data[randomKey] = random(randomFrom, randomTo);
        });
    }
    return stringReplace(template, data);
}

module.exports = {random, stringReplace, valueReplace}