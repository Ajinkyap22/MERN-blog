import moment from "moment";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import PostForm from "./PostForm";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
import Default from "../images/default.jpg";

function Post(props) {
  const [comments, setComments] = useState([]);
  const [editing, setEditing] = useState(false);
  const [commentEdit, setCommentEdit] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState([]);

  // for page title
  useEffect(() => {
    document.title = `${props.title} | Blogify` || "Blogify";
  }, [props.title]);

  // for post likes
  useEffect(() => {
    axios.get(`/api/posts/${props._id}/likes`).then((res) => {
      setLikes(res.data);

      if (res.data.some((id) => id === props.user?._id)) setLiked(true);
    });
  }, [props.likes, props._id, props.user]);

  // get comments
  useEffect(() => {
    axios
      .get(`/api/posts/${props._id}/comments`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => console.error(err));
  }, [props._id]);

  const deletePost = function () {
    axios
      .delete(`/api/posts/${props._id}/delete`, {
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

        props.setShowToast(true);
        props.setToastText("Post Deleted Successfully.");

        props.history.push("/dashboard");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleEdit = function () {
    setEditing(true);
  };

  const handleLike = function () {
    if (liked) {
      axios
        .put(
          `/api/posts/${props._id}/dislike`,
          { user_id: props.user._id },
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
            },
          }
        )
        .then((res) => {
          setLikes(res.data);
          setLiked(false);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .put(
          `/api/posts/${props._id}/like`,
          { user_id: props.user._id },
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
            },
          }
        )
        .then((res) => {
          setLikes(res.data);
          setLiked(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div className="my-5 post-bg">
      <main
        hidden={editing ? true : false}
        className="w-75 m-auto bg-white shadow p-4 post"
      >
        <section className="d-flex flex-column align-items-center">
          <div className="py-3 mt-4 text-center">
            <h1 className="fw-bold">{props.title}</h1>
            <p className="text-secondary">
              By {props.author.username} -{" "}
              {moment(props.timestamp).format("lll")}
            </p>
          </div>

          <div hidden={props.user?._id === props.author._id ? false : true}>
            <button
              onClick={handleEdit}
              className="btn btn-dark fw-bold letter-spacing mx-2"
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
              onClick={deletePost}
              className="btn btn-danger fw-bold letter-spacing mx-2"
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

          <img
            src={props.imgUrl || Default}
            className="img-fluid py-3 pb-4"
            alt="Blog related"
          />
        </section>

        <section className="py-3 content">
          {ReactHtmlParser(props.content)}
          <button
            className="like"
            onClick={handleLike}
            hidden={props.user ? false : true}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              className={liked ? "bi bi-heart liked" : "bi bi-heart"}
              viewBox="0 0 16 14"
            >
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
            </svg>
            <span className="px-2">{likes.length}</span>
          </button>
        </section>

        <section>
          <p className="fw-bold">Comments ({comments ? comments.length : 0})</p>

          <hr />

          <div className="pb-3" hidden={commentEdit ? true : false}>
            <CommentForm
              user={props.user}
              setComments={setComments}
              id={props._id}
              setShowToast={props.setShowToast}
              setToastText={props.setToastText}
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
                setShowToast={props.setShowToast}
                setToastText={props.setToastText}
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
          user={props.user}
          setShowToast={props.setShowToast}
          setToastText={props.setToastText}
        />
      ) : null}
    </div>
  );
}

export default withRouter(Post);
