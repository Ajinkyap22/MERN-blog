import moment from "moment";

function Comment(props) {
  return (
    <div>
      <p>{props.comment.username}</p>
      <small>{moment(props.comment.timestamp).format("lll")}</small>
      <p>{props.comment.content}</p>
    </div>
  );
}

export default Comment;
