import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";

function Preview(props) {
  const handlePublish = function () {
    let urlString = props.published ? "unpublish" : "publish";

    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    axios
      .post(
        `http://localhost:3000/api/posts/${props._id}/${urlString}`,
        {},
        headers
      )
      .then((res) => {
        // update posts array
        props.setPosts(
          props.posts.map((post) => (post._id === props._id ? res.data : post))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="text-center bg-white rounded py-4 shadow">
      <div className="pb-3">
        <p className="fw-bold lead p-0">{props.title}</p>
        <p className="p-0">By {props.author.username}</p>
      </div>
      <p className="py-2">{moment(props.timestamp).format("lll")}</p>

      <Link
        exact="true"
        to={`/posts/${props._id}`}
        className="btn btn-outline-dark"
      >
        View Post
      </Link>

      <button
        className="btn btn-primary"
        hidden={props.publishing || props.unpublishing ? false : true}
        onClick={handlePublish}
      >
        {props.publishing ? "Unublish" : "Publish"}
      </button>
    </div>
  );
}

export default Preview;
