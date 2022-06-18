const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Model for credential collection
const credentialSchema = new Schema({
    /* Column for credential's username, password, as well as the user which the credential belongs to,
     the website the credential is used for, and the division that the credential belongs to*/
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    user_id:{
        type:  mongoose.Schema.Types.ObjectId, ref: 'user',
        required: true
    },
    site:{
        type: String,
        required: true
    },
    div_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'division',
    }
})

let Credentials = mongoose.model('Credentials', credentialSchema);
module.exports = Credentials;