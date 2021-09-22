const { ClickHouse } = require('clickhouse');

const clickhouse = new ClickHouse({
    url: '',
    port: 8123,
    debug: false,
    basicAuth: {
        username: '',
        password: '',
    },
    isUseGzip: false,
    format: "json", // "json" || "csv" || "tsv"
    raw: false,
    config: {
        database: '',
    }
});

module.exports = {
    exec_sql: function exec_sql(query) {
        return clickhouse.query(query + ' FORMAT JSON').toPromise()
    }
};