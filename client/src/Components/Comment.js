import axios from "axios";
import moment from "moment";

function Comment(props) {
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
          props.comments.filter((comment) => comment._id !== res.data._id)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="border">
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
        // onClick={deleteComment}
        hidden={
          props.user && props.user.username === props.comment.username
            ? false
            : true
        }
      >
        Edit
      </button>
    </div>
  );
}

export default Comment;
