const express = require('express');
const qBankRouter = require('./routes/qbank-router');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.write('Welcome to Express QBank app');
    res.end();
});
app.listen(7200, () => {
    console.log('Server listening to port 7200');
});

app.use('/qbank',qBankRouter);
