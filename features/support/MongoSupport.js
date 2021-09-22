const MongoClient = require('mongodb').MongoClient;
const url = "";

module.exports = {
    mongo_find: function mongo_find(dbName, collectionName, query) {
        return new Promise((resolve, reject) => {
            MongoClient.connect(url, {useNewUrlParser: true,useUnifiedTopology: true}, function (err, db) {
                if (err) {
                    reject(err)
                }
                let dbo = db.db(dbName)
                dbo.collection(collectionName).find(query).toArray(function (err, result) { // 返回集合中所有数据
                    if (err) {
                        reject(err)
                    }else {
                        resolve(result)
                    }
                    db.close()
                })
            })
        })
    }
}