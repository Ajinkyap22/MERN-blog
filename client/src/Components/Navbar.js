import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid py-2">
        <NavLink exact to="/" className="navbar-brand px-3">
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

        <div
          className="collapse navbar-collapse justify-content-end px-3"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            {/* <NavLink
              exact
              to="/"
              activeClassName="active"
              className="nav-link mx-2"
              aria-current="page"
            >
              Home
            </NavLink> */}
            <NavLink
              exact
              to="/login"
              activeClassName="active"
              className="btn btn-primary fw-bold rounded-pill mx-2"
            >
              Login
            </NavLink>
            <NavLink
              exact
              to="/"
              activeClassName="active"
              className="btn btn-primary fw-bold rounded-pill mx-2"
            >
              Signup
            </NavLink>
            {/* <NavLink
              exact
              to="/"
              activeClassName="active"
              className="nav-link mx-2"
            >
              Disabled
            </NavLink> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
