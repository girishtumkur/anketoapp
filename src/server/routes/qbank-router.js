const express = require('express');
var router = express.Router([{ mergeParams: true }]);

router.get('/fetchQ', (req, res) => {
    const qBankQuery = require('../db/qbank-query');
    (async function query() {
        let qBankList = await qBankQuery();
        let qList = { questions: qBankList };
        res.end(JSON.stringify(qList));
    })();

});
router.post('/submitAnswers', (req, res) => {
    const saveAnswersDb = require('../db/app-qbank-ans-post');
    let app = {};
    const { questions, emailId } = req.body;
    app.emailId = emailId;
    console.log(questions);
    let response = saveAnswersDb(questions, app);
    response.then(data => console.log('after insert data::' + data.app_number));
    res.end(JSON.stringify("Success"));
})
module.exports = router;