const express = require('express');
const app = express();


// ExpressJS will stringify the object to JSON data in BTS
app.get('/', (req, res) => {
    res.send([
        {
            id: 1,
            name: 'Syed Bilal',
            age: 18
        }
    ]);
});

app.listen(8080, () => {
    console.log('listening on port 8080')
});