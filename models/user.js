const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Model for user collection
const userSchema = new Schema({
    /*Column for name, has multiple columns for division in case the user belongs to multiple divisions, also a column for
    user's role which determines their permissions*/
    surname: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    division_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'division',
        required: true
    },
    division_id2: {
        type: mongoose.Schema.Types.ObjectId, ref: 'division',
        required: false
    },
    division_id3: {
        type: mongoose.Schema.Types.ObjectId, ref: 'division',
        required: false
    },
    role: {
        type: String,
        required: true
    }
})

let User = mongoose.model('User', userSchema);
module.exports = User;