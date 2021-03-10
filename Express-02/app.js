const express = require('express');
const app = express();


// ExpressJS will stringify the object to JSON data in BTS
app.get('/', (req, res) => {
    // res.send or res.json is same, but res.json covert non-object to undefined or null
    res.json([
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