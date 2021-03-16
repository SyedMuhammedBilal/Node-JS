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

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cType: String,
    videos: Number,
    author: String,
    active: Boolean,
    date: {
        type: Date,
        default: Date.now()
    }
});

// A mongoose modal is a wrapper on the mongoose schema.
// A mongoose schema defines the structure of the document
// whereas a mongoose modal provides an interface to the database 
// for creating querying, deleting records etc...

const Playlist = new mongoose.model('Playlist', playlistSchema);

// creating or inserting a new document in database

const createDocument = async () => {
    try {
        const nodejsPlaylist = new Playlist({
            name: "NodeJS",
            cType: "Backend",
            videos: 4,
            author: "unknown",
            active: true
        });
        const expressPlaylist = new Playlist({
            name: "ExpressJS",
            cType: "Backend",
            videos: 4,
            author: "idk",
            active: true
        });
        const vuePlaylist = new Playlist({
            name: "VueJS",
            cType: "Frontend",
            videos: 4,
            author: "idk",
            active: true
        });
        
        const result = await Playlist.insertMany([
            nodejsPlaylist,
            expressPlaylist,
            vuePlaylist
        ]);
        console.log(result);
    } catch(err) {
        console.log(err)
    }
}

// createDocument();


// get all the documents from the database

const getDocument = async () => {
    const result = await Playlist.find({cType: 'Backend'}).select({name: 1}); // select for getting only name from the document in which cType is backend
    console.log(result);
};

getDocument();