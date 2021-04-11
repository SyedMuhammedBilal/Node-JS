const mongoose = require('mongoose');

const URI = 'mongodb+srv://syed_bilal:1234@cluster0.wwm7o.mongodb.net/TestDB?retryWrites=true&w=majority';

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }).then(() => {
    console.log('connection successfull')
}).catch((err) => {
    console.log(err)
});