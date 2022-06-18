const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Model for organisational unit collection
const ouSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

let Ou = mongoose.model('Organisational-units', ouSchema);
module.exports = Ou;