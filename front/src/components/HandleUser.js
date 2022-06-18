import { Link } from "react-router-dom";

// Form to update user
const HandleUser = (props) => {
    const currUser = props.user;
    let element;

    // Get user info with submitted ID
    const getUser = (e) => {
        e.preventDefault();
        props.findUser(e.target[0].value);
    }

    // On submit of update form, send inputted info in updateUser function, in addition to user's ID
    const onSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const surname = form[0].value
        const name = form[1].value
        const role = form.elements.role.value;
        const div1 = form[5].value;
        const div2 = form[6].value;
        const div3 = form[7].value;
        props.updateUser(surname, name, role, div1, div2, div3, currUser._id);
      }
    
      /* If value of currUser is false which is default value, no user has been fetched yet so we display a form that asks for the
      desired user ID*/
    if (!currUser) {
        element = (
          // On submit of form, trigger findUser function which fetches the info for the user with the submitted ID
        <form className="container" onSubmit={getUser}>
          <label htmlFor='user-to-update'>ID of user:</label>
          <input type='text' placeholder='eg. 623db3ffef12f3358885e536'/><br/>
          <input className='btn'type='submit'/>
        </form>
        )
    }
    /* Else if we have user info, display a form that shows the user's info and allows the user to update the info, then onSubmit
    trigger 'onSubmit' function*/
    else {
        element = (
        <form className="container" onSubmit={onSubmit}>
            <h1>Change the field(s) you'd like to update then hit submit:</h1>
          <label htmlFor='Surname' >Surname:</label>
          <input type='text' defaultValue={currUser.surname} placeholder='eg. Musk'/><br/>
          <label htmlFor='Name'>Name:</label>
          <input type='text' defaultValue={currUser.name} placeholder='eg. Elon'/><br/>
          <p>User role:</p>
          <input type='radio' id="role1" value="normal" name="role" defaultChecked={currUser.role==="normal"}/><label htmlFor='role1'>Normal</label><br/>
          <input type='radio' id="role2" value="admin" name="role" defaultChecked={currUser.role==="admin"}/><label htmlFor='role2'>Admin</label><br/>
          <input type='radio' id="role3" value="mgmt" name="role" defaultChecked={currUser.role==="mgmt"}/><label htmlFor='role3'>Management</label><br/>
          <br/>
          <label htmlFor='div1'>Division ID:</label>
          <input type='text' defaultValue={currUser.division_id} required/><br/>
          <label htmlFor='div2'>Second division (if applicable):</label>
          <input type='text' defaultValue={currUser.division_id2}/><br/>
          <label htmlFor='div3'>Third division (if applicable):</label>
          <input type='text' defaultValue={currUser.division_id3}/><br/>
          <input className='btn'type='submit'/>
        </form>
        )
    }
  return (
    // Render
    <div>
        <h2>HANDLE USER</h2>
        {element}
        <Link to='/credentials'><button className="link-btn">BACK TO CREDENTIALS</button></Link>
    </div>
  )
}

export default HandleUser