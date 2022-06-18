import { Link } from "react-router-dom";

const UpdateCred = (props) => {
    const currentCred = props.cred;
    let element;
    // On submission of form, send credential details in update function
    const onSubmit = (e) => {
        e.preventDefault();
        const username = e.target[0].value
        const password = e.target[1].value
        const site = e.target[2].value;
        const user_id = e.target[3].value;
        props.update(username, password, site, user_id, currentCred._id);
    }
    // Form that displays the credentials info
    if (currentCred) {
        element = (
            <form className="container" onSubmit={onSubmit}>
              <p>Change the field(s) you'd like to update then hit submit:</p>
              <label htmlFor='Username' >Username:</label>
              <input type='text' defaultValue={currentCred.username}/><br/>
              <label htmlFor='Password'>Password:</label>
              <input type='text' defaultValue={currentCred.password}/><br/>
              <label htmlFor='Site'>Site:</label>
              <input type='text' defaultValue={currentCred.site}/><br/>
              <label htmlFor='user_id'>User ID:</label>
              <input type='text' defaultValue={currentCred.user_id}/><br/>
              <input className='btn'type='submit'/>
            </form>
            )
    }

  return (
    // Render
    <div>
        <h2>UPDATE CREDENTIAL</h2>
        <br/>
        {element}
        <Link to='/credentials'><button className="link-btn">BACK TO CREDENTIALS</button></Link>
    </div>
  )
}

export default UpdateCred