import moment from "moment";
import Comment from "./Comment";
import axios from "axios";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

function Post(props) {
  const [content, setContent] = useState("");
  const [username, setUsername] = useState();
  const [comments, setComments] = useState(props.comments);

  const submitHandler = async (e) => {
    e.preventDefault();
    e.target.reset();

    let url = `http://localhost:3000/api/posts/${props._id}/comments/`;

    axios
      .post(url, { username, content })
      .then((res) => {
        setComments([...comments, res.data]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (props.user) setUsername(props.user.username);
  }, [props]);

  return (
    <main>
      <section>
        <h1>{props.title}</h1>
        <p>By {props.author.username}</p>
        <p>{moment(props.timestamp).format("lll")}</p>
      </section>

      <section>
        <p>{props.content}</p>
      </section>

      <section>
        <p>Comments ({props.comments.length})</p>

        <form className="p-2" onSubmit={submitHandler}>
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
              className="form-control w-25"
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <button className="btn btn-primary">Comment</button>
        </form>

        {comments.map((comment) => (
          <div key={comment._id}>
            <Comment
              comment={comment}
              postId={props._id}
              comments={comments}
              setComments={setComments}
              user={props.user}
            />
          </div>
        ))}
      </section>
    </main>
  );
}

export default withRouter(Post);
