import { useNavigate } from "react-router-dom";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/user";
const Header = () => {
  const user = useSelector((state) => state.user);
  console.log(user,'useruseruseruser');
  
  const dispatch = useDispatch();
  const navigate = useNavigate()
  function Logout() {
    if(confirm('Do you really want to logout?')){
      dispatch(logout());
      sessionStorage.clear()
      navigate('/')
    }
  
  }
  return (

  < nav className="navbar navbar-expand-lg navbar-light bg-light w-100">


<header className="header w-100">

  <div className="search-bar">
  <h4 >Practice App</h4>

  </div>
<div>
       <span className="nav-item">
       <span><small>Admin Name: {user?.firstName} {user?.lastName}</small></span><br></br>
           <a className="btn btn-secondary" onClick={Logout}>Logout</a>
       </span>
</div>

</header>


</nav>
  )
}

export default Header;


