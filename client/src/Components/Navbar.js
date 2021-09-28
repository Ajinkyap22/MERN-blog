import { NavLink } from "react-router-dom";

function Navbar(props) {
  const logout = (e) => {
    localStorage.removeItem("user");
    props.setUser(undefined);
  };

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
            <NavLink
              exact
              to="/"
              activeClassName="active"
              className="nav-link mx-2"
              aria-current="page"
              hidden={props.user ? false : true}
            >
              Home
            </NavLink>

            <NavLink
              exact
              to="/login"
              className="btn btn-primary fw-bold rounded-pill mx-2"
              hidden={props.user ? true : false}
            >
              Login
            </NavLink>

            <NavLink
              exact
              to="/signup"
              className="btn btn-primary fw-bold rounded-pill mx-2"
              hidden={props.user ? true : false}
            >
              Signup
            </NavLink>

            <NavLink
              exact
              to="/create"
              activeClassName="active"
              className="btn btn-primary fw-bold rounded-pill mx-2"
              hidden={props.user ? false : true}
            >
              Create Post
            </NavLink>

            <NavLink
              exact
              to="/logout"
              activeClassName="active"
              className="btn btn-primary fw-bold rounded-pill mx-2"
              hidden={props.user ? false : true}
              onClick={logout}
            >
              Logout
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
