const express = require('express');
const User = require('./models/userSchema');
const dotenv = require('dotenv');
const app = express();

require('./db/conc');
dotenv.config({ path: '../config.env' });

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(require('./routes/route'))

app.listen(port, () => {
    console.log(`server started at port ${port}`)
});