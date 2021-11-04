import moment from "moment";
import { Link } from "react-router-dom";
import axios from "axios";
import Default from "../images/default.jpg";

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
      .post(`/api/posts/${props._id}/${urlString}`, {}, headers)
      .then((res) => {
        // update posts array
        props.setPosts((prevState) =>
          prevState.map((post) => (post._id === props._id ? res.data : post))
        );

        let toastText = res.data.published
          ? "Post Published Successfully"
          : "Post Unpublished Successfully.";

        props.setShowToast(true);
        props.setToastText(toastText);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="text-center bg-white shadow h-100 preview">
      <Link
        exact="true"
        to={`posts/${props._id}`}
        className="text-decoration-none text-dark"
      >
        <div>
          <img
            src={props.imgUrl || Default}
            className="img-fluid"
            alt="Blog related"
          />
        </div>

        <div className="p-2">
          <p className="fw-bold lead p-0">{props.title}</p>
          <p className="p-0 text-secondary">
            By {props.author.username} / {moment(props.timestamp).format("lll")}
          </p>
        </div>
      </Link>

      <button
        className="btn btn-outline-dark mb-3 fw-bold letter-spacing"
        hidden={props.publishing || props.unpublishing ? false : true}
        onClick={handlePublish}
      >
        {props.publishing ? "Unublish" : "Publish"}
      </button>
    </div>
  );
}

export default Preview;
