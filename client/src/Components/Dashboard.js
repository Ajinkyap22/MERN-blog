import { useEffect, useState } from "react";
import Preview from "./Preview";

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

  return (
    <div className="mt-5">
      <h1 className="pt-5 text-center fw-bold">{`${props.user.username}'s Dashboard`}</h1>

      <section className="p-2">
        <h3>Published Posts</h3>
        <hr />
        <p className="text-center" hidden={showPublished ? true : false}>
          You have no published posts.
        </p>

        <div
          className="row row-cols-3 p-3 pt-1 w-100"
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
                />
              </div>
            ))}
        </div>
      </section>

      <section className="p-2 pt-3">
        <h3>Unpublished Posts</h3>
        <hr />
        <p className="text-center p-3" hidden={showUnpublished ? true : false}>
          You have no unpublished posts.
        </p>

        <div
          className="row row-cols-3 p-3 pt-1 w-100"
          hidden={showUnpublished ? false : true}
        >
          {props.posts
            .filter(
              (post) => post.author._id === props.user._id && !post.published
            )
            .map((post) => (
              <div className="col" key={post._id}>
                <Preview
                  {...post}
                  unpublishing={true}
                  setPosts={props.setPosts}
                  posts={props.posts}
                />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
