async function appQBankPost(questions, app_data) {
    return new Promise(function (resolve, reject) {
        const { Pool } = require('pg')
        const pool = new Pool()
            ; (async () => {
                // note: we don't try/catch this because if connecting throws an exception
                // we don't need to dispose of the client (it will be undefined)
                const client = await pool.connect()

                try {
                    await client.query('BEGIN')
                    const queryText = 'INSERT INTO qapp(email) VALUES($1) RETURNING app_number'
                    const res = await client.query(queryText, [app_data.emailId]);
                    const appNumber = res.rows[0].app_number;

                    for (var i = 0; i < questions.length; i++) {
                        const insertAnsText = 'INSERT INTO qapp_answers(record_id, app_number, selected_answer) VALUES ($1, $2, $3)';
                        const insertAnsValues = [questions[i].record_id, appNumber, [questions[i].selectedAnswer]];
                        await client.query(insertAnsText, insertAnsValues);
                    }
                    await client.query('COMMIT')
                    resolve(res.rows[0]);
                } catch (e) {
                    await client.query('ROLLBACK')
                    throw e
                } finally {
                    client.release()
                }
            })().catch(e => console.error(e.stack))
    }
    )
}

module.exports = appQBankPost;
