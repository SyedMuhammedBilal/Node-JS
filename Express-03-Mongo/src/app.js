const mongoose = require('mongoose');

// creating a connection b/w DataBase and NodeJS
const uri = "mongodb+srv://syed_bilal:1234@cluster0.wwm7o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connection successful')
}).catch(err => {
    console.log(err)
});

// SCHEMA
// defining the schema the structure of the document
// default values, validator etc...

