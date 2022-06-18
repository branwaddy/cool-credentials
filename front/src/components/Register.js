import { Link } from "react-router-dom";

// Form where user can submit their username and password and receive a JWT
const Register = (props) => {
    const token = props.token;
    let element;
    // If token exists, token has been generated, display it
    if (token) {
        element = (<p>This is your token. Please do not lose it: {token}</p>)
    }
    // 0 is default value for token, display nothing
    else if (token === 0) {}
    // Else if token is false, display error message
    else {
        element = (<p className="error">Incorrect login details!</p>)
    }
    // On submission of register form, send username and password to generate JWT
    const onSubmit = (e) => {
        // on submit of form call addJob function passing info of job as input
          e.preventDefault();
          const username = e.target[0].value
          const password = e.target[1].value
          props.submit(username, password);
        }
    
  return (
    // Register
    <div>
        <h2>REGISTER</h2>
        <form className="container" onSubmit={onSubmit}>
          <label htmlFor='Username'>Username:</label>
          <input type='text' placeholder='eg. mzuckerbereg'/><br/>
          <label htmlFor='Password'>Password:</label>
          <input type='text' placeholder='eg. password'/><br/>
          <input className='btn'type='submit'/>
        </form>
        {element}
        <br/>
       
        <Link to='/'><button className="link-btn">HOME</button></Link>
    </div>
  )
}

export default Register