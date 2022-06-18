const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Model for division collection
const divisionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    // ID of organisational unit that the division belongs to
    ou_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'organisational-unit',
        required: true
    }
})



let Division = mongoose.model('Divisions', divisionSchema);
module.exports = Division;