import { useEffect, useState } from "react";
import Preview from "./Preview";
import Bulb from "../images/bulb.jpg";

function Dashboard(props) {
  const [showPublished, setShowPublished] = useState(false);
  const [showUnpublished, setShowUnpublished] = useState(false);

  useEffect(() => {
    props.posts.filter(
      (post) => post.author._id === props.user._id && post.published
    ).length
      ? setShowPublished(true)
      : setShowPublished(false);

    props.posts.filter(
      (post) => post.author._id === props.user._id && !post.published
    ).length
      ? setShowUnpublished(true)
      : setShowUnpublished(false);
  }, [props.posts, props.user]);

  useEffect(() => {
    document.title = props.title || "Dashboard | Blogify";
  }, [props.title]);

  return (
    <div className="mt-5">
      <h1 className="pt-5 text-center fw-bold">{`${props.user.username}'s Dashboard`}</h1>

      <section className="p-2">
        <h3>Published Posts</h3>
        <hr />

        <section className="text-center" hidden={showPublished ? true : false}>
          <img src={Bulb} className="bulb" alt="" />
          <p className="text-center p-3 lead">You have no published posts.</p>
        </section>

        <div
          className="row p-3 pt-1 w-100"
          hidden={showPublished ? false : true}
        >
          {props.posts
            .filter(
              (post) => post.author._id === props.user._id && post.published
            )
            .map((post) => (
              <div className="col-12 col-md-4" key={post._id}>
                <Preview
                  {...post}
                  publishing={true}
                  setPosts={props.setPosts}
                  setShowToast={props.setShowToast}
                  setToastText={props.setToastText}
                />
              </div>
            ))}
        </div>
      </section>

      <section className="p-2 pt-3">
        <h3>Unpublished Posts</h3>
        <hr />
        <section
          className="text-center"
          hidden={showUnpublished ? true : false}
        >
          <img src={Bulb} className="bulb" alt="" />
          <p className="text-center p-3 lead">You have no unpublished posts.</p>
        </section>

        <div
          className="row p-3 pt-1 w-100"
          hidden={showUnpublished ? false : true}
        >
          {props.posts
            .filter(
              (post) => post.author._id === props.user._id && !post.published
            )
            .map((post) => (
              <div className="col-12 col-md-4" key={post._id}>
                <Preview
                  {...post}
                  unpublishing={true}
                  setPosts={props.setPosts}
                  posts={props.posts}
                  setShowToast={props.setShowToast}
                  setToastText={props.setToastText}
                />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
