import moment from "moment";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { useState } from "react";
import { withRouter } from "react-router-dom";

function Post(props) {
  const [comments, setComments] = useState(props.comments);

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

        <CommentForm
          user={props.user}
          comments={comments}
          setComments={setComments}
        />

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
