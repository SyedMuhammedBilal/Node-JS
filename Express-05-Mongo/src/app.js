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
        const reactPlaylist = new Playlist({
            name: "ReactJS",
            cType: "Frontend",
            videos: 4,
            author: "Facebook",
            active: true
        });
        
        const result = await reactPlaylist.save();
        console.log(result);
    } catch(err) {
        console.log(err)
    }
}

// createDocument();


// updating a document in MongoDB
const updateDocument = async (id, name) => {
    try {
        // const result = await Playlist.updateOne({ _id: id }, {       //
        const result = await Playlist.findByIdAndUpdate({_id: id}, {
            $set: {
                name: name
            }
        }, {
            new: true,
            useFindAndModify: false
        })
        console.log(result);
    } catch (error) {
        console.log(error)
    }
};

// updateDocument('605049e015514e054c79646e', 'ReactJS');


// deleting a document

const deleteDocument = async (id) => {
    try {
        // const result = await Playlist.deleteOne({ _id: id })
        const result = await Playlist.findByIdAndDelete({ _id: id }) // to show the document which is deleted
        console.log(result);
    } catch (error) {
        console.log(error)
    }
};

deleteDocument('605049e015514e054c79646e')