import axios from "axios";
import moment from "moment";
import { useState } from "react";

function Comment(props) {
  const [newComment, setNewComment] = useState(props.comment.content);
  const [editing, setEditing] = useState(false);

  const deleteComment = function () {
    axios
      .delete(
        `/api/posts/${props.postId}/comments/${props.comment._id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      )
      .then(() => {
        props.setComments(
          props.comments.filter((comment) => comment._id !== props.comment._id)
        );

        props.setShowToast(true);
        props.setToastText("Comment Deleted Successfully.");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const editComment = function (e) {
    e.preventDefault();

    axios
      .put(
        `/api/posts/${props.postId}/comments/${props.comment._id}/edit`,
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

        props.setShowToast(true);
        props.setToastText("Comment Edited Successfully.");
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
            className="btn fw-bold text-primary p-1 letter-spacing"
            hidden={
              props.user && props.user.username === props.comment.username
                ? false
                : true
            }
            onClick={handleEdit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-pencil-square me-1"
              viewBox="0 0 16 17"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>{" "}
            Edit
          </button>

          <button
            className="btn fw-bold text-danger px-2 py-1 letter-spacing"
            onClick={deleteComment}
            hidden={
              props.user && props.user.username === props.comment.username
                ? false
                : true
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash"
              viewBox="0 0 16 17"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>{" "}
            Delete
          </button>
        </div>
      </div>

      <div hidden={editing ? false : true}>
        <form className="py-2" onSubmit={editComment}>
          <div className="form-group py-3">
            <textarea
              name="content"
              className="form-control w-50"
              onChange={(e) => setNewComment(e.target.value)}
              defaultValue={props.comment.content}
              required
            ></textarea>
          </div>

          <button className="btn btn-dark fw-bold letter-spacing">Save</button>
        </form>
      </div>
    </div>
  );
}

export default Comment;
