const redis = require('redis');

let server = '';

module.exports = {
    get_key_value: function get_key(dbnum, key) {
        return new Promise((resolve, reject) => {
            const client = redis.createClient(6379, server);
            client.select(dbnum, function (error) {
                if (error) {
                    reject(error);
                    client.end(true)
                } else {
                    client.get(key, function (error, res) {
                        if (error) {
                            reject(error)
                        } else {
                            resolve(res)
                        }
                        client.end(true)
                    })
                }
            })
        })
    },
    set_key_value: function set_key(dbnum, key, value) {
        return new Promise((resolve, reject) => {
            const client = redis.createClient(6379, server);
            client.select(dbnum, function (error) {
                if (error) {
                    reject(error)
                    client.end(true)
                } else {
                    client.set(key, value, function (error, res) {
                        if (error) {
                            reject(error)
                        } else {
                            resolve(res)
                        }
                        //设置ttl
                        // client.expire(key, 120);
                        client.end(true)
                    })
                }
            })
        })
    }
};