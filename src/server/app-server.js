const express = require('express');

const qBankRouter = require('./routes/qbank-router');

const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', (req, res) => {
    res.write('Welcome to Express QBank app');
    res.end();
});
app.listen(7200, () => {
    console.log('Server listening to port 7200');
});

app.use('/qbank',qBankRouter);
