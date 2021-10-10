import { useState, useEffect } from "react";
import axios from "axios";

function CommentForm(props) {
  const [content, setContent] = useState("");
  const [username, setUsername] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    e.target.reset();

    let url = `http://localhost:3000/api/posts/${props.id}/comments/`;

    axios
      .post(url, { username, content })
      .then((res) => {
        props.setComments((prevState) => [...prevState, res.data]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (props.user) setUsername(props.user.username);
  }, [props]);

  return (
    <form className="py-2" onSubmit={submitHandler}>
      <div className="form-group">
        <label htmlFor="username" hidden={props.user ? true : false}>
          Username
        </label>
        <input
          type={props.user ? "hidden" : "text"}
          className="form-control w-25"
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

      <button className="btn btn-dark">Comment</button>
    </form>
  );
}

export default CommentForm;
