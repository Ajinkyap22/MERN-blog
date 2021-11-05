import { useState, useEffect } from "react";
import axios from "axios";

function CommentForm(props) {
  const [content, setContent] = useState("");
  const [username, setUsername] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    e.target.reset();

    let url = `/api/posts/${props.id}/comments/`;

    axios
      .post(url, { username, content })
      .then((res) => {
        props.setComments((prevState) => [...prevState, res.data]);

        props.setShowToast(true);
        props.setToastText("Comment Created Successfully.");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (props.user) setUsername(props.user.username);
  }, [props]);

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <label
          htmlFor="username"
          className="fw-bold py-2"
          hidden={props.user ? true : false}
        >
          Username <span className="text-danger">*</span>
        </label>
        <input
          type={props.user ? "hidden" : "text"}
          className="form-control w-25 field"
          name="username"
          defaultValue={props.user ? props.user.username : ""}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="form-group py-3">
        <textarea
          name="content"
          className="form-control"
          onChange={(e) => setContent(e.target.value)}
          rows="3"
          required
        ></textarea>
      </div>

      <button
        className="btn btn-dark fw-bold letter-spacing"
        disabled={content && username ? false : true}
      >
        Comment
      </button>
    </form>
  );
}

export default CommentForm;
