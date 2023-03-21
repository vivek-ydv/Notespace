import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import alertContext from "../context/alerts/alertContext";

export const Navbar = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let { showAlert } = useContext(alertContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    showAlert('Good Bye! Logged Out Successfully ;(', 'success');
  }
  return (
    <nav className="navbar navbar-expand-sm sticky-top navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand mx-2" to="/">
          Notespace
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
          <div className="navbar-nav mx-2">
            <Link className={`nav-link  ${location.pathname === '/' ? "active" : ""}`} to="/">
              Home
            </Link>
            {localStorage.getItem('token') && <Link className={`nav-link  ${location.pathname === '/notes' ? "active" : ""}`} to="/notes">
              Notes
            </Link>}
            <Link className={`nav-link  ${location.pathname === '/about' ? "active" : ""}`} to="/about">
              About us
            </Link>
          </div>
          {localStorage.getItem('token') && <div className="d-flex ms-auto me-2">
            <button className="btn btn-outline-primary" onClick={handleLogout}  >Logout</button>
          </div>}
        </div>
      </div>
    </nav>
  )
}

export default Navbar;