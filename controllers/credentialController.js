const User = require('../models/user')
const Division = require('../models/division');
const Credentials = require('../models/credentials');
const jwt = require('jsonwebtoken');

// Verifies username and password, and upon successful verification generates a JWT
const register = (req,resp) => {
    const crendentialInput = req.body;
    let credentialFetched;

    // Async function
    async function verifyDetails(details) {
        /* First we search through credentials to check that the given credential exists in our DB 
        (and that the credential is for the logging in to the credential site), then save as 'credentialFetched'*/
        await Credentials.findOne({"username": details.username, "password": details.password, "site":"credentials"})
        .then((result) => {
            console.log(result)
            credentialFetched = result;
        })
        .catch((err) =>{
            console.log(err);
        })
        // If the credential has been found, generate JWT
        if (credentialFetched != null) {
            // First fetch the info on the user that is linked to the credential, we can get things like their name and role
            await User.findById(credentialFetched.user_id)
            .then((result) => {
                userDetails = result;
                // Send JWT in response
                payload = {
                    'name': userDetails.name + " " + userDetails.surname,
                    'role': userDetails.role,
                    'div_id': userDetails.division_id
                }
                const token = jwt.sign(JSON.stringify(payload), 'jwt-secret', {algorithm: 'HS256'});
                resp.send({'token': token});
            })
            .catch((err) =>{
                console.log(err);
            })
        }
        // If credential not found, send error message
        else {
            resp.status(403).send({'err': 'Incorrect login'});
        }
    }
    verifyDetails(crendentialInput);
}

// Login checks and decodes inputted JWT and either logs user in and sends decoded info or sends error message
const login = (req,resp) => {
    const auth = req.headers['authorization']
    const token = auth.split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'jwt-secret')
        resp.send(decoded);
    }
    catch (err) {
        resp.status(401).send({'err': 'Bad JWT!'})
    }
}

// Get all credentials from DB
const getCredentials = (req, resp) => {
    // Async function
    async function getCred(decoded) {
        let credArr;
        // First get all credentials that are in same division as what JWT specifies
        await Credentials.find({div_id: decoded.div_id})
        .then((result) => {
            console.log(result);
            credArr = result;
        })
        .catch((err) =>{
            console.log(err);
        })
        // Get name of division
        await Division.findById(decoded.div_id)
        .then((result) => {
            console.log(result);
            // Send array of [division name, credentials] in response
            resp.send([result.name, credArr])
        })
        .catch((err) =>{
            console.log(err);
        })
    }
    // Get token from header and decode
    const auth = req.headers['authorization']
    const token = auth.split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'jwt-secret');
        // Trigger async function if the decoded role is correct
        if (decoded.role === 'normal' || decoded.role === 'admin' || decoded.role === 'mgmt') {
           getCred(decoded);
        }
        // Else send error message
        else {
            resp.status(403).send({'msg': 'Permission denied!'})
        }
    }
    // If JWT doesn't work, send error message
    catch (err) {
        resp.status(401).send({'err': 'Bad JWT!'})
    }
} 

// Add new credential
const addCred = (req, resp) => {
    // Async function
    async function asyncAdd(details) {
        let div;
        /* First we need to get the division_id of the user that the cred is linked to (the rest of the details have been sent
        in req.body.)*/
        await User.findById(details.user_id)
        .then((result) => {
            // Save division id as 'div'
            div = result.division_id;
        })
        .catch((err) =>{
            console.log(err);
        })
        // Add Credential 'cred' to DB
        const cred = new Credentials({username: details.username, password: details.password, user_id: details.user_id,
                                        site: details.site, div_id: div});
        cred.save()
        .then((result) => {
            resp.send(result)
        })
        .catch((err) =>{
            console.log(err);
        })
    }
    // Verify JWT
    const auth = req.headers['authorization']
    const token = auth.split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'jwt-secret')
        // Check user role
        if (decoded.role === 'normal' || decoded.role === 'admin' || decoded.role === 'mgmt') {
           // Trigger async
           asyncAdd(req.body);
        }
        else {
            resp.status(403).send({'msg': 'Permission denied!'})
        }
    }
    catch (err) {
        resp.status(401).send({'err': 'Bad JWT!'})
    }
} 

// Update a specific credential
const updateCred = (req,resp) => {
    const auth = req.headers['authorization']
    const token = auth.split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'jwt-secret');
        // Verify user permissions
        if (decoded.role === 'admin' || decoded.role === 'mgmt') {
            // ID is sent in params
            const newId = req.params.id;
            const cred = req.body;
            // Update cred by ID
            Credentials.findByIdAndUpdate(newId, cred)
            .then((result) => {
                resp.send(result)
            })
            .catch((err) =>{
                console.log(err);
            });
        }
        else {
            resp.status(403).send({'msg': 'Permission denied!'})
        }
    }
    catch (err) {
        resp.status(401).send({'err': 'Bad JWT!'})
    }
}

// Get all info about a specific user
const getUser = (req, resp) => {
    const auth = req.headers['authorization']
    const token = auth.split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'jwt-secret')
        // Check user role
        if (decoded.role === 'admin') {
            const user_id = req.params.id;
            // Get info and send in response
            User.findById(user_id)
            .then((result) => {
                resp.send(result)
            })
            .catch((err) =>{
                console.log(err);
            });
        }
        else {
            resp.status(403).send({'msg': 'Permission denied!'})
        }
    }
    catch (err) {
        resp.status(401).send({'err': 'Bad JWT!'})
    }
}

// Updates user
const updateUser = (req,resp) => {
    // Async function
    async function updateUserAsync(id, user) {
        // First update all credentials associated with the user, and update these credentials' divisions
        await Credentials.updateMany({user_id: id}, {div_id: user.division_id})
        .then((result) => {
            console.log(result);
        })
        .catch((err) =>{
            console.log(err);
        });
        // Then update User document
        await User.findByIdAndUpdate(id, user)
        .then((result) => {
            resp.send(result)
        })
        .catch((err) =>{
            console.log(err);
        });
    }

    const auth = req.headers['authorization']
    const token = auth.split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'jwt-secret')
        // Check user role
        if (decoded.role === 'admin') {
            const newId = req.params.id;
            const user = req.body;
            // Trigger async function and send details through its parameters
            updateUserAsync(newId, user);
        }
        else {
            resp.status(403).send({'msg': 'Permission denied!'})
        }
    }
    catch (err) {
        resp.status(401).send({'err': 'Bad JWT!'})
    }
}

// Export
module.exports = {
    register,
    login,
    getCredentials,
    addCred,
    updateCred,
    getUser,
    updateUser
}