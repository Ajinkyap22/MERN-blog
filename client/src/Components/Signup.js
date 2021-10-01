import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Signup(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHander = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/users/signup", {
        username,
        password,
        confirmPassword,
      })
      .then(() => {
        props.history.push("/login");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center h-100">
      <div className="bg-light w-50 shadow-sm p-3 ">
        <div className="text-center">
          <h1 className="text-center">Sign Up</h1>
          <p>
            Already a member?{" "}
            <Link
              exact
              to="/login"
              className="link-primary text-decoration-none"
            >
              Login
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

          {/* confirm password */}
          <div className="form-group py-2">
            <label htmlFor="confirmPassword" className="fw-bold py-2">
              Confirm Password<span className="text-danger"> *</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* buttons */}
          <div className="py-3">
            <button className="btn btn-primary mr-2" type="submit">
              Sign up
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

export default Signup;
