import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-sm bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Navbar
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
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} to="/">
              Home
            </Link>
            <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">
              About
            </Link>
          </div>
        </div> 
      </div>
    </nav>

  )
}

export default Navbar;