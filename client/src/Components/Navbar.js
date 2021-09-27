import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink exact to="/" className="navbar-brand">
          Blog
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink
              exact
              to="/"
              activeClassName="active"
              className="nav-link active"
              aria-current="page"
            >
              Home
            </NavLink>
            <NavLink exact to="/" activeClassName="active" className="nav-link">
              Login
            </NavLink>
            <NavLink exact to="/" activeClassName="active" className="nav-link">
              Signup
            </NavLink>
            <NavLink
              exact
              to="/"
              activeClassName="active"
              className="nav-link disabled"
            >
              Disabled
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
