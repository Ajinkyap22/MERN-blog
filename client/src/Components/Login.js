import axios from "axios";
import { useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHander = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/api/users/login", { username, password })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        props.setUser(res.data.user);
        props.history.push("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center h-100">
      <div className="bg-light w-50 shadow-sm p-3 ">
        <div className="text-center">
          <h1>Login</h1>
          <p>
            Not a member?{" "}
            <Link
              exact
              to="/signup"
              className="link-primary text-decoration-none"
            >
              Sign up
            </Link>
          </p>
        </div>

        <form onSubmit={submitHander}>
          {/* username */}
          <div className="form-group py-2">
            <label htmlFor="username" className="fw-bold py-2">
              Username<span className="text-danger"> *</span>
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* password */}
          <div className="form-group py-2">
            <label htmlFor="password" className="fw-bold py-2">
              Password<span className="text-danger"> *</span>
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* buttons */}
          <div className="py-3">
            <button className="btn btn-primary mr-2" type="submit">
              Login
            </button>
            <a
              href="/"
              className="text-secondary text-decoration-none mx-2 p-2"
            >
              Go Back
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);
