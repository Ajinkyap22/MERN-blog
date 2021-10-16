import axios from "axios";
import { useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/api/users/login", { username, password })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        props.setUser(res.data.user);
        props.history.push("/");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setError(err.response.data.message);
        } else {
          console.error(err);
        }
      });
  };

  return (
    <main className="container-fluid d-flex flex-column justify-content-center align-items-center h-100 mt-4">
      <p className="text-center pb-3 display-6 fw-bold">
        <img src={Logo} className="logo-title mx-1 mb-1" alt="" /> Blogify
      </p>

      <div className="bg-white w-50 auth shadow p-3 ">
        <div className="text-center">
          <h1>Login</h1>
          <p>
            Not a member?{" "}
            <Link to="/signup" className="link-primary text-decoration-none">
              Sign up
            </Link>
          </p>
        </div>

        <p hidden={error ? false : true} className="text-danger fw-bold">
          &#9888; {error}
        </p>

        <form onSubmit={submitHandler}>
          {/* username */}
          <div className="form-group pb-2">
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
            <button className="btn btn-dark mr-2" type="submit">
              Login
            </button>
            <a
              href="/"
              className="text-secondary text-decoration-none mx-2 px-2"
            >
              Go Back
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}

export default withRouter(Login);
