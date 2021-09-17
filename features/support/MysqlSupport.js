const mysql = require('mysql');

module.exports = {
    exec_sql: function exec_sql(sql, mysqlpool) {
        return new Promise((resolve, reject) => {
            const pool = mysql.createPool(mysqlpool);
            pool.getConnection((err, conn) => {
                if (err) {
                    reject(err);
                } else {
                    conn.query(sql, (error, res) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(res);
                        }
                        conn.destroy();
                    });
                }
            })
        })
    }
};