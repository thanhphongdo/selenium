const reg = /{{[\w|\s]+}}/g;
const prettier = require('prettier');

module.exports = class Utils {
    /**
     * 
     * @param {number} from 
     * @param {number} to 
     */
    random(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    /**
     * 
     * @param {string} templace 
     * @param {Object} data 
     */
    stringReplace(templace, data) {
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
     * @param {string} template 
     * @param {Object} data 
     */
    valueReplace(template, data) {
        if (!data) data = {};
        let randomReg = /{{(\s+)?RANDOM(\s+)?}}/g;
        let randomFromToReg = /{{(\s+)?RANDOM_\d+_\d+(\s+)?}}/g;
        let matchRandomFromTo = template.match(randomFromToReg);
        if (matchRandomFromTo && matchRandomFromTo.length) {
            matchRandomFromTo.forEach(item => {
                let randomKey = item.replace('{{', '').replace('}}', '').trim();
                let randomFrom = parseInt(randomKey.split('_')[1]);
                let randomTo = parseInt(randomKey.split('_')[2]);
                if (!data[randomKey]) data[randomKey] = this.random(randomFrom, randomTo);
            });
        }
        let funcReg = /{{(\s+)?FUNC_(\w+)(\s+)?}}/g;
        let matchFuncReg = template.match(funcReg);
        if (matchFuncReg && matchFuncReg.length) {
            matchFuncReg.forEach(async item => {
                let funcName = item.replace('{{', '').replace('}}', '').trim();
                let func = funcName.split('_');
                let params = func.slice(2);
                if (data[funcName] && typeof data[funcName] == 'function') {
                    data[funcName] = data[funcName](this, ...params);
                }
            });
        }
        return this.stringReplace(template, data);
    }

    async readCSV() {}
}