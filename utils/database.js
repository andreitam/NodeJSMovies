const mysql = require('mysql2');

const promisify = function(conn, sqlQueryString) {
    return new Promise(function (resolve, reject) {
        conn.query(sqlQueryString, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};


const database = () => {
    const mysqlPool =  mysql.createPool({
        host: '127.0.0.1',
        user: 'root',
        database: 'si',
        connectionLimit: 100,
        multipleStatements: true
    })
    return {
        query: (sqlQueryString, callback) => {
            if (typeof arguments[2] === 'function' || typeof arguments[2] === 'undefined' && typeof arguments[1] === 'function') {
                mysqlPool.query(sqlQueryString, callback);
            } else {
                // returns a promise
                return  promisify(mysqlPool, sqlQueryString);
            }
        }
    }
};

module.exports = database ;