const express = require('express');
const emailRouter = require('./routes/emailRouter')
const smsRouter = require('./routes/smsRouter');
require('./database/DB')
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/v1/', emailRouter )
app.use('/api/v1/', smsRouter )
app.listen(port, () => {
    console.log(`Port is start on ${port}`);
})