const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const credentialController = require('./controllers/credentialController')

var cors = require('cors')
const app = express()
const port = process.env.PORT || 8080
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const uri = 'mongodb+srv://root:root@firstclusterhyperion.ihkne.mongodb.net/CoolTechDB?retryWrites=true&w=majority';

mongoose.connect(uri, {
    useNewUrlParser: true
})
.then((result) => app.listen(port, ()=>console.log('Listening engaged')))
.catch((err) => console.log(err));

// Endpoints and their respective controllers
app.post('/register', credentialController.register);
app.get('/login', credentialController.login);
app.get('/credentials', credentialController.getCredentials);
app.post('/credentials', credentialController.addCred);
app.put('/credentials/:id', credentialController.updateCred);
app.get('/user/:id', credentialController.getUser);
app.put('/user/:id', credentialController.updateUser);