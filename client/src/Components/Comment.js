import axios from "axios";
import moment from "moment";
import { useState } from "react";

function Comment(props) {
  const [newComment, setNewComment] = useState(props.comment.content);
  const [editing, setEditing] = useState(false);

  const deleteComment = function () {
    axios
      .delete(
        `http://localhost:3000/api/posts/${props.postId}/comments/${props.comment._id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      )
      .then((res) => {
        props.setComments(
          props.comments.filter((comment) => comment._id !== props.comment._id)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const editComment = function (e) {
    e.preventDefault();

    axios
      .put(
        `http://localhost:3000/api/posts/${props.postId}/comments/${props.comment._id}/edit`,
        { username: props.user.username, content: newComment },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      )
      .then((res) => {
        props.setComments(
          props.comments.map((comment) =>
            comment._id !== props.comment._id ? comment : res.data
          )
        );
        props.setCommentEdit(false);
        setEditing(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEdit = function () {
    props.setCommentEdit(true);
    setEditing(true);
  };

  return (
    <div>
      <div className="border p-2 my-2" hidden={editing ? true : false}>
        <small>
          {props.comment.username} -
          {moment(props.comment.timestamp).format("lll")}
        </small>

        <p className="lead fw-normal pt-2">{props.comment.content}</p>

        <div>
          <button
            className="btn btn-danger "
            onClick={deleteComment}
            hidden={
              props.user && props.user.username === props.comment.username
                ? false
                : true
            }
          >
            Delete
          </button>

          <button
            className="btn btn-outline-dark mx-3"
            hidden={
              props.user && props.user.username === props.comment.username
                ? false
                : true
            }
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      </div>

      <div hidden={editing ? false : true}>
        <form className="py-2" onSubmit={editComment}>
          <div className="form-group py-3">
            <textarea
              name="content"
              className="form-control w-25"
              onChange={(e) => setNewComment(e.target.value)}
              defaultValue={props.comment.content}
              required
            ></textarea>
          </div>

          <button className="btn btn-dark">Save</button>
        </form>
      </div>
    </div>
  );
}

export default Comment;
