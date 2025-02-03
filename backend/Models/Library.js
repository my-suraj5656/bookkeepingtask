const { required, ref } = require("joi");
const mongoose = require("mongoose");

const libraryschema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    }]
})

const Library = mongoose.model("Library", libraryschema);
module.exports = Library