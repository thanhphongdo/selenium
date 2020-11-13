export class Utils {
    /**
     * 
     * @param {string} keyPath 
     * @param {Object} obj 
     */
    getPropByKeyPath(keyPath: string, obj: any) {
        const prop = null;
        const keys = keyPath.split('->');
        keys.forEach(key => {
            obj = obj[key];
        });
        return obj;
    }
}