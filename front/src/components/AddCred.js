import { Link } from "react-router-dom";

// Form to add credentials
const AddCred = (props) => {
    const onSubmit = (e) => {
        // On submit of form call add function passing info of credential as input
          e.preventDefault();
          const username = e.target[0].value
          const password = e.target[1].value
          const site = e.target[2].value;
          const user_id = e.target[3].value;
          props.add(username, password, site, user_id);
        }
  return (
    <div >
      <h2>ADD CREDENTIAL</h2>
        <form className="container" onSubmit={onSubmit}>
          <label htmlFor='Username'>Username:</label>
          <input type='text' placeholder='eg. mzuckerbereg'/><br/>
          <label htmlFor='Password'>Password:</label>
          <input type='text' placeholder='eg. password'/><br/>
          <label htmlFor='Site'>Website:</label>
          <input type='text' placeholder='eg. Wordpress'/><br/>
          <label htmlFor='user_id'>User ID:</label>
          <input type='text' placeholder='eg. 62a1dfa640a5618867a68c7e'/><br/>
          <input className='btn'type='submit'/>
        </form>
        <Link to='/credentials'><button className="link-btn">BACK TO CREDENTIALS</button></Link>
    </div>
  )
}

export default AddCred