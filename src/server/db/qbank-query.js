const {Pool} = require('pg');
const pool = new Pool();

async function qBankQuery() {
    const db = await  pool.connect();
    const sqlQuery = "select * from qbank";
    const results = await db.query(sqlQuery);
    let qBankList = [];
    results.rows.forEach(element => {
        qBankList.push(element);
    });
    db.release();
    return qBankList;
}
module.exports = qBankQuery;