const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URL;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connection successful');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});