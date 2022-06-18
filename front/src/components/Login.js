import { Link } from "react-router-dom";

// Log user in using JWT
const Login = (props) => {
  const user = props.user;
  let element;
  // If there is a user saved in state, JWT token has been verified so we display a VIEW CREDENTIALS button, and greet user
  if (user) {
    element=(<div><p>Hello, {user.name}. Click the button below to view credential repository.</p><br/>
    <Link to='/credentials'><button className="link-btn">VIEW CREDENTIALS</button></Link></div>)
  }
  // 0 is default state for 'user', JWT has not yet been submitted, we display nothing
  else if (user === 0) {}
  // Else if user is false, JWT was not verified, display error message
  else {
    element=(<p className="error">Bad JWT!</p>)
  }
  const onSubmit = (e) => {
    // On submit of formm send JWT to back end
      e.preventDefault();
      const jwt = e.target[0].value
      props.submit(jwt);
    }
  return (
    // Render
    <div>
      <h2>LOGIN</h2>
      <form  className="container" onSubmit={onSubmit}>
          <label htmlFor='Jwt'>Please enter JWT:</label>
          <input type='text' placeholder=''/><br/>
          <input className='btn'type='submit'/>
        </form>
        {element}
        <Link to='/'><button className="link-btn">HOME</button></Link>
    </div>
  )
}

export default Login