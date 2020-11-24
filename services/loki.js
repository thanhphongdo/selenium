const loki = require('lokijs');
const adapter = require('lokijs/src/loki-fs-sync-adapter');

module.exports = class Loki {
    initDB(dbName) {
        this.db = new loki(dbName, {
            autoload: true,
            persistenceAdapter: 'fs'
        });
    }

    loadDB(dbName) {
        return new Promise((res, rej) => {
            this.db.loadDatabase({}, (err) => {
                if (err) {
                    rej(err);
                    return;
                }
                res(true);
            });
        });
    }

    addCollection(collectionName, indices) {
        return this.db.addCollection(collectionName, {indices: indices});
    }

    getCollection(collectionName) {
        return this.db.getCollection(collectionName);
    }

    insert(collection, doc) {
        collection.insert(doc);
        this.db.saveDatabase();
    }

    update(collection, doc) {
        collection.update(doc);
        this.db.save();
    }

    delete(collectionName, doc) {
        this.getCollection(collectionName).remove(doc);
        this.db.save();
    }
}