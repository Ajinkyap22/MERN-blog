import axios from "axios";
import moment from "moment";
import { useState } from "react";

function Comment(props) {
  const [newComment, setNewComment] = useState(props.comment.content);
  const [edit, setEdit] = useState(false);

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
        setEdit(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEdit = function () {
    setEdit(true);
  };

  return (
    <div>
      <div className="border" hidden={edit ? true : false}>
        <p>{props.comment.username}</p>
        <small>{moment(props.comment.timestamp).format("lll")}</small>
        <p>{props.comment.content}</p>

        <button
          className="btn btn-danger"
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
          className="btn btn-secondary"
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

      <div hidden={edit ? false : true}>
        <form className="p-2" onSubmit={editComment}>
          <div className="form-group py-3">
            <textarea
              name="content"
              className="form-control w-25"
              onChange={(e) => setNewComment(e.target.value)}
              defaultValue={props.comment.content}
              required
            ></textarea>
          </div>

          <button className="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  );
}

export default Comment;
