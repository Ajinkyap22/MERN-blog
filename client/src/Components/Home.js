import Preview from "./Preview";
import illustration from "../images/illustration.png";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Home(props) {
  const [published, setPublished] = useState([]);

  useEffect(() => {
    setPublished(() => props.posts.filter((post) => post.published));

    document.title = props.title || "Home | Blogify";
  }, [props]);

  return (
    <main className="py-5">
      <section className="p-3 pt-5 d-flex justify-content-center align-items-center">
        <div>
          <h1 className="display-2 fw-bold">Blogify</h1>
          <p>
            Welcome to the home of tech writers, where experts from the tech
            field share their insights on modern technology. Blogify will help
            you stay up-to-date with the latest developments in the tech field
            so you can always stay ahead of the curve.
          </p>
          <Link
            exact="true"
            to="/signup"
            className="btn btn-dark"
            hidden={props.user ? true : false}
          >
            <span className="lead fw-bold letter-spacing">Get Started </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </Link>
        </div>

        <img
          src={illustration}
          className="w-50 p-3 d-none d-md-block "
          alt="Illustration"
        />
      </section>

      <hr />

      <h4 className="fw-bold p-3">Posts ({published.length})</h4>

      <section className="row p-3 pt-1 w-100">
        {published.map((post) => (
          <div className="col-12 col-md-4 p-3 px-3" key={post._id}>
            <Preview {...post} />
          </div>
        ))}
      </section>
    </main>
  );
}

export default Home;
