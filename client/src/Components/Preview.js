import moment from "moment";
import { Link } from "react-router-dom";

function Preview(props) {
  return (
    <div className="text-center">
      <p className="lead">{props.title}</p>
      <p>{props.author.username}</p>
      <p>{moment(props.timestamp).format("lll")}</p>

      <Link exact to={`/posts/${props._id}`} className="btn btn-primary">
        View Post
      </Link>
    </div>
  );
}

export default Preview;
