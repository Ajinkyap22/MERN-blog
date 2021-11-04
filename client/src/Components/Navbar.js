import { withRouter, NavLink } from "react-router-dom";
import Logo from "../images/logo.png";

function Navbar(props) {
  const logout = (e) => {
    localStorage.removeItem("user");
    props.setUser(undefined);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <NavLink exact to="/" className="navbar-brand px-3">
          <img src={Logo} className="logo m-2" alt="" />
          <span className="h4 fw-bold">Blogify</span>
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
          <div className="navbar-nav text-center align-items-center">
            <NavLink
              exact
              to="/"
              activeClassName="active fw-bold letter-spacing"
              className="nav-link mx-2 text-white"
              aria-current="page"
              hidden={props.user ? false : true}
            >
              Home
            </NavLink>

            <NavLink
              exact
              to="/dashboard"
              activeClassName="active fw-bold letter-spacing"
              className="nav-link text-white"
              aria-current="page"
              hidden={props.user ? false : true}
            >
              Dashboard
            </NavLink>

            <NavLink
              exact
              to="/login"
              className="btn btn-light fw-bold rounded-pill m-2 "
              hidden={props.user ? true : false}
            >
              Login
            </NavLink>

            <NavLink
              exact
              to="/signup"
              className="btn btn-light fw-bold rounded-pill m-2 "
              hidden={props.user ? true : false}
            >
              Signup
            </NavLink>

            <NavLink
              exact
              to="/create"
              activeClassName="active"
              className="btn btn-light fw-bold rounded-pill m-2"
              hidden={props.user ? false : true}
            >
              Create Post
            </NavLink>

            <NavLink
              exact
              to="/"
              activeClassName="active"
              className="btn btn-light fw-bold rounded-pill m-2"
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

export default withRouter(Navbar);
