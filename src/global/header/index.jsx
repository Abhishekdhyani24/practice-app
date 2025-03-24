import { useNavigate } from "react-router-dom";
import "./style.scss";
const Header = () => {
  const navigate = useNavigate()
  function logout() {
    if(confirm('Do you really want to logout?')){
      sessionStorage.clear()
      navigate('/')
    }
  
  }
  return (
    // <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //   <a className="navbar-brand" href="#">Practice</a>
    //   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //     <span className="navbar-toggler-icon"></span>
    //   </button>

    //   <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //     <ul className="navbar-nav mr-auto">
    //       <li className="nav-item active">
    //         <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
    //       </li>
    //       <li className="nav-item">
    //         <a className="nav-link" href="#">Link</a>
    //       </li>
    //       <li className="nav-item dropdown">
    //         <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    //           Dropdown
    //         </a>
    //         <div className="dropdown-menu" aria-labelledby="navbarDropdown">
    //           <a className="dropdown-item" href="#">Action</a>
    //           <a className="dropdown-item" href="#">Another action</a>
    //           <div className="dropdown-divider"></div>
    //           <a className="dropdown-item" href="#">Something else here</a>
    //         </div>
    //       </li>
    //       <li className="nav-item">
    //         <a className="nav-link " onClick={logout}>Logout</a>
    //       </li>
    //     </ul>

    //   </div>
    // </nav>

  < nav className="navbar navbar-expand-lg navbar-light bg-light w-100">


<header className="header w-100">

  <div className="search-bar">
  <h4 >Practice App</h4>
  </div>
<div>
       <span className="nav-item">
           <a className="btn btn-secondary" onClick={logout}>Logout</a>
       </span>
</div>

</header>


</nav>
  )
}

export default Header;


