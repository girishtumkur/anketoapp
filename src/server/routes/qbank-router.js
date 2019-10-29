const express = require('express');
var router = express.Router([{ mergeParams: true }]);

router.get('/fetchQ', (req, res) => {
    const qBankQuery = require('../db/qbank-query');
    (async function query() {
        let qBankList = await qBankQuery();
        let qList ={ questions : qBankList} ;
        res.end(JSON.stringify(qList));
    })();

});
module.exports = router;