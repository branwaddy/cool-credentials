import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
import Credentials from "./components/Credentials";
import AddCred from "./components/AddCred";
import UpdateCred from "./components/UpdateCred";
import HandleUser from "./components/HandleUser";

function App() {
  // STATES:
  // For providing JWT
  const [tokenGenerated, generateToken] = useState(0);
  // Stores user's name
  const [currentUser, setUser] = useState(0);
  // Store JWT provided by user
  const [currToken, setCurrToken] = useState();
  // Store credentials array
  const [credList, setList] = useState();
  // Store name of current division being viewed
  const [divName, setDiv] = useState();
  // Store info of credential that is being updated
  const [currCred, setCred] = useState();
  // Store info of user being updated
  const [userInfo, setUserInfo] = useState();

  // Function makes post request to endpoint 'url' with body 'data'
  function postData(url, data){
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(response=>response.json());
  }
  // Same as above post request except passes token in header "Authorization"
  function postAuthData(token, url, data){
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(data),
    })
    .then(response=>response.json());
  }

  // Put request with Authorization header
  function putAuthData(token, url, data){
    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify(data),
    })
    .then(response=>response.json());
  }
  // Get request with Auth header
  function getAuthData(token, url){
    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
    })
    .then(response=>response.json());
  }

  // Takes username and password as input and makes post request, gets JWT token back in response
  function register(inputUsername, inputPassword) {
    const details = {"username": inputUsername, "password": inputPassword, "site": "credentials"};
    postData('http://localhost:8080/register', details)
    .then(data => {
      const newToken = data.token;
      generateToken(newToken);
    })
    .catch(error => console.error(error))
  }
  // Takes JWT token as input, makes get request and will set user name as the name if it exists, or false if not
  function login(token) {
    // Also save given token into state to be used in all authorization requests past this point
    setCurrToken(token);
    getAuthData(token, "http://localhost:8080/login")
    .then(data => {
      if (data.name) {
        const user = {"name": data.name};
        setUser(user);
      }
      else {
        setUser(false);
      }
      
    })
    .catch(error => console.error(error))
  }
  // Make get request to get credential list and name of division the user belongs to
  function getCreds() {
    getAuthData(currToken, "http://localhost:8080/credentials")
    .then(result => {
        setList(result[1]);
        setDiv(result[0]);
    })
    .catch(err=>{
        console.log(err);
    })
  }

  // Make post request to add new credential, takes credential details as input
  function postCred(newUsername, newPassword, newSite, newUserId) {
    const data = {username: newUsername, password: newPassword, site: newSite, user_id: newUserId}
    postAuthData(currToken, "http://localhost:8080/credentials", data)
    .then(result => {
     if (result.username) {
      alert("Successfully added!")
     }
     else {
      alert("You do not have permission")
     }
  })
  .catch(err=>{
      console.log(err);
  })
  }
  // Make put request to update credential info
  function putCred(newUsername, newPassword, newSite, newUserId, credId) {
    const data = {username: newUsername, password: newPassword, site: newSite, user_id: newUserId}
    // Pass ID pf credential as param in URL
    putAuthData(currToken, "http://localhost:8080/credentials/" + credId, data)
    .then(result => {
     if (result.username) {
      alert("Successfully updated!")
     }
     else {
      // If info hasnt been fetched, alert user they do not have permission
      alert("You do not have permission")
     }
  })
  .catch(err=>{
      console.log(err);
  })
  }

  // Get info about user taking user ID as input
  function getUser(id) {
    // Pass ID of user as param
    getAuthData(currToken, "http://localhost:8080/user/" + id)
    .then(result => {
      // Either save info or give error message
      if (result.surname) {
       setUserInfo(result);
      }
      else {
       alert("You do not have permission")
      }
   })
   .catch(err=>{
       console.log(err);
       alert("User doesnt exist!")
   })
  }

  // Update user info
  function putUser(newSurname, newName, newRole, newDiv1, newDiv2, newDiv3, id) {
    let data;
    // Make different objects to pass on body depending on how many Division ID's have been submitted
    if (newDiv2 !== "" && newDiv3 !== "") {
      data = {surname: newSurname, name: newName, division_id: newDiv1, division_id2: newDiv2,
        division_id3: newDiv3, role: newRole};
    }
    else if (newDiv2 !== "" && newDiv3 === "") {
      data = {surname: newSurname, name: newName, division_id: newDiv1, division_id2: newDiv2, role: newRole};
    }
    else if (newDiv2 === "" && newDiv3 === "") {
      data = {surname: newSurname, name: newName, division_id: newDiv1, role: newRole};
    }
    // Put request
    putAuthData(currToken, "http://localhost:8080/user/" + id, data)
    .then(result => {
     if (result.surname) {
      alert("Successfully updated!")
     }
     else {
      alert("You do not have permission")
     }
  })
  .catch(err=>{
      console.log(err);
  })
  }
  
  // Save credential into currCred state
  function saveCred(cred) {
    const objCred = JSON.parse(cred) 
    setCred(objCred);
  }
  // Clears state for userInfo
  function wipeUser() {
    setUserInfo();
  }
  // Clears state for generated token
  function wipeToken() {
    generateToken(0);
  }
  return (
    // Render
    <BrowserRouter>
      <h1>COOL-TECH CREDENTIAL PORTAL</h1>
      <hr/>
      <Routes>
        <Route path='/user' element={<HandleUser user={userInfo} findUser={getUser} updateUser={putUser}/>}/>
        <Route path='/add-cred' element={<AddCred add={postCred}/>}/>
        <Route path='/update-cred' element={<UpdateCred cred={currCred} update={putCred}/>}/>
        <Route path='/credentials' element={<Credentials wipeUser = {wipeUser} getCreds={getCreds} creds={credList} 
        divName={divName} saveCred={saveCred}/>}/>
        <Route path='/login' element={<Login submit={login} user={currentUser}/>}/>
        <Route path='/register' element={<Register submit={register} token={tokenGenerated}/>}/>
        <Route path='/' element={<Home wipeToken={wipeToken}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
