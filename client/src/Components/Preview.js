import moment from "moment";

function Preview(props) {
  return (
    <div className="text-center">
      <p className="lead">{props.title}</p>
      <p>{props.author.username}</p>
      <p>{moment(props.timestamp).format("lll")}</p>

      <button className="btn btn-primary">View Post</button>
    </div>
  );
}

export default Preview;
