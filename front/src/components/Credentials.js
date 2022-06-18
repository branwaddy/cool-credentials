import { useEffect } from "react";
import { Link } from "react-router-dom";

// List credentials
const Credentials = (props) => {
  // On load of page, call getCreds function to get credential list
  useEffect(() =>{
      props.getCreds();
      // eslint-disable-next-line
    }, []);
  
  const divName = props.divName;
  const credList = props.creds;
  let credRender;
  // Build list of credentials (includes an 'update' button for each credential)
  if (credList) {
    credRender = credList.map((cred) =>
    <div className="container" key={cred._id}>
        <i><p>username: {cred.username}</p></i>
        <i><p>password: {cred.password}</p></i>
        <p>Website: {cred.site}</p>
        <p>User ID: {cred.user_id}</p>
        <Link to='/update-cred'>
          <button className="update-btn" value={JSON.stringify(cred)} onClick={(e) => props.saveCred(e.target.value)}>UPDATE
          </button>
        </Link>
        <br/>
    </div>);
  }
   
  return (
    // Render
    <div>
        <h1>Division: '{divName}'</h1>
        {credRender}
        <br/>
        <Link to='/user'><button className="link-btn"  onClick={props.wipeUser}>USER INFO</button></Link><br/>
        <Link to='/add-cred'><button className="link-btn" >ADD CREDENTIAL</button></Link>
    </div>
  )
}

export default Credentials