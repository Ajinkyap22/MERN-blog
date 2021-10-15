import moment from "moment";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import PostForm from "./PostForm";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";

function Post(props) {
  const [comments, setComments] = useState([]);
  const [editing, setEditing] = useState(false);
  const [commentEdit, setCommentEdit] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/posts/${props._id}/comments`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => console.error(err));
  }, [props._id]);

  const deletePost = function () {
    axios
      .delete(`http://localhost:3000/api/posts/${props._id}/delete`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
      .then(() => {
        props.setPosts((prevState) =>
          prevState.filter((post) => post._id !== props._id)
        );

        props.history.push("/dashboard");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEdit = function () {
    setEditing(true);
  };

  return (
    <div className="pb-3 py-5">
      <main hidden={editing ? true : false} className="w-75 m-auto">
        <section className="d-flex flex-column align-items-center">
          <div className="py-3">
            <h1>{props.title}</h1>
            <p>
              By {props.author.username} -{" "}
              {moment(props.timestamp).format("lll")}
            </p>
          </div>

          <div
            className="py-2"
            hidden={props.user?._id === props.author._id ? false : true}
          >
            <button onClick={deletePost} className="btn btn-danger mx-2">
              Delete
            </button>
            <button onClick={handleEdit} className="btn btn-secondary mx-2">
              Edit
            </button>
          </div>

          <img
            src={props.imgUrl}
            className="img-fluid py-3"
            alt="Blog related"
          />
        </section>

        <section>{ReactHtmlParser(props.content)}</section>

        <section>
          <p className="fw-bold">Comments ({comments ? comments.length : 0})</p>

          <hr />

          <div hidden={commentEdit ? true : false}>
            <CommentForm
              user={props.user}
              setComments={setComments}
              id={props._id}
            />
          </div>

          {comments.map((comment) => (
            <div key={comment._id}>
              <Comment
                comment={comment}
                comments={comments}
                postId={props._id}
                setComments={setComments}
                user={props.user}
                setCommentEdit={setCommentEdit}
              />
            </div>
          ))}
        </section>
      </main>

      {editing ? (
        <PostForm
          title={props.title}
          content={props.content}
          comments={props.comments}
          published={props.published}
          editing={true}
          id={props._id}
          setPosts={props.setPosts}
          setEditing={setEditing}
        />
      ) : null}
    </div>
  );
}

export default withRouter(Post);
