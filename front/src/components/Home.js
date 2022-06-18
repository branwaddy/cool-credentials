import { Link } from "react-router-dom";

const Home = (props) => {
  // Home page, displays REGISTER and LOGIN buttons
  return (
    <div>
        <Link to='/register'><button className="link-btn" onClick={props.wipeToken()}>REGISTER</button></Link>
        <Link to='/login'><button className="link-btn">LOGIN</button></Link>
    </div>
  )
}

export default Home